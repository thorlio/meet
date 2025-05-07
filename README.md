#MEET App

## Project Overview

Meet App is a serverless, progressive web application (PWA) built using React and the Google Calendar API. The app allows users to search for upcoming events in various cities, view details, and visualize event data using interactive charts. The project follows a Test Driven Development (TDD) approach to ensure code quality and functionality.

## Features

- Filter Events by City.
- Show/Hide Event Details.
- Specify Number of Events.
- Use the App When Offline.
- Add an App Shortcut to the Home Screen.
- Display Charts Visualizing Event Details.

## Test Scenarios (Gherkin)

**Feature 1: Filter Events by City. USER STORY:**

- As a user,
- I want to filter events by city
- So that I can see the list of events that take place in that city.

Scenario 1: When user hasn't searched for a city, show upcoming events from all cities.

- Given the user has not searched for a city;
- When they open the app;
- Then the app should display upcoming events from all cities.

Scenario 2: User should see a list of suggestions when they search for a city.

- Given the user is typing in the city search bar;
- When they enter a valid city name;
- Then the app should display a list of suggested cities.

Scenario: User can select a city from the suggested list.

- Given the user sees a list of suggested cities;
- When they click on a city from the list;
- Then the app should display events from the selected city.

**Feature 2: Show/Hide Details. USER STORY:**

- As a user;
- I want to be able to hide or show event details,
- So I can choose when to view more information without cluttering the screen.

Scenario: An event element is collapsed by default.

- Given the user is on the main screen;
- When the user opens the app;
- Then the event details should be hidden by default.

Scenario: User can expand an event to see details.

- Given the event details are collapsed;
- When the user clicks on the "Show Details" button;
- Then the event details should be displayed.

Scenario: User can collapse an event to hide details.

- Given the event details are expanded;
- When the user clicks on the "Hide Details" button;
- Then the event details should be collapsed.

**Feature 3: Specify Number of Events. USER STORY:**

- As a user;
- I should be able to specify a number;
- So that I can control how many events are displayed on the screen.

Scenario: When user hasn't specified a number, 32 events are shown by default.

- Given the user has not specified a number of events;
- When they open the app;
- Then the app should display 32 events by default.

Scenario: User can change the number of events displayed.

- Given the user enters a specific number of events;
- When the app fetches for the events;
- Then the event list should update to show the specified number of events.

**Feature 4: Use the App When Offline. USER STORY:**

- As a user;
- I want to be able to use the app offline;
- So events will still be available even when there is no internet connection.

Scenario: Show cached data when there's no internet connection.

- Given the user is offline;
- When they open the app;
- Then the app should display the last retrieved events from cache.

Scenario: Show error when user changes search settings (city, number of events).

- Given the user is offline;
- When they try to search for a new city or change the number of events;
- Then the app will display an error message.

**Feature 5: Add an App Shortcut to the Home Screen: USER STORY:**

- As a user;
- I want to be able to add the app shortcut to my home screen;
- So I can quickly access the app with a click of a button.

Scenario: User can install the meet app as a shortcut on their device home screen.

Note: this feature is handled by the user's operating system (OS) and cannot be tested within the app itself.

**Feature 6: Display Charts Visualizing Event Details. USER STORY:**

- As a user;
- I want to be able to see a visual chart displaying the events details;
- So I can see how many events are held in each city.

Scenario: Show a chart with the number of upcoming events in each city.

- Given there are multiple events in different cities;
- When the user opens the visual chart;
- Then the app should display a chart showing the number of upcoming events per city.
