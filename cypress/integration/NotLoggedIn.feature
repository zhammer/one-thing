Feature: Redirect to LoginPage
  If am not logged in and I visit any page that requires authentication
  or I visit an unknown route, I should be redirected to the /login page.

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
