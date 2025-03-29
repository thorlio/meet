import React, { useState, useEffect } from "react";

const CitySearch = ({ allLocations = [], setCurrentCity }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState(() => []);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [JSON.stringify(allLocations)]);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setQuery(value);
    setShowSuggestions(true);

    const filteredSuggestions = allLocations
      ? allLocations.filter((location) =>
          location.toUpperCase().includes(value.toUpperCase())
        )
      : [];

    setSuggestions(filteredSuggestions);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false);
    if (setCurrentCity) {
      setCurrentCity(value);
    }
  };

  return (
    <div id="city-search">
      <input
        type="text"
        role="textbox"
        className="city"
        value={query}
        onChange={handleInputChanged}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search for a city"
      />

      {showSuggestions && (
        <ul className="suggestions" role="listbox">
          {suggestions.map((location) => (
            <li key={location} onClick={handleItemClicked}>
              {location}
            </li>
          ))}
          <li key="all" onClick={handleItemClicked}>
            See all cities
          </li>
        </ul>
      )}
    </div>
  );
};

export default CitySearch;
