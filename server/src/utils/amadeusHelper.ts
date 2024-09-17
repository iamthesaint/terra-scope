import axios from 'axios';

// function to get access token
const getAmadeusAccessToken = async () => {
  // amadeus requires a token to access their API
  const response = await axios.post(
    'https://test.api.amadeus.com/v1/security/oauth2/token',
    {
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY,
      client_secret: process.env.AMADEUS_API_SECRET, 
    }
  );
  return response.data.access_token; // return the token
};

// fx to get flight data using the access token
export const getFlightData = async (
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string
) => {
  // get access token
  const accessToken = await getAmadeusAccessToken();

  // api call to fetch flight data
  const response = await axios.get(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=1&nonStop=false&max=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`, // use the bearer token
      },
    }
  );
  return response.data;
};
