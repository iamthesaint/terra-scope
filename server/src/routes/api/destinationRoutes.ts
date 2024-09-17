import { Request, Response } from 'express';
import { getCityInfo, getPlacesByCategory, getActivities } from '../../utils/hereHelper';

export const searchDestinations = async (req: Request, res: Response) => {
  const { location, category, activity } = req.query;

  try {
    let placeData = null;
    let latLng = null;
    let categoryData = null;
    let activityData = null;

    // if user provides a location, fetch the place info
    if (location) {
      placeData = await getCityInfo(location as string);
      latLng = `${placeData.items[0].position.lat},${placeData.items[0].position.lng}`;
    }

    // if user provides a category, search for places by category
    if (category) {
      // If latLng is null, default to a general region or search without location
      categoryData = await getPlacesByCategory(category as string, latLng || '0,0');
    }

    // if user provides an activity, search for places by activity
    if (activity) {
      activityData = await getActivities(activity as string, latLng || '0,0');
    }

    // send the results back to the frontend to display
    res.json({
      location: placeData ? placeData.items[0].address.city : 'No location specified',
      categoryResults: categoryData ? categoryData.items : [],
      activityResults: activityData ? activityData.items : [],
    });
  } catch (error) {
    console.error('Error fetching destination data:', error);
    res.status(500).json({ error: 'Error fetching destination data' });
  }
};
