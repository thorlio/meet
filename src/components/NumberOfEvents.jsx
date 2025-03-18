import React, { useState } from "react";

const NumberOfEvents = ({ setNumberOfEvents }) => {
  const [number, setNumber] = useState(32);

  const handleChange = (e) => {
    const value = e.target.value;
    const numericValue = value === "" ? "" : parseInt(value, 10);
    setNumber(numericValue);
    setNumberOfEvents(numericValue || 0);
  };

  return (
    <div className="number-of-events">
      <label htmlFor="number-of-events">Number of Events: </label>
      <input
        id="number-of-events"
        type="number"
        value={number}
        onChange={handleChange}
      />
    </div>
  );
};

export default NumberOfEvents;
