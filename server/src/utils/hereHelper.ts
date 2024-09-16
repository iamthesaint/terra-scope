import axios from 'axios';

// Here API

export const getCityInfo = async (city: string) => {
    const response = await axios.get(
        `https://geocode.search.hereapi.com/v1/geocode?q=${city}&apiKey=${process.env.HERE_API_KEY}`
    );
    return response.data;
    };

export const getPlacesByCategory = async (category: string, location: string) => {
    const apiKey = process.env.HERE_API_KEY;
    const response = await axios.get(
        `https://discover.search.hereapi.com/v1/discover`, {
            params: {
                in: location,
                q: category,
                apiKey: apiKey
            },
        });
    return response.data;
    }

export const getActivities = async (activity: string, location: string) => {
    const apiKey = process.env.HERE_API_KEY;
    const response = await axios.get(
        `https://discover.search.hereapi.com/v1/discover`, {
            params: {
                in: location,
                q: activity,
                apiKey: apiKey
            },
        });
    return response.data;
};


