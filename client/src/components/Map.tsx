import { useEffect, useRef, useState, useMemo } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  // const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapData] = useState<[]>([]);

  // coordinates for important locations
  const importantLocations: {
    coordinates: [number, number];
    description: string;
  }[] = useMemo(
    () => [
      {
        coordinates: [31.1342, 29.9792], // lon, lat
        description: "Great Pyramids of Giza",
      },
      {
        coordinates: [2.2945, 48.8584],
        description: "Eiffel Tower",
      },
      {
        coordinates: [-74.0445, 40.6892], // Longitude first, then latitude
        description: "Statue of Liberty",
      },
      {
        coordinates: [151.2153, -33.8568], // Longitude first, then latitude
        description: "Sydney Opera House",
      },
      {
        coordinates: [-0.1246, 51.5007], // Longitude first, then latitude
        description: "Big Ben",
      },
      {
        coordinates: [12.4922, 41.8902], // Longitude first, then latitude
        description: "Colosseum",
      },
      {
        coordinates: [-43.2105, -22.9519], // Longitude first, then latitude
        description: "Christ the Redeemer",
      },
      {
        coordinates: [78.0421, 27.1751], // Longitude first, then latitude
        description: "Taj Mahal",
      },
      {
        coordinates: [-72.545, -13.1631], // Longitude first, then latitude
        description: "Machu Picchu",
      },
      {
        coordinates: [55.2744, 25.1972], // Longitude first, then latitude
        description: "Burj Khalifa",
      },
      {
        coordinates: [-122.4783, 37.8199], // Longitude first, then latitude
        description: "Golden Gate Bridge",
      },
    ],
    []
  );

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // initiali    // ini
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      projection: "globe", // display the map as a globe
      zoom: 1.5,
      center: [-90, 40], // center the map on a location
    });

    // handle map style animations
    map.on("style.load", () => {
      map.setFog({}); // set default atmosphere style
    });

    // add markers for important locations
    importantLocations.forEach((place) => {
      new mapboxgl.Marker()
        .setLngLat(place.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(place.description)
        ) // add popup to the marker
        .addTo(map);
    });

    // spin globe logic
    let userInteracting = false;
    const spinEnabled = true;
    const secondsPerRevolution = 120;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;

    function spinGlobe() {
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
    }

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

    return () => {
      map.remove();
    };
  }, [mapData, importantLocations]);

  return (
    <div>
      <div ref={mapContainerRef} className="map-container" />
    </div>
  );
}
