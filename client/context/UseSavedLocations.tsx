// custom hook to use SavedLocationsContext

import { useContext } from "react";
import { SavedLocationsContext } from "./SavedLocationsContext";

export const useSavedLocations = () => {
  const context = useContext(SavedLocationsContext);

  if (!context) {
    throw new Error("useSavedLocations must be used within a SavedLocationsProvider");
  }

  return context;
};
