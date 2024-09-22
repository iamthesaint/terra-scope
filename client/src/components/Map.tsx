import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from 'axios';
import throttle from 'lodash/throttle';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import "../styles/Map.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/iamthesaint/cm1b4ht2q00mu01qk2npuh13w",
      projection: "globe",
      zoom: 1.5,
      center: [-90, 40],
    });

    map.on("style.load", () => {
      map.setFog({});
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: true, 
      zoom: 10, 
      placeholder: "Search for places", 
    });

    // Add the geocoder to the map
    map.addControl(geocoder);


    let userInteracting = false;
    const spinEnabled = true;
    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    const spinGlobe = throttle(() => {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }, 100);

    map.on("mousedown", () => {
      userInteracting = true;
    });
    map.on("mouseup", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.on("dragend", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.on("pitchend", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.on("rotateend", () => {
      userInteracting = false;
      spinGlobe();
    });
    map.on("moveend", () => {
      spinGlobe();
    });

    spinGlobe();

    const locations = [
      { lng: -74.006, lat: 40.7128, name: "New York City" },
      { lng: 2.3522, lat: 48.8566, name: "Paris" },
      { lng: 139.6917, lat: 35.6895, name: "Tokyo" }
    ];

    const fetchWeather = async (lat: number, lon: number) => {
      const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`; // units=imperial for fahrenheit
    
      try {
        const response = await axios.get(weatherUrl);
        if (response.status === 200) {
          const { main, weather } = response.data;
          return {
            temp: main.temp,  // temp in °F
            description: weather[0].description,
          };
        } else {
          console.error(`Weather API responded with status: ${response.status}`);
          return {
            temp: "--°F",
            description: "Weather data unavailable",
          };
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
        return {
          temp: "--°F",
          description: "Weather data unavailable",
        };
      }
    };

    const truncateDescription = (description: string, maxLength: number) => {
      if (description.length > maxLength) {
        return description.substring(0, maxLength) + "...";
      }
      return description;
    };

    const fetchDescription = async (placeName: string) => {
      try {
        const response = await axios.get(
          `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&exintro&explaintext&format=json&titles=${encodeURIComponent(placeName)}`
        );
        const page = Object.values(response.data.query.pages)[0];
        const pageData = page as { extract?: string };
        return pageData.extract || "No description available";
      } catch (error) {
        console.error("Error fetching Wikipedia description:", error);
        return "No description available";
      }
    };

    locations.forEach(async (location) => {
      const description = await fetchDescription(location.name);
      const truncatedDescription = truncateDescription(description, 150); 
      const weatherData = await fetchWeather(location.lat, location.lng);

      const popupContent = `
        <div style="max-width: 200px;">
          <h3>${location.name}</h3>
          <p>${truncatedDescription}</p>
          <p><strong>Weather:</strong> ${weatherData.temp}°F, ${weatherData.description}</p>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div className="map-container" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
}
