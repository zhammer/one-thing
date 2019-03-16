Feature: SeatGeek Page
  On the SeatGeek page I can see the things that people at SeatGeek
  want to do this week.

  Background:
    Given I am logged in

  Scenario: Nobody at SeatGeek has submitted a Thing this week
    Given nobody at SeatGeek has submitted a Thing this week
    When I visit the SeatGeek page
    Then I see the title "SeatGeek"
    And I see the subtitle "Be the first person to submit your One Thing this week!"

  Scenario: People at Seatgeek have submitted Things this week
    Given the following things have been submitted this week:
      | id | firstName | lastName | description                | complete | createdAt           |
      | 1  | Zach      | Hammer   | Learn about interviewing.  | true     | 2019-03-16T00:10:15 |
      | 2  | Billie    | Holiday  | Go to a #music-club event. | false    | 2019-03-17T00:11:00 |
      | 3  | Lebron    | James    | Join a SG sports team.     | true     | 2019-03-18T05:42:12 |
    When I visit the SeatGeek page
    Then I see the title "SeatGeek"
    And I see the subtitle "Here are the things people at SeatGeek want to do this week!"
    And I see all the submitted things

  Scenario: There is an error fetching this week's Things
    Given there is a problem with the server
    When I visit the SeatGeek page
    Then I see the title "SeatGeek"
    And I see the subtitle "There was an error."


