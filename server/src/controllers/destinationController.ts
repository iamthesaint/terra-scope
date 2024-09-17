import { Request, Response } from "express";
import axios from "axios";
import { getDefaultCategories } from "../utils/categoryHelper";
import {
  getPlacesByCategory,
  getPlacesByActivity,
  getWeatherInfo,
  getPointsOfInterest
} from "../utils/apiHelper";

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN || "";


export const searchDestinations = async (req: Request, res: Response) => {
  const { location, category, activity } = req.query;

  try {
    // case #1: display homepage with default categories until search parameters are provided
    if (!location && !category && !activity) {
      const defaultCategories = await getDefaultCategories();
      return res.json({ defaultCategories });
    }

    let placeData = null;
    let categoryData = null;
    let activityData = null;
    let weatherData = null;
    let poiData = null;

    // case #2: search for a location and fetch data from mapbox (necessary coordinates)
    if (location) {
      const response = await axios.get(
        `https://api.mapbox.com/search/searchbox/v1/forward?q=${location}`,
        {
          params: { access_token: mapboxAccessToken },
        }
      );
      const cityData = response.data;
      const [ longitude, latitude ] = cityData.features[0].geometry.coordinates;
      placeData = {
        name: cityData.features[0].text,
        coordinates: { latitude, longitude },
      };

      // fetch weather data using the coordinates
      weatherData = await getWeatherInfo(latitude, longitude);

      // fetch points of interest using the coordinates
      poiData = await getPointsOfInterest(latitude, longitude);
    }

    // case #3: search for places by category
    if (category) {
      categoryData = await getPlacesByCategory(category as string);
    }

    // case #4: search for places by activity
    if (activity) {
      activityData = await getPlacesByActivity(activity as string);
    }

    // return the data as the response
    return res.json({
      location: placeData ? placeData : "No location specified",
      weather: weatherData ? weatherData : "No weather data available",
      pointsOfInterest: poiData ? poiData.data : "No points of interest available",
      categoryResults: categoryData ? categoryData.items : [],
      activityResults: activityData ? activityData.items : [],
    });
    
  } catch (error) {
    console.error("Error fetching destination data:", error);
    return res.status(500).json({ error: "Error fetching destination data" });
  }
};
