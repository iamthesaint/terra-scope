import axios from 'axios';

export const getFlightData = async (origin: string, destination: string, departureDate: string, returnDate: string) => {
  const response = await axios.get(
    `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&returnDate=${returnDate}&adults=1&nonStop=false&max=10`,
    {
      headers: {
        Authorization: `Bearer ${process.env.AMADEUS_API_KEY}`,
      },
    }
  );
  return response.data;
};