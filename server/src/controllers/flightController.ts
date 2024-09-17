import { Request, Response } from 'express';
import { getFlightData } from '../utils/flightHelper';

// controller logic to get flight data
export const searchFlights = async (req: Request, res: Response) => {
  const { origin, destination, departureDate, returnDate } = req.query;

  try {
    const flightData = await getFlightData(
      origin as string,
      destination as string,
      departureDate as string,
      returnDate as string
    );

    // response with only the relevant flight data
    return res.json(flightData);
  } catch (error) {
    console.error('Error fetching flight data:', error);
    return res.status(500).json({ error: 'Error fetching flight data' });
  }
};
