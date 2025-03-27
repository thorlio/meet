import mockData from "./mock-data";

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};

export const getEvents = async () => {
  const allEvents = mockData.flatMap((calendar) => calendar.items || []);
  return allEvents;
};
