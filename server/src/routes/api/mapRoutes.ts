import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config()

const router = express.Router();

// endpoint to fetch mapbox geocoding or map data
router.get('/map', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${req.query.search}.json?access_token=${process.env.MAP_ACCESS_TOKEN}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export { router as mapRoutes };

