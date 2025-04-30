import { useState } from "react";
import React from "react";

const NumberOfEvents = ({ currentNOE, setCurrentNOE, setErrorAlert }) => {
  const [number, setNumber] = useState(currentNOE.toString());

  const handleInputChanged = (event) => {
    const input = event.target.value;
    if (input === "") {
      setNumber("");
      return;
    }

    const value = Number(input);
    setNumber(value);

    if (isNaN(value) || value <= 0) {
      setErrorAlert("Enter a valid number");
    } else if (value > 32) {
      setErrorAlert("Only maximum of 32 is allowed");
    } else {
      setErrorAlert("");
      setCurrentNOE(value);
    }
  };

  return (
    <div id="number-of-events">
      <label>
        Number of Events:
        <input
          id="numberInput"
          type="number"
          value={number}
          onChange={handleInputChanged}
          data-testid="numberOfEventsInput"
        />
      </label>
    </div>
  );
};

export default NumberOfEvents;
