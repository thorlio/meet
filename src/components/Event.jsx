// src/components/Event.jsx
import React, { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="event">
      <h2>{event.summary}</h2>
      <p>{event.start.dateTime}</p>
      <p>{event.location}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <div className="event-details">
          <p>{event.description}</p>
          <a href={event.htmlLink} target="_blank" rel="noreferrer">
            View on Google Calendar
          </a>
        </div>
      )}
    </li>
  );
};

export default Event;
