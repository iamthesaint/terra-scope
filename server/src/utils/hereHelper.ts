import axios from 'axios';

// fetch place information from the HERE API
export const getCityInfo = async (city: string) => {
  const apiKey = process.env.HERE_API_KEY;
  const response = await axios.get(
    `https://geocode.search.hereapi.com/v1/geocode`,
    {
      params: {
        q: city,
        apiKey: apiKey,
      },
    }
  );
  return response.data;
};

// fetch places by category (using location if available)
export const getPlacesByCategory = async (category: string, location: string = '0,0') => {
  const apiKey = process.env.HERE_API_KEY;
  const response = await axios.get(
    `https://discover.search.hereapi.com/v1/discover`,
    {
      params: {
        q: category,
        at: location, // lat, long or default
        apiKey: apiKey,
      },
    }
  );
  return response.data;
};

// fetch activities by category (using location if available)
export const getActivities = async (activity: string, location: string = '0,0') => {
  const apiKey = process.env.HERE_API_KEY;
  const response = await axios.get(
    `https://discover.search.hereapi.com/v1/discover`,
    {
      params: {
        q: activity,
        at: location, // lat, long or default
        apiKey: apiKey,
      },
    }
  );
  return response.data;
};
