// provides a context for saved locations to manage state across the app

import { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

interface Destination {
  name: string;
  description: string;
  image: string;
  web_url: string;
}

export interface SavedLocationsContextProps {
  savedLocations: Destination[];
  addLocation: (location: Destination) => void;
}

export const SavedLocationsContext = createContext<SavedLocationsContextProps | undefined>(undefined);

export const SavedLocationsProvider = ({ children }: { children: ReactNode }) => {
  const [savedLocations, setSavedLocations] = useState<Destination[]>([]);

  useEffect(() => {
    const fetchSavedLocations = async () => {
      try {
        const response = await axios.get('/api/saved');
        console.log('Fetched saved locations:', response.data); // Log the response data
        setSavedLocations(response.data);
      } catch (error) {
        console.error("Error fetching saved locations:", error);
      }
    };

    fetchSavedLocations();
  }, []);

  const addLocation = (location: Destination) => {
    setSavedLocations((prevLocations) => [...prevLocations, location]);
  };

  return (
    <SavedLocationsContext.Provider value={{ savedLocations, addLocation }}>
      {children}
    </SavedLocationsContext.Provider>
  );
}

export default SavedLocationsProvider;