/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.server();
  cy.mockGraphql({ schema: Cypress.env('GRAPHQL_SCHEMA') });
});

Given('I havent submitted a thing this week', () => {
  cy.mockGraphqlOps({
    operations: {
      MyThingThisWeek: {
        me: {
          thingThisWeek: null
        }
      }
    }
  });
});

Given(`I have submitted the following thing this week:`, dataTable => {
  const thing = pluckThing(dataTable);
  cy.get('@me').then(me => {
    cy.mockGraphqlOps({
      operations: {
        MyThingThisWeek: {
          me: {
            thingThisWeek: {
              id: '1',
              person: me,
              description: thing.description,
              complete: thing.complete,
              createdAt: Date.now()
            }
          }
        }
      }
    });
  });
});

When('I visit the Me page', () => {
  cy.visit('/me');
});

When('I click on the Thing input form', () => {
  cy.get('textarea[data-class-name=thing-input-form')
    .as('thingInputForm')
    .click();
});

When(`I type {string}`, text => {
  cy.wrap(text).as('inputText');
  cy.get('@thingInputForm').type(text);
});

When('I click the Submit button', () => {
  cy.get('@me').then(me => {
    cy.get('@inputText').then(inputText => {
      cy.mockGraphqlOps({
        operations: {
          SubmitThing: {
            submitThing: {
              success: true
            }
          },
          MyThingThisWeek: {
            me: {
              thingThisWeek: {
                id: '1',
                person: me,
                description: inputText,
                complete: false,
                createdAt: Date.now()
              }
            }
          }
        }
      });
    });
  });

  cy.get('button')
    .contains('Submit')
    .click();
});

Then('I see my thing', () => {
  cy.get('div[data-class-name=thing').as('thing');
});

Then('my thing is not complete', () => {
  cy.get('@thing')
    .find('svg[data-class-name=icon-checkmark]')
    .should('not.exist');
});

Then('my thing is complete', () => {
  cy.get('@thing')
    .find('svg[data-class-name=icon-checkmark]')
    .should('exist');
});

Then(`I see a button that says {string}`, text => {
  cy.get('button').contains(text);
});

function pluckThing(dataTable) {
  const rawThing = dataTable.hashes()[0];
  return {
    description: rawThing.description,
    complete: rawThing.complete === 'true'
  };
}
