/// <reference types="cypress" />

import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

Given("I am not logged in", () => {
  cy.clearLocalStorage("accessToken");
});

When(`I visit the page {string}`, route => {
  cy.visit(route);
});

Then(`I am redirected to the page {string}`, route => {
  cy.location('pathname').should('eq', route)
});
