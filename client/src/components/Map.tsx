import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtdGhlc2FpbnQiLCJhIjoiY20xNXdza3hmMGUwczJrcHh6d29pb2t2aiJ9.G1-bTW5zput1V7yJj9gbxw';

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [mapData] = useState<[]>([]);


  useEffect(() => {
    if (!mapContainerRef.current) return; 

    // initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
      projection: 'globe', // display the map as a globe
      zoom: 1.5,
      center: [-90, 40], // center the map on a location
    });

    // handle map style animations
    map.on('style.load', () => {
      map.setFog({}); // set default atmosphere style
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

    map.on('mousedown', () => {
      userInteracting = true;
    });

    map.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.on('dragend', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.on('pitchend', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.on('rotateend', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.on('moveend', () => {
      spinGlobe();
    });

    spinGlobe();

    return () => {
      map.remove();
    };
  }, [mapData]);

  return (
    <div>
      {/*  div to contain the map */}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '100vh', position: 'relative' }}
      />
    </div>
  );
}




