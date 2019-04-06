# Since you can't visit other domains in cypress, this is a super
# simple test to make sure when we visit the login page there's
# a clickable login button.

Feature: Login Page
  Scenario: Visiting the login page
    Given I am on the login page
    Then I can see a button that says "Sign in with Gmail"
    And I can click the button
