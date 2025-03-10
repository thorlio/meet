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

## User Stories

1. **Filter Events by City**
   As a user, I want to filter events by city so that I can see the list of events that take place in that city.
2. **Show/Hide Event Details**
   As a user, I would like to be able to show/hide event details so that I can see more/less information about an event.
3. **Specify Number of Events**
   As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once.
4. **Use the App Offline**
   As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online.
5. **Add App Shortcut to Home Screen**
   As a user, I would like to be able to add the shortcut to my home screen so that I can open the app faster.
6. **Display Charts for Event Details**
   As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city.

## Test Scenarios (Gherkin)

**Feature 1: Filter Events by City**
Scenario: When user hasn't searched for a cty, show upcoming events from all cities.
Given the user has not searched for a city;
When they visit the homepage;
Then the app should display upcoming events from all available cities.

Scenario: User should see a list of suggestions when they search for a city.
Given the user is typing in the city search bar;
When they enter a valid city name;
Then the app should display a list of suggested cities.

Scenario: User can select a city from the suggested list.
Given they user sees a list of suggested cities;
When they click on a city from the list;
Then the app should display events from the selected city.

**Feature 2: Show/Hide Details**
Scenario: An event element is collapsed by default.
Given the user is viewing the events list;
When the app loads;
Then all event details should be collapsed by defalt.

Scenario: User can expant and event to see details.
Given the event details are collapsed;
When the user clisk on the "Show Details" button;
Then the even details should expand.

Scenario: User can collapse an event to hide details.
Given the event details are expanded;
When the user clicks on the "Hide details" button;
Then the event details should collapse.

**Feature 3: Specify Number of Events**
Scenario: When user hasn't specified a number, 32 events are shown by default.
Given the user has not specified the number of events;
When they open the app;
Then the app should display 32 events by default.

Scenario: User can change the number of events displayed.
Given the user is on the event list page;
When they enter a number in the "Number of Events" input;
Then the event list should update to show the specified number of events.

**Feature 4: Use the App When Offline**
Scenario: Show cached data when there's no internet connection.
Given the user is offline;
When they open the app;
Then the app should disply the last loaded events from cache.

Scenario: Show error when user changes search settings (city, number of events).
Given the user is offline;
When they attempt to search for a new city or change the number of events;
Then the app should display an error message.

**Feature 5: Add an App Shortcut to the Home Screen**
Scenario: User can install the meet app as a shortcut on their device home screen.

Note: this feature is handled by the user's operating system (OS) and cannot be tested within the app itself.

**Feature 6: Display Charts Visualizing Event Details**
Scenario: Show a chart with the numver of upcoming events in each city.
Given there are multiple events in different cities;
When the user accesses the event visualization section;
Then the app should display a chart showing the number of upcoming events per city.
