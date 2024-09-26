export const fetchTripAdvisorData = async (query: string) => {
  console.log("Fetching TripAdvisor data for:", query);
  try {
    const response = await fetch(`/tripadv?query=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error('Failed to fetch TripAdvisor data');
    }

    const data = await response.json();

    // destruct the details and photos from the response
    const { details, photos } = data;

    const destination = {
      name: details.name || query,
      description: details.description || "No description available for this location",
      web_url: details.web_url || "#",
      image: photos[0]?.imageUrl || "No photo available for this location",
    };

    return destination;
  } catch (error) {
    console.error("Error fetching data from TripAdvisor:", error);
    return null;
  }
};


