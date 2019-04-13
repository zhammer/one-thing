/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I am logged in', () => {
  localStorage.setItem('accessToken', 'cypress_access_token');
});

Given('I am the person:', dataTable => {
  cy.wrap(pluckPerson(dataTable)).as('me');
});

Then(`I see the title {string}`, title => {
  cy.get('h1').contains(title);
});

Then(`I see the subtitle {string}`, subtitle => {
  cy.get('h2[data-class-name=subtitle]').contains(subtitle);
});

Then('I see the subtitle placeholder', () => {
  cy.get('h2[data-class-name=subtitle-placeholder');
});

Then('I dont see the subtitle placeholder', () => {
  cy.get('h2[data-class-name=subtitle-placeholder').should('not.exist');
});

Then(`I am redirected to the page {string}`, route => {
  cy.location('pathname').should('eq', route);
});

function pluckPerson(dataTable) {
  return dataTable.hashes()[0];
}
