/// <reference types="cypress" />

import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";

beforeEach(() => {
  cy.clearLocalStorage();
});

Given("I am logged in", () => {
  cy.then(() => { localStorage.setItem("accessToken", "cypress_access_token") });
});

Given("I am on the settings page", () => {
  cy.visit("/settings");
});

When(`I click the button that says {string}`, buttonText => {
  cy.get("button")
    .contains(buttonText)
    .click();
});

Then("I am redirected to the login page", () => {
  cy.location("pathname").should("eq", "/login");
});

Then("my login information is gone", () => {
  cy.then(() => {
    expect(localStorage.getItem("accessToken")).to.be.null;
  })
});
