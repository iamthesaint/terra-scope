import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// route to search for a location and fetch details
router.get("/", async (req, res) => {
  const { query } = req.query;

  try {
    // endpoint ONE: search the location by name (GEOS CAT!) to get the location id
    const searchUrl = `https://api.content.tripadvisor.com/api/v1/location/search?key=${process.env.TRIPADVISOR_API_KEY}&searchQuery=${query}&category=geos&language=en`;

    const searchOptions = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    const searchResponse = await fetch(searchUrl, searchOptions);
    const searchData = await searchResponse.json();

    if (!searchData.data || searchData.data.length === 0) {
      return res.status(404).json({ error: "No locations found" });
    }

    const locationId = searchData.data[0].location_id;

    // endpoint TWO: use loc id to get information for popup
    const detailsUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/details?language=en&currency=USD&key=${process.env.TRIPADVISOR_API_KEY}`;
    const detailsResponse = await fetch(detailsUrl, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const detailsData = await detailsResponse.json();

    // endpoint THREE: fetch location photos using the location id
    const photosUrl = `https://api.content.tripadvisor.com/api/v1/location/${locationId}/photos?key=${process.env.TRIPADVISOR_API_KEY}`;
    const photosResponse = await fetch(photosUrl, {
      method: "GET",
      headers: { accept: "application/json" },
    });
    const photosData = await photosResponse.json();

    // extract relevant data from the responses

    //details
    const destinationDetails = {
      name: detailsData.name,
      description: detailsData.description || "No description available",
      web_url: detailsData.web_url || "",
    };

    //photos
    interface Photo {
      id: string;
      images: {
        large?: {
          url: string;
        };
      };
      caption?: string;
    }

    const photos = photosData.data.map((photo: Photo) => ({
      id: photo.id,
      imageUrl: photo.images.large?.url || "No image available",
      caption: photo.caption || "No caption",
    }));

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
