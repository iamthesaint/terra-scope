import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// Fetch place information from Wikipedia
router.get('/', async (req, res) => {
  const placeName = req.query.placeName as string;

  // Validate that placeName is provided
  if (!placeName) {
    return res.status(400).json({ error: 'Place name is required' });
  }

  try {
    // Construct the Wikipedia API URL
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(placeName)}&prop=extracts|pageimages&exintro&explaintext&pageimages&piprop=thumbnail&pithumbsize=500`;
    
    // Fetch data from Wikipedia API
    const response = await fetch(wikiUrl);
    const data = await response.json();

    // Check if the place was found
    const pageId = Object.keys(data.query.pages)[0];
    if (pageId === '-1') {
      return res.status(404).json({ error: 'Place not found on Wikipedia' });
    }

    // Extract relevant information
    const placeInfo = {
      title: data.query.pages[pageId].title,
      extract: data.query.pages[pageId].extract || 'No description available',
      thumbnail: data.query.pages[pageId].thumbnail?.source || '',
    };

    // Return the place information
    return res.json(placeInfo);
  } catch (error) {
    console.error('Error fetching data from Wikipedia:', error);
    return res.status(500).json({ error: 'Failed to fetch Wikipedia data' });
  }
});

export default router;
