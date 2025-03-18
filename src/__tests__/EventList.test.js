import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Event from "../components/Event";

// Mock event data
const mockEvent = {
  summary: "Sample Event",
  created: "2024-03-17T12:00:00Z",
  location: "123 Test Street",
  description: "This is a test event description.",
};

describe("<Event /> component", () => {
  test("renders event title, time, and location", () => {
    const { getByText } = render(<Event event={mockEvent} />);
    expect(getByText(mockEvent.summary)).toBeInTheDocument();
    expect(getByText(mockEvent.created)).toBeInTheDocument();
    expect(getByText(mockEvent.location)).toBeInTheDocument();
  });

  test("renders show details button", () => {
    const { getByText } = render(<Event event={mockEvent} />);
    expect(getByText("Show Details")).toBeInTheDocument();
  });

  test("shows event details when show details button is clicked", () => {
    const { getByText, queryByText } = render(<Event event={mockEvent} />);
    const showButton = getByText("Show Details");
    fireEvent.click(showButton);
    expect(getByText(mockEvent.description)).toBeInTheDocument();
    expect(getByText("Hide Details")).toBeInTheDocument();
  });

  test("hides event details when hide details button is clicked", () => {
    const { getByText, queryByText } = render(<Event event={mockEvent} />);
    const showButton = getByText("Show Details");
    fireEvent.click(showButton); // Open first
    const hideButton = getByText("Hide Details");
    fireEvent.click(hideButton); // Then close
    expect(queryByText(mockEvent.description)).not.toBeInTheDocument();
  });
});
