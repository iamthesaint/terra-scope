import { Request, Response } from 'express';
import { getCityInfo } from '../utils/hereHelper'; // import here helper function

export const getDestinationInfo = async (req: Request, res: Response) => {
    try {
        const { city } = req.query as { city: string };
        const cityInfo = await getCityInfo(city);
        res.json(cityInfo);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch city information.' });
    }
};
