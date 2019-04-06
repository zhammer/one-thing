Feature: Settings Page

  Scenario: Logging out
    Given I am logged in
    And I am on the settings page
    When I click the button that says "Log out"
    Then I am redirected to the login page
    Then my login information is gone
