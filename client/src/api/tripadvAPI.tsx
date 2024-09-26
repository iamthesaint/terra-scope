export const fetchTripAdvisorData = async (locationId: string) => {
  console.log("Fetching TripAdvisor data for location ID:", locationId);
  try {
    const apiKey = process.env.VITE_TRIPADVISOR_API_KEY;
    if (!apiKey) {
      throw new Error('TripAdvisor API key is missing');
    }

    const response = await fetch(`https://api.content.tripadvisor.com/api/v1/location/${locationId}/details`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "X-TripAdvisor-API-Key": apiKey,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch TripAdvisor data');
    }

    const data = await response.json();

    const destination = {
      name: data.name || "No name available",
      description: data.description || "No description available for this location",
      web_url: data.web_url || "#",
      image: data.photo?.images?.large?.url || "No photo available for this location",
    };

    return destination;
  } catch (error) {
    console.error("Error fetching data from TripAdvisor:", error);
    return null;
  }
};