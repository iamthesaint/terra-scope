import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import mapboxgl from "mapbox-gl";
import throttle from 'lodash/throttle'; // You can use lodash throttle or write a custom one

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/iamthesaint/cm1b4ht2q00mu01qk2npuh13w", // custom style url from mapbox studio
      projection: "globe", // display the map as a globe
      zoom: 1.5,
      center: [-90, 40], // center the map on a location
    });

    // Handle map style animations
    map.on("style.load", () => {
      map.setFog({}); // set default atmosphere style
    });

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
    }, 100); // Throttling for better performance (every 100ms)

    // Map event listeners for globe interaction
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

    // Start the initial spin
    spinGlobe();

    return () => {
      map.remove();
    };
  }, []);

  // Set a test cookie
  document.cookie = "myCookie=value; SameSite=None; Secure";

  return <div className="map-container" ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
}
