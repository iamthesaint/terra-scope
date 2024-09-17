import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;
const openWeatherKey = process.env.OPENWEATHER_API_KEY;
const amadeusApiKey = process.env.AMADEUS_API_KEY;

// get city information from the mapbox api
export const getCityInfo = async (city: string) => {
  const response = await axios.get(
    `https://api.mapbox.com/search/searchbox/v1/forward?q=${city}`,
    {
      params: {
        access_token: mapboxAccessToken,
      },
    }
  );

  return response.data;
};

// fetch weather information from the openweather api
export const getWeatherInfo = async (latitude: number, longitude: number) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
  );
  return response.data;
};

// fetch nearby points of interest from the amadeus api
export const getPointsOfInterest = async (latitude: number, longitude: number) => {
  const response = await axios.get(
    `https://test.api.amadeus.com/v1/reference-data/locations/pois?latitude=${latitude}&longitude=${longitude}&radius=20`,
    {
      headers: {
        Authorization: `Bearer ${amadeusApiKey}`,
      },
    }
  );
  return response.data;
};

// fetch places by category without location
export const getPlacesByCategory = async (category: string) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${category}.json?access_token=${mapboxAccessToken}`
  );
  return response.data;
};

// fetch places by activities without location
export const getPlacesByActivity= async (activity: string) => {
  const response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${activity}.json?access_token=${mapboxAccessToken}`,
  );
  return response.data;
};


