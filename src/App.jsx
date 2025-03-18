import React from "react";
import EventList from "./components/EventList";
import NumberOfEvents from "./components/NumberOfEvents";

function App() {
  return (
    <div className="App">
      <EventList />
      <NumberOfEvents setNumberOfEvents={() => {}} />
    </div>
  );
}

export default App;
