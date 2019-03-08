Feature: Redirect to LoginPage
  Scenario Outline: Visiting an authed page while not logged in
    Given I am not logged in
    When I visit the page "<route>"
    Then I am redirected to the page "/login"

    Examples:
      | route         |
      | /me           |
      | /seatgeek     |
      | /settings     |
      | /notarealpage |
