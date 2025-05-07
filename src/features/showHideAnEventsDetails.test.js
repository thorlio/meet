import React from "react";
import { loadFeature, defineFeature } from "jest-cucumber";
import { render, waitFor, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  test("An event element is collapsed by default", ({ given, when, then }) => {
    let AppComponent;
    given("the user is on the main screen", async () => {
      AppComponent = render(<App />);
    });

    when("the user opens the app", async () => {
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
    });

    then("the event details should be hidden by default", async () => {
      const eventDetails = screen.queryAllByTestId("event-details");
      eventDetails.forEach((details) => {
        expect(details).not.toBeInTheDocument();
      });
    });
  });

  test("User can expand an event to see details", ({ given, when, then }) => {
    let AppComponent;
    given("the event details are collapsed", async () => {
      AppComponent = render(<App />);
    });

    when('the user clicks on the "Show Details" button', async () => {
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
      const showDetailsButton = screen.getAllByRole("button", {
        name: "show details",
      })[0];
      await userEvent.click(showDetailsButton);
    });

    then("the event details should be displayed", async () => {
      await waitFor(() => {
        expect(screen.getByTestId("event-details")).toBeInTheDocument();
      });
    });
  });

  test("User can collapse an event to hide details", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the event details are expanded", async () => {
      AppComponent = render(<App />);
      await waitFor(() => {
        expect(screen.getByRole("list")).toBeInTheDocument();
      });
      const showDetailsButton = screen.getAllByRole("button", {
        name: "show details",
      })[0];
      await userEvent.click(showDetailsButton);

      await waitFor(() => {
        expect(screen.getByTestId("event-details")).toBeInTheDocument();
      });
    });

    when('the user clicks on the "Hide Details" button', async () => {
      const hideDetailButton = screen.getAllByRole("button", {
        name: "hide details",
      })[0];
      await userEvent.click(hideDetailButton);
    });

    then("the event details should be collapsed", async () => {
      await waitFor(() => {
        expect(screen.queryByTestId("event-details")).not.toBeInTheDocument();
      });
    });
  });
});
