import { Router } from 'express';
import { getFlightData } from '../../utils/amadeusHelper';

const router = Router();

// route for flight offer info
router.get('/flights', async (req, res) => {
  const { origin, destination, departureDate, returnDate } = req.query;

  try {
    const flightData = await getFlightData(
      origin as string,
      destination as string,
      departureDate as string,
      returnDate as string
    );
    res.json(flightData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching flight data' });
  }
});

export default router;
