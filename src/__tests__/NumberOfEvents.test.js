import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  test("renders textbox input", () => {
    render(<NumberOfEvents setNumberOfEvents={() => {}} />);
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  test("textbox default value is 32", () => {
    render(<NumberOfEvents setNumberOfEvents={() => {}} />);
    expect(screen.getByRole("spinbutton")).toHaveValue(32);
  });

  test("changes number of events when user types", async () => {
    const user = userEvent.setup();
    render(<NumberOfEvents setNumberOfEvents={() => {}} />);
    const input = screen.getByRole("spinbutton");
    await user.clear(input); // Clear the 32
    await user.type(input, "10");
    expect(input).toHaveValue(10);
  });
});
