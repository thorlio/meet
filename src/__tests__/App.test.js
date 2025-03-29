// src/__tests__/App.test.js
import React from "react";
import { render, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getEvents } from "../api";
import App from "../App";

describe("<App /> component", () => {
  test("renders list of events", async () => {
    const AppComponent = render(<App />);
    const EventListDOM = AppComponent.container.querySelector("#event-list");

    await waitFor(() => {
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole("listitem");
      expect(allRenderedEventItems.length).toBeGreaterThan(0);
    });
  });
});

describe("<App /> integration", () => {
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector("#event-list");

    // Get filtered events for Berlin
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    await waitFor(() => {
      const allRenderedEventItems =
        within(EventListDOM).queryAllByRole("listitem");
      expect(allRenderedEventItems.length).toBe(berlinEvents.length);
    });
  });
});
