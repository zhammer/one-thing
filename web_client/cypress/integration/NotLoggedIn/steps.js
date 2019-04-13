/// <reference types="cypress" />

import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

Given('I am not logged in', () => {
  cy.clearLocalStorage('accessToken');
});

When(`I visit the page {string}`, route => {
  cy.visit(route);
});
