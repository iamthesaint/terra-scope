import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

// get city information from the mapbox api
export const getCityInfo = async () => {
  const response = await axios.get(
    `https://api.mapbox.com/search/searchbox/v1/suggest?q={search_text}`,
    {
      params: { access_token: mapboxAccessToken },
    }
  );
  return response.data;
}

// add get weather information from the open weather api



