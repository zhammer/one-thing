/// <reference types="cypress" />

import { Given, Then } from "cypress-cucumber-preprocessor/steps";

Given("I am on the login page", () => {
  cy.visit("/login");
});

Then(`I can see a button that says {string}`, buttonText => {
  cy.get("button")
    .should("contain", buttonText)
    .should("be.visible")
    .as("loginButton");
});

Then("I can click the button", () => {
  cy.get("@loginButton").click();
});
