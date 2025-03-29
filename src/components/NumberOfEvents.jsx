import React from "react";

const NumberOfEvents = ({ numberOfEvents, onNumberChanged }) => {
  return (
    <div id="number-of-events">
      <label htmlFor="number">Number of Events:</label>
      <input
        id="number"
        type="number"
        value={numberOfEvents}
        onChange={(e) => onNumberChanged(Number(e.target.value))}
      />
    </div>
  );
};

export default NumberOfEvents;
