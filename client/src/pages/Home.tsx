import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  interface SearchResult {
    place_name: string;
    center: [number, number];
  }

  const [results, setResults] = useState<SearchResult[]>([]);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (coordinates && !map) {
      const mapInstance = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 12,
      });
      setMap(mapInstance);
    } else if (map && coordinates) {
      map.flyTo({ center: coordinates, zoom: 12 });
    }
  }, [coordinates, map]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=${mapboxgl.accessToken}`
        );
        setResults(response.data.features);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const handleResultClick = (coordinates: [number, number]) => {
    setCoordinates(coordinates);
    if (map) {
      map.flyTo({ center: coordinates, zoom: 12 });
    }
  };

  return (
    <div>
      <h1>Welcome to Trip Zen</h1>
      <p>Plan your next adventure by exploring destinations and activities.</p>

      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a location..."
      />

      {results.length > 0 && (
        <ul>
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleResultClick(result.center)}
              style={{ cursor: 'pointer' }}
            >
              {result.place_name}
            </li>
          ))}
        </ul>
      )}

      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Home;
