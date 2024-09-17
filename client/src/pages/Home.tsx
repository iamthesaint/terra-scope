import React, { useState, useEffect } from 'react';
import axios from 'axios';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';

interface SearchResult {
  place_name: string;
  center: [number, number]; // [longitude, latitude]
  image_url: string; // image URL
}

interface Category {
  name: string;
  destinations: SearchResult[];
}

const Home: React.FC = () => {
  const [query, setQuery] = useState(''); // search query
  const [category, setCategory] = useState(''); // category dropdown
  const [activity, setActivity] = useState(''); // activity dropdown
  const [results, setResults] = useState<SearchResult[]>([]); // search results
  const [map, setMap] = useState<mapboxgl.Map | null>(null); // map instance
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null); // coordinates for map

  // categories with destination suggestions
  const categories: Category[] = [
    {
      name: 'Tropical Getaways',
      destinations: [
        {
          place_name: 'Maldives',
          center: [73.2207, 3.2028],
          image_url: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/0c/de/66/caption.jpg?w=1200&h=1600&s=1',
        },
        {
          place_name: 'Hawaii',
          center: [-155.5828, 19.8968],
          image_url: 'https://cdn.aarp.net/content/dam/aarp/travel/Domestic/2021/12/1140-oahu-hero.jpg',
        },
      ],
    },
    {
      name: 'Winter Retreats',
      destinations: [
        {
          place_name: 'Swiss Alps',
          center: [8.5417, 46.802],
          image_url: 'https://s1.it.atcdn.net/wp-content/uploads/2015/11/shutterstock_279572969.jpg',
        },
        {
          place_name: 'Aspen',
          center: [-106.8197, 39.1911],
          image_url: 'https://www.travelandleisure.com/thmb/Yiq3rXHGmHnDrgzBsGmEvqjHxSo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/aspen-colorado-lead-ASPENTG0122-3bd432152d1f4758b1b89fd8a3a231cc.jpg',
        },
      ],
    },
    {
      name: 'Adventure Spots',
      destinations: [
        {
          place_name: 'Grand Canyon',
          center: [-112.1151, 36.1069],
          image_url: 'https://npf-prod.imgix.net/uploads/shutterstock_97706066_1.jpg?auto=compress%2Cformat&crop=focalpoint&fit=crop&fp-x=0.5&fp-y=0.5&h=900&q=80&w=1600',
        },
        {
          place_name: 'Costa Rica',
          center: [-84.0917, 9.7489],
          image_url: 'https://www.wildernesstravel.com/wp-content/uploads/2023/06/arenal-volcano-costa-rica-1680x1063.jpg',
        },
      ],
    },
  ];

  // initialize the map and update based on selected coordinates
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

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/destinations', {
        params: { location: query, category, activity },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  // Update coordinates and map when a destination is clicked
  const handleResultClick = (coordinates: [number, number]) => {
    setCoordinates(coordinates); // Update coordinates state
    if (map) {
      map.flyTo({ center: coordinates, zoom: 12 });
    }
  };

  return (
    <div>
      <h1>Welcome to Trip Zen</h1>
      <p>Plan your next adventure by exploring destinations and activities.</p>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a location"
        />

        {/* Category Dropdown */}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="tropical">Tropical</option>
          <option value="winter">Winter</option>
          <option value="adventure">Adventure</option>
        </select>

        {/* Activity Dropdown */}
        <select value={activity} onChange={(e) => setActivity(e.target.value)}>
          <option value="">Select Activity</option>
          <option value="surfing">Surfing</option>
          <option value="hiking">Hiking</option>
          <option value="museum">Museum</option>
        </select>

        <button type="submit">Search</button>
      </form>

      {/* Destination Inspiration Sections */}
      {categories.map((cat) => (
        <div key={cat.name}>
          <h2>{cat.name}</h2>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {cat.destinations.map((destination) => (
              <div
                key={destination.place_name}
                onClick={() => handleResultClick(destination.center)}
                style={{ cursor: 'pointer', width: '200px' }}
              >
                <img
                  src={destination.image_url}
                  alt={destination.place_name}
                  style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
                <h4>{destination.place_name}</h4>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Display Search Results */}
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

      {/* Map Container */}
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

export default Home;
