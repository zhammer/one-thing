/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

beforeEach(() => {
  cy.server();
  cy.mockGraphql({ schema: Cypress.env('GRAPHQL_SCHEMA') });
});

Given('nobody at SeatGeek has submitted a Thing this week', () => {
  cy.mockGraphqlOps({
    operations: {
      SeatGeekThingsThisWeek: {
        seatGeekThingsThisWeek: {
          edges: []
        }
      }
    }
  });
});

Given('the following things have been submitted this week:', dataTable => {
  const things = pluckThings(dataTable);
  cy.wrap(things).as('things');
  cy.mockGraphqlOps({
    operations: {
      SeatGeekThingsThisWeek: {
        seatGeekThingsThisWeek: {
          edges: buildEdges(things)
        }
      }
    }
  });
});

Given('there is a problem with the server', () => {
  cy.mockGraphqlOps({
    operations: {
      SeatGeekThingsThisWeek: {
        errors: ['Internal error.']
      }
    }
  });
});

When('I visit the SeatGeek page', () => {
  cy.visit('/seatgeek');
});

Then('I see all the submitted things', () => {
  cy.get('@things').then(things => {
    cy.get('div[data-class-name=things-container]')
      .children()
      .should('have.length', things.length)
      .each((thingComponent, i) => {
        const thing = things[i];
        cy.wrap(thingComponent).contains(thing.description);
        cy.wrap(thingComponent).contains(
          'a',
          thing.person.firstName + ' ' + thing.person.lastName.charAt(0)
        );
        cy.wrap(thingComponent)
          .find('svg[data-class-name=icon-checkmark]')
          .should(thing.complete ? 'exist' : 'not.exist');
      });
  });
});

function pluckThings(rawTable) {
  return rawTable.hashes().map(rawThing => ({
    id: rawThing.id,
    description: rawThing.description,
    complete: rawThing.complete === 'true',
    createdAt: rawThing.createdAt,
    person: {
      firstName: rawThing.firstName,
      lastName: rawThing.lastName
    }
  }));
}

function buildEdges(things) {
  return things.map(thing => ({
    cursor: thing.id,
    node: thing
  }));
}
