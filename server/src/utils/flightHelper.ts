import axios from 'axios';
import dotenv from "dotenv";
dotenv.config();


// function to get access token
const getAmadeusAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      {
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_API_KEY,
        client_secret: process.env.AMADEUS_API_SECRET,
      }
    );
    return response.data.access_token; // return the token
  } catch (error) {
    console.error('Error fetching Amadeus access token:', error);
    throw new Error('Unable to retrieve Amadeus access token.');
  }
};

// function to get flight data using the access token
export const getFlightData = async (
  origin: string,
  destination: string,
  departureDate: string,
  returnDate: string
) => {
  try {
    const accessToken = await getAmadeusAccessToken();

    // fetch flight data from amadeus api
    const response = await axios.get(
      `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=1&nonStop=false&currencyCode=USD&max=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // origin, destination, and price
    const flights = response.data.data.map((flight: any) => {
      return {
        origin: flight.itineraries[0].segments[0].departure.iataCode,
        destination: flight.itineraries[0].segments[0].arrival.iataCode,
        price: flight.price.total,
      };
    });

    return flights; // return filtered flight data
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw new Error('Error retrieving flight data.');
  }
};