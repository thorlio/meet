// src/App.js

import React, { useEffect, useState } from "react";
import EventList from "./components/EventList";
import CitySearch from "./components/CitySearch";
import { getEvents, extractLocations } from "./api";

const App = () => {
  const [events, setEvents] = useState([]);
  const [allLocations, setAllLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const allEvents = await getEvents();
      setEvents(allEvents);
      setAllLocations(extractLocations(allEvents));
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} />
      <EventList events={events} />
    </div>
  );
};

export default App;
