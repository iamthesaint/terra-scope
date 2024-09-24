import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import throttle from "lodash/throttle";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef } from "react";
import "../styles/Map.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { fetchTripAdvisorData } from "../api/tripadvAPI";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  console.log(import.meta.env.VITE_MAPBOX_ACCESS_TOKEN);
  
  (mapboxgl as typeof mapboxgl & { accessToken: string }).accessToken =
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapContainerRef.current) return;
    console.log(mapContainerRef);
    
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v9",
      projection: "globe",
      zoom: 1.5,
      center: [-90, 40],
    });

    // add the geocoder to the map
    const geocoder = new MapboxGeocoder({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
      marker: true,
      mapboxgl: mapboxgl,
      zoom: 10,
      placeholder: "Search for any location on Earth!",
    });

    // add the navigation control to the map
    map.addControl(new mapboxgl.NavigationControl(), "top-left");

    // add control to the map to search for locations
    map.addControl(geocoder, "top-left");

    // disable map rotation
    map.dragRotate.disable();

    // disable map rotation when using the geocoder
    geocoder.on("results", () => {
      spinEnabled = false;
    });

    // enable map rotation when the geocoder is finished
    geocoder.on("clear", () => {
      spinEnabled = true;
    });

    // listen for the result event from search
    geocoder.on("result", async (e) => {
      const { result } = e;
      const coordinates = result.geometry.coordinates;
      const placeName = result.text;

      // create a new popup and set its coordinates and text
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(`<p>Loading...</p>`)
        .addTo(map);

      // fetch data from tripadvisor api
      try {
        const tripAdvisorData = await fetchTripAdvisorData(placeName);
        if (tripAdvisorData) {
          const infoHtml = `
          <div>
          <h3>${tripAdvisorData.name}</h3>
          <p>${tripAdvisorData.description}</p>
          <img src="${tripAdvisorData.image}" alt="${tripAdvisorData.name}" style="width:100%; height:auto;"/>
          <a href="${tripAdvisorData.web_url}" target="_blank">Learn more</a>
        </div>
      `;
          popup.setHTML(infoHtml);
        }
      } catch {
        popup.setHTML("<p>Failed to load destination info</p>");
      }

      // move map to the marker when it's added
      map.flyTo({
        center: coordinates,
        zoom: 10,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion!
      });
    });

    let userInteracting = false;
    let spinEnabled = true;
    const secondsPerRevolution = 130;
    const maxSpinZoom = 4;
    const slowSpinZoom = 2;

    const spinGlobe = throttle(() => {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 340 / secondsPerRevolution;
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

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      className="map-container"
      ref={mapContainerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
