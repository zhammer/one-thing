/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.server();
  cy.mockGraphql({ schema: Cypress.env('GRAPHQL_SCHEMA') });
});

Given('I havent submitted a thing this week', () => {
  const me = cy.get('@me');
  cy.mockGraphqlOps({
    operations: {
      MyThingThisWeek: {
        me: {
          ...me,
          thing: null
        }
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
  cy.get('@thingInputForm').type(text);
});

When('I click the Submit button', () => {
  cy.get('button')
    .contains('Submit')
    .click();
});

Then('I see my thing', () => {
  cy.get('div[data-class-name=thing').as('thing');
});

Then('my thing is not complete', () => {
  cy.get('@thing')
    .find('svg[data-cass-name=icon-checkmark]')
    .should('not.exist');
});

Then(`I see a button that says {string}`, text => {
  cy.get('button').contains(text);
});
