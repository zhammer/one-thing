Feature: Me Page
  On the Me page I can set my thing for the week, check what my thing is once
  set, and mark my thing as complete.

  Background:
    Given I am logged in
    And I am the person:
      | firstName | lastName | email                |
      | Zach      | Hammer   | zhammer@seatgeek.com |

  Scenario: I haven't submitted a Thing this week
    Given I havent submitted a thing this week
    When I visit the Me page
    Then I see the title "Me"
    And I see the subtitle "What is one thing you want to do this week?"
    And I see the thing input form
    And the thing input form has one of the following placeholders
      | placeholder                                    |
      | Increase GTV by 300%                           |
      | Fix the ice machine.                           |
      | Organize a salsa night for seatgeek-en-español |
      | Pick a date for the next womens ERG happy hour |
    And I see a button that says "Submit"
    And the button is disabled

  Scenario: I submit a Thing
    Given I havent submitted a thing this week
    When I visit the Me page
    And I click on the Thing input form
    And I type "Find out what ERGs we have at SeatGeek!"
    And I click the Submit button
    Then I see the subtitle "Your One Thing for this week."
    And I see my thing
    And my thing is not complete
    And I see a button that says "Complete"

  Scenario: I have submitted a Thing this week that I haven't completed
    Given I have submitted the following thing this week:
      | description                                                       | complete |
      | Finish the Voice Of The Customer video for next week's team lunch | false    |
    When I visit the Me page
    Then I see my thing
    And my thing is not complete
    And I see a button that says "Complete"

  Scenario: I mark this week's Thing as complete
    Given I have submitted the following thing this week:
      | description                                                       | complete |
      | Finish the Voice Of The Customer video for next week's team lunch | false    |
    When I visit the Me page
    And I click the Complete button
    Then I see my thing
    And my thing is complete
    And I see confetti!

  Scenario: I have submitted a Thing this week that I have completed
    Given I have submitted the following thing this week:
      | description                                                       | complete |
      | Finish the Voice Of The Customer video for next week's team lunch | true     |
    When I visit the Me page
    Then I see my thing
    And my thing is complete

  Scenario: There is an error fetching my Thing this week
    Given there is a problem with the server
    When I visit the Me page
    Then I see the title "Me"
    And I see the subtitle "There was an error."

  Scenario: The page is loading
    Given I havent submitted a thing this week
    When I visit the Me page
    Then I see the subtitle placeholder
    Then I dont see the subtitle placeholder

#  I can't figure out how to stub an error response from the mock graphql server.
#  Scenario: There is an auth error fetching my Thing this week
#    Given there is a problem with my authentication
#    When I visit the Me page
#    Then I am redirected to the page "/login"
