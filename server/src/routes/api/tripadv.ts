import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// search for a location and fetch details
router.get("/", async (req, res) => {
  const query = req.query.query as string; // Ensure query is a string

  // val the query parameter
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Endpoint ONE: Search the location by name
    const searchUrl = `https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${encodeURIComponent(query)}&category=geos&language=en`;

    const searchOptions = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    const searchResponse = await fetch(searchUrl, searchOptions);
    const searchData = await searchResponse.json();

    // log the search response for debugging
    console.log("Search Data from TripAdvisor:", searchData);

    if (!searchData.data || searchData.data.length === 0) {
      return res.status(404).json({ error: "No locations found" });
    }

    const locationId = searchData.data[0].location_id;

    // Endpoint TWO: Use loc ID to get information for the location
    const detailsUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${process.env.TRIPADVISOR_API_KEY}`;
    const detailsResponse = await fetch(detailsUrl, {
      method: "GET",
      headers: { accept: "application/json" },
    });

    if (!detailsResponse.ok) {
      return res.status(detailsResponse.status).json({ error: "Failed to fetch location details" });
    }
    
    const detailsData = await detailsResponse.json();

    // Endpoint THREE: Fetch location photos using the location ID
    const photosUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=${process.env.TRIPADVISOR_API_KEY}`;
    const photosResponse = await fetch(photosUrl, {
      method: "GET",
      headers: { accept: "application/json" },
    });

    if (!photosResponse.ok) {
      return res.status(photosResponse.status).json({ error: "Failed to fetch location photos" });
    }
    
    const photosData = await photosResponse.json();

    // extract the relevant data 
    const destinationDetails = {
      name: detailsData.name,
      description: detailsData.description || "No description available",
      web_url: detailsData.web_url || "",
    };

    // photo handling
    const photos = photosData.data ? photosData.data.map((photo: any) => ({
      id: photo.id,
      imageUrl: photo.images.large?.url || "No image available",
      caption: photo.caption || "No caption",
    })) : [];

    // return the detailed information and photos to display in the popup
    return res.json({
      details: destinationDetails,
      photos,
    });
  } catch (error) {
    console.error("Error fetching data from TripAdvisor:", error);
    return res.status(500).json({ error: "Failed to fetch TripAdvisor data" });
  }
});

export default router;
