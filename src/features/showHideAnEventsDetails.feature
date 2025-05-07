Feature: Show/Hide an Event's Details
  Scenario: An event element is collapsed by default
    Given the user is on the main screen
    When the user opens the app
    Then the event details should be hidden by default

  Scenario: User can expand an event to see details
    Given the event details are collapsed
    When the user clicks on the "Show Details" button
    Then the event details should be displayed

  Scenario: User can collapse an event to hide details
    Given the event details are expanded
    When the user clicks on the "Hide Details" button
    Then the event details should be collapsed