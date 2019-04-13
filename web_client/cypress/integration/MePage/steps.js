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
    const thingThisWeek = {
      id: '1',
      person: me,
      description: thing.description,
      complete: thing.complete,
      createdAt: Date.now()
    };
    cy.wrap(thingThisWeek).as('thingThisWeek');
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

Given('there is a problem with the server', () => {
  cy.mockGraphqlOps({
    operations: {
      MyThingThisWeek: {
        errors: ['Internal error.']
      }
    }
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

When('I click the Complete button', () => {
  // We get the button first here to make sure that the button exists (the initial graphql query has been run
  // and the page has rendered) before we change the graphql mocks again.
  cy.get('button')
    .contains('Complete')
    .as('completeButton');
  cy.get('@thingThisWeek').then(thingThisWeek => {
    cy.mockGraphqlOps({
      operations: {
        CompleteThingThisWeek: {
          completeThingThisWeek: {
            success: true
          }
        },
        MyThingThisWeek: {
          me: {
            thingThisWeek: {
              ...thingThisWeek,
              complete: true
            }
          }
        }
      }
    });
  });
  cy.get('@completeButton').click();
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
  cy.get('button')
    .contains(text)
    .as('lastSeenButton');
});

Then('the button is disabled', () => {
  cy.get('@lastSeenButton').should('be.disabled');
});

function pluckThing(dataTable) {
  const rawThing = dataTable.hashes()[0];
  return {
    description: rawThing.description,
    complete: rawThing.complete === 'true'
  };
}

Then('I see the thing input form', () => {
  cy.get('textarea[data-class-name=thing-input-form')
    .as('thingInputForm')
    .should('be.visible');
});

Then('the thing input form has one of the following placeholders', rawTable => {
  const expectedPlaceholders = pluckPlaceholders(rawTable);
  cy.get('@thingInputForm').then(thingInputForm => {
    expect(expectedPlaceholders).to.contain(thingInputForm.attr('placeholder'));
  });
});

Then('I see confetti!', () => {
  cy.get('div[data-class-name=confetti]').should('be.visible');
});

function pluckPlaceholders(dataTable) {
  return dataTable.hashes().map(row => row.placeholder);
}
