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

  Scenario: I mark this week's Thing as complete
    Given I have submitted the following thing this week:
      | description                                                       | complete |
      | Finish the Voice Of The Customer video for next week's team lunch | false    |
    When I visit the Me page
    And I click the Complete button
    Then I see my thing
    And my thing is complete

  Scenario: I have submitted a Thing this week that I have completed
    Given I have submitted the following thing this week:
      | description                                                       | complete |
      | Finish the Voice Of The Customer video for next week's team lunch | true     |
    When I visit the Me page
    Then I see my thing
    And my thing is complete
