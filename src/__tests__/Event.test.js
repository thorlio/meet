import App from "../App";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";

const event = mockData[0].items[0];

describe("<Event /> component", () => {
  test("renders event title (summary)", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test("renders event start time", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.start.dateTime)).toBeInTheDocument();
  });

  test("renders event location", () => {
    render(<Event event={event} />);
    expect(screen.getByText(event.location)).toBeInTheDocument();
  });

  test('renders a "Show Details" button', () => {
    render(<Event event={event} />);
    expect(
      screen.getByRole("button", { name: /show details/i })
    ).toBeInTheDocument();
  });

  test("details are hidden by default", () => {
    render(<Event event={event} />);
    const details = screen.queryByText(event.description);
    expect(details).not.toBeInTheDocument();
  });

  test('clicking "Show Details" reveals the description and link', () => {
    render(<Event event={event} />);
    fireEvent.click(screen.getByText(/show details/i));
    expect(
      screen.getByText(/ask google to show you the list/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/view on google calendar/i)).toBeInTheDocument();
  });

  test('clicking "Hide Details" hides the description again', () => {
    render(<Event event={event} />);
    const button = screen.getByText(/show details/i);
    fireEvent.click(button); // show
    fireEvent.click(screen.getByText(/hide details/i)); // hide
    expect(
      screen.queryByText((content) =>
        content.includes("Have you wondered how you can ask Google")
      )
    ).not.toBeInTheDocument();
  });
});
