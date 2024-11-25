import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import throttle from "lodash/throttle";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import "../styles/Map.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import axios from "axios";
import useSavedLocations from "../context/UseSavedLocations";

const truncateDescription = (description: string, maxLength = 500) => {
  return description.length > maxLength
    ? description.substring(0, maxLength) + "..."
    : description;
};

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { addLocation } = useSavedLocations();
  const [expandedLocations, setExpandedLocations] = useState<{
    [key: string]: boolean;
  }>({});
  const [, setSelectedLocation] = useState<Location | null>(null);

  interface Location {
    coordinates: [number, number];
    placeName: string;
  }

  // Set access token outside of the import statement
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

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      zoom: 10,
      placeholder: "Search for any location on Earth!",
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-left");
    map.addControl(geocoder, "top-left");
    map.dragRotate.disable();

    geocoder.on("result", async (e) => {
      const { result } = e;
      const coordinates = result.geometry.coordinates;
      const placeName = result.text;
      const location: Location = { coordinates, placeName };
      setSelectedLocation(location);

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(`<p>Loading...</p>`)
        .addTo(map);

      new mapboxgl.Marker().setLngLat(coordinates).addTo(map);

      // Fetch weather data
      const fetchWeatherData = async (coordinates: [number, number]) => {
        const [lng, lat] = coordinates;
        const weatherApiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=imperial`;

        try {
          const response = await axios.get(weatherUrl);
          return response.data;
        } catch (error) {
          console.error("Error fetching weather data:", error);
          return null;
        }
      };

      const weatherData = await fetchWeatherData(coordinates);
      const weatherDescription = weatherData
        ? weatherData.weather[0].description
        : "Weather data not available";
      const temperature = weatherData ? weatherData.main.temp : "N/A";

      // Wikipedia data fetching
      try {
        const response = await axios.get(`/api/wiki?placeName=${encodeURIComponent(placeName)}`);
        const placeInfo = response.data;
        const isExpanded = expandedLocations[placeName] || false;

        // Construct HTML for the popup
        const infoHtml = `
         <div style="text-align: center;">
            <h3>${placeInfo.title}</h3>
            <p>${isExpanded ? placeInfo.extract : truncateDescription(placeInfo.extract)}</p>
            <span id="toggle-description" class="toggle-description">
              ${isExpanded ? "<FaChevronUp />" : "<FaChevronDown />"}
            </span>
           <p><strong>Current Weather:</strong> ${weatherDescription}, ${temperature}°F</p>

            <img src="${placeInfo.thumbnail}" alt="${placeInfo.title}" style="width:100%; height:auto;"/>
            <br/>
            <button id="save-destination" type="button" class="btn btn-primary">Add to Your Saved Destinations</button>
          </div>
        `;

        popup.setHTML(infoHtml);

        // Toggle description event listener
        document
          .getElementById("toggle-description")
          ?.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default behavior
            const newExpandedState = !isExpanded; // Toggle the expanded state
            setExpandedLocations((prev) => ({
              ...prev,
              [placeInfo.title]: newExpandedState, // Update the expanded state
            }));

            // Update the popup with the new HTML
            const newInfoHtml = `
            <div style="text-align: center;">
              <h3>${placeInfo.title}</h3>
              <p>${newExpandedState ? placeInfo.extract : truncateDescription(placeInfo.extract)}</p>
              <span id="toggle-description" style="cursor: pointer;">
                ${newExpandedState ? "<FaChevronUp />" : "<FaChevronDown />"}
              </span>
              <img src="${placeInfo.thumbnail}" alt="${placeInfo.title}" style="width:100%; height:auto;"/>
              <button id="save-destination" type="button" class="btn btn-primary">Add to Your Saved Destinations</button>
            </div>
          `;

            popup.setHTML(newInfoHtml); // Update the popup with the new HTML
          });

        // Save destination event listener
        document
          .getElementById("save-destination")
          ?.addEventListener("click", async () => {
            const newLocation = {
              name: placeInfo.title,
              description: placeInfo.extract || "No description available.",
              image: placeInfo.thumbnail || "No image available.",
            };

            try {
              const saveResponse = await axios.post("/api/saved", newLocation);
              const completeLocation = {
                ...newLocation,
                id: saveResponse.data.id,
                removeLocation: () => {},
              };
              addLocation(completeLocation);
              alert("Location saved!");
            } catch (error) {
              console.error("Error saving location:", error);
              alert("Error saving location. Please try again.");
            }
          });
      } catch (error) {
        console.error("Error fetching place info:", error);
        popup.setHTML(`<p>Error fetching data. Please try again.</p>`);
      }

      map.flyTo({
        center: coordinates,
        zoom: 10,
        essential: true,
      });
    });

    let userInteracting = false;
    const spinGlobe = throttle(() => {
      const zoom = map.getZoom();
      if (!userInteracting && zoom < 4) {
        const distancePerSecond = 340 / 130;
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
    map.on("moveend", spinGlobe);

    return () => {
      map.remove();
    };
  }, [addLocation, expandedLocations]);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100
