import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  test("When user hasn't specified a number, 32 events are shown by default", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;

    given("the user has not specified a number of events", () => {});

    when("they open the app", async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
    });

    then("the app should display 32 events by default", async () => {
      await waitFor(() => {
        const events = screen.getAllByRole("listitem");
        expect(events.length).toBe(32);
      });
    });
  });
  test("User can change the number of events displayed", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;

    given("the user enters a specific number of events", async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
    });

    when("the app fetches for the events", async () => {
      const numberInput = screen.getByRole("spinbutton");
      await userEvent.clear(numberInput);
      await userEvent.type(numberInput, "10");
    });

    then(
      "the event list should update to show the specified number of events",
      async () => {
        await waitFor(() => {
          const events = screen.getAllByRole("listitem");
          expect(events.length).toBe(10);
        });
      }
    );
  });
});
