Feature: Specify Number of Events

  Scenario: When user hasn't specified a number, 32 events are shown by default
    Given the user has not specified a number of events
    When they open the app
    Then the app should display 32 events by default

  Scenario: User can change the number of events displayed
    Given the user enters a specific number of events
    When the app fetches for the events
    Then the event list should update to show the specified number of events