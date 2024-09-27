export const fetchTripAdvisorData = async (query: string) => {
  const response = await fetch(`/tripadv?query=${encodeURIComponent(query)}`); // Call your backend route
  
  if (!response.ok) {
    throw new Error('Failed to fetch TripAdvisor data');
  }
  
  const data = await response.json();
  return data;
};
