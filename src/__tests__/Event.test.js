import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Event from "../components/Event";

const mockEvent = {
  summary: "Berlin Event 1",
  location: "Berlin, Germany",
  description: "An awesome event in Berlin",
  start: { dateTime: "2025-04-01T10:00:00Z" },
  end: { dateTime: "2025-04-01T12:00:00Z" },
};

describe("<Event /> component", () => {
  test("renders event title (summary)", () => {
    render(<Event event={mockEvent} />);
    expect(screen.getByText("Berlin Event 1")).toBeInTheDocument();
  });

  test("renders event start time", () => {
    render(<Event event={mockEvent} />);
    expect(screen.getByText("2025-04-01T10:00:00Z")).toBeInTheDocument();
  });

  test("renders event location", () => {
    render(<Event event={mockEvent} />);
    expect(screen.getByText("Berlin, Germany")).toBeInTheDocument();
  });

  test("renders a 'Show Details' button", () => {
    render(<Event event={mockEvent} />);
    expect(
      screen.getByRole("button", { name: /show details/i })
    ).toBeInTheDocument();
  });

  test("details are hidden by default", () => {
    render(<Event event={mockEvent} />);
    expect(
      screen.queryByText("An awesome event in Berlin")
    ).not.toBeInTheDocument();
  });

  test("clicking 'Show Details' reveals the description and link", () => {
    render(<Event event={mockEvent} />);
    fireEvent.click(screen.getByText(/show details/i));
    expect(screen.getByText("An awesome event in Berlin")).toBeInTheDocument();
  });

  test("clicking 'Hide Details' hides the description again", () => {
    render(<Event event={mockEvent} />);
    const button = screen.getByText(/show details/i);
    fireEvent.click(button);
    fireEvent.click(screen.getByText(/hide details/i));
    expect(
      screen.queryByText("An awesome event in Berlin")
    ).not.toBeInTheDocument();
  });
});
