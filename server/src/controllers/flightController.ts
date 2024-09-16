import { Request, Response } from 'express';
import { getFlightData } from '../utils/amadeusHelper'; // import helper function

export const searchFlights = async (req: Request, res: Response) => {
    try {
        const { origin, destination, departureDate, returnDate } = req.query as {
            origin: string;
            destination: string;
            departureDate: string;
            returnDate: string;
        };
        const flightData = await getFlightData(origin, destination, departureDate, returnDate);
        res.json(flightData);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch flight data.' });
    }
};