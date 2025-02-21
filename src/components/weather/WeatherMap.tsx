
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';

interface WeatherMapProps {
  location: {
    lat: number;
    lon: number;
  };
}

export const WeatherMap = ({ location }: WeatherMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN'; // Replace with your Mapbox token
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [location.lon, location.lat],
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add marker for location
    new mapboxgl.Marker()
      .setLngLat([location.lon, location.lat])
      .addTo(map.current);

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [location]);

  return (
    <Card className="overflow-hidden">
      <div ref={mapContainer} className="w-full h-[400px]" />
    </Card>
  );
};
