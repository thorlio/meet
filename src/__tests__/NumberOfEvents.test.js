// src/__tests__/NumberOfEvents.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  test("renders number input correctly", () => {
    render(<NumberOfEvents numberOfEvents={32} onNumberChanged={() => {}} />);
    const numberInput = screen.getByRole("spinbutton");
    expect(numberInput).toBeInTheDocument();
  });

  test("displays default number (32) correctly", () => {
    render(<NumberOfEvents numberOfEvents={32} onNumberChanged={() => {}} />);
    const numberInput = screen.getByRole("spinbutton");
    expect(numberInput).toHaveValue(32);
  });

  test("updates number when user types a new value", async () => {
    const user = userEvent.setup();
    let currentValue = 32;
    const mockHandler = jest.fn((newVal) => {
      currentValue = newVal;
      rerender(
        <NumberOfEvents
          numberOfEvents={currentValue}
          onNumberChanged={mockHandler}
        />
      );
    });

    const { rerender } = render(
      <NumberOfEvents
        numberOfEvents={currentValue}
        onNumberChanged={mockHandler}
      />
    );

    const numberInput = screen.getByRole("spinbutton");

    await user.clear(numberInput);
    await user.type(numberInput, "10");

    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalled();
      expect(numberInput).toHaveValue(10);
    });
  });
});
