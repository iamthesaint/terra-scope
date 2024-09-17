import { Request, Response } from 'express';
import { getDefaultCategories } from '../utils/categoryHelper';
import { getCityInfo, getPlacesByCategory, getActivities } from '../utils/hereHelper';

export const searchDestinations = async (req: Request, res: Response) => {
  const { location, category, activity } = req.query;

  try {
    if (!location && !category && !activity) {
    // display homepage with default categories unless search parameters are provided
      const defaultCategories = await getDefaultCategories();
      return res.json({ defaultCategories });
    }

    let placeData = null;
    let latLng = null;
    let categoryData = null;
    let activityData = null;

    if (location) {
      placeData = await getCityInfo(location as string);
      latLng = `${placeData.items[0].position.lat},${placeData.items[0].position.lng}`;
    }

    if (category) {
      categoryData = await getPlacesByCategory(category as string, latLng || '0,0');
    }

    if (activity) {
      activityData = await getActivities(activity as string, latLng || '0,0');
    }

    res.json({
      location: placeData ? placeData.items[0].address.city : 'No location specified',
      categoryResults: categoryData ? categoryData.items : [],
      activityResults: activityData ? activityData.items : [],
    });
  } catch (error) {
    console.error('Error fetching destination data:', error);
    res.status(500).json({ error: 'Error fetching destination data' });
  }

  return;
};
