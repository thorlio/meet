import React from "react";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CitySearch from "../components/CitySearch";
import App from "../App";
import { extractLocations, getEvents } from "../api";
import mockData from "../mock-data";

jest.mock("../api", () => ({
  getEvents: jest.fn(() => Promise.resolve(mockData)),
  extractLocations: jest.fn(() => [
    "Berlin, Germany",
    "London, UK",
    "New York, USA",
    "San Francisco, USA",
    "Tokyo, Japan",
  ]),
}));

describe("<CitySearch /> component", () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />);
  });

  test("renders text input", () => {
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });

  test("suggestions list is hidden by default", () => {
    const suggestionList = CitySearchComponent.queryByRole("list");
    expect(suggestionList).not.toBeInTheDocument();
  });

  test("renders a list of suggestions when city textbox gains focus", async () => {
    const user = userEvent.setup();
    render(<CitySearch allLocations={["Berlin, Germany", "London, UK"]} />);

    const cityInputs = screen.getAllByRole("textbox");
    const cityInput = cityInputs[0];

    await user.click(cityInput);

    const suggestions = screen.getByRole("listbox");
    expect(suggestions).toBeInTheDocument();
  });

  test("renders only 'See all cities' when allLocations is undefined and user types a city", async () => {
    const user = userEvent.setup();
    CitySearchComponent.rerender(<CitySearch />); // no props

    const cityTextBox = CitySearchComponent.getByRole("textbox");
    await user.type(cityTextBox, "Paris");

    const suggestionItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionItems).toHaveLength(1);
    expect(suggestionItems[0].textContent).toContain("See all cities");
  });

  test("updates list of suggestions correctly when user types in city textbox", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const suggestions = allLocations.filter((location) =>
      location.toUpperCase().includes(cityTextBox.value.toUpperCase())
    );

    const suggestionListItems = CitySearchComponent.queryAllByRole("listitem");
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);

    for (let i = 0; i < suggestions.length; i++) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test("renders the suggestion text in the textbox upon clicking on the suggestion", async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    await user.type(cityTextBox, "Berlin");

    const BerlinGermanySuggestion =
      CitySearchComponent.queryAllByRole("listitem")[0];
    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe("<CitySearch /> integration", () => {
  test("renders suggestions list when the app is rendered", async () => {
    getEvents.mockResolvedValue(mockData);
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const cityTextBox = within(CitySearchDOM).queryByRole("textbox");
    await user.click(cityTextBox);

    await waitFor(() => {
      const suggestionListItems =
        within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems.length).toBe(6);
    });
  });
});
