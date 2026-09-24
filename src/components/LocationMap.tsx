import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface LocationMapProps {
  lat: number;
  lng: number;
  label?: string;
  accuracyRadiusMeters?: number;
}

export const LocationMap: React.FC<LocationMapProps> = ({
  lat,
  lng,
  label = 'Detected Service Location',
  accuracyRadiusMeters = 800,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lng],
        zoom: 15,
        zoomControl: false,
        attributionControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap standard tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Custom SVG Pin Marker in Amit Wellness Forest Green theme
      const customPinIcon = L.divIcon({
        className: 'custom-wellness-pin',
        html: `
          <div style="
            width: 36px;
            height: 36px;
            background: #087A5A;
            border: 3px solid #FFFFFF;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(8, 122, 90, 0.4);
          ">
            <div style="
              width: 12px;
              height: 12px;
              background: #FFFFFF;
              border-radius: 50%;
              transform: rotate(45deg);
            "></div>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      const marker = L.marker([lat, lng], { icon: customPinIcon }).addTo(map);
      marker.bindPopup(`<strong>${label}</strong><br/>Verification Zone: ~${accuracyRadiusMeters}m`).openPopup();

      // Radius circle showing verification area
      const circle = L.circle([lat, lng], {
        radius: accuracyRadiusMeters,
        color: '#087A5A',
        fillColor: '#087A5A',
        fillOpacity: 0.12,
        weight: 1.5,
        dashArray: '4, 6',
      }).addTo(map);

      mapInstanceRef.current = map;
      markerRef.current = marker;
      circleRef.current = circle;
    } else {
      mapInstanceRef.current.setView([lat, lng], 15);
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      }
      if (circleRef.current) {
        circleRef.current.setLatLng([lat, lng]);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, label, accuracyRadiusMeters]);

  return (
    <div className="w-full relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs">
      <div ref={mapContainerRef} className="w-full h-48 sm:h-56 z-0" />
      <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#07563F] border border-[#E5E7EB] shadow-xs">
        📍 Verification Zone (~{accuracyRadiusMeters}m threshold)
      </div>
    </div>
  );
};
