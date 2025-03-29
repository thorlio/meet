// src/components/EventList.jsx
import React from "react";
import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events.map((event, index) => (
        <Event key={event.id || index} event={event} />
      ))}
    </ul>
  );
};

export default EventList;
