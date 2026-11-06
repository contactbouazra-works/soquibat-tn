import L from 'leaflet';
import { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import companyMapIcon from '../assets/img/soquibat-map-icon.png';
import { comptoirs } from '../data/soquibat';

const markerIcon = L.divIcon({
  className: 'comptoir-marker-shell',
  html: `
    <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 58" width="48" height="58">
      <path d="M24 1.5A22.5 22.5 0 0 0 1.5 24C1.5 39.1 24 56.5 24 56.5S46.5 39.1 46.5 24A22.5 22.5 0 0 0 24 1.5Z" fill="#F5F4F1" stroke="#17181B" stroke-width="2"/>
      <image href="${companyMapIcon}" x="11" y="11" width="26" height="26" preserveAspectRatio="xMidYMid meet"/>
    </svg>
  `,
  iconSize: [32, 39],
  iconAnchor: [16, 38],
  popupAnchor: [0, -36],
});

function MapViewport({ selectedId }: { selectedId: string | null }) {
  const map = useMap();

  useEffect(() => {
    const selectedLocation = comptoirs.find(({ id }) => id === selectedId);
    if (selectedLocation) {
      map.flyTo([selectedLocation.latitude, selectedLocation.longitude], 13, { duration: 0.6 });
      return;
    }

    const bounds = L.latLngBounds(
      comptoirs.map(({ latitude, longitude }) => [latitude, longitude] as [number, number]),
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 8 });
  }, [map, selectedId]);

  return null;
}

export default function ComptoirsMap({
  selectedId,
  onSelect,
}: {
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative">
      <MapContainer
        center={[34.2, 9.5]}
        zoom={6}
        scrollWheelZoom={false}
        className="h-[420px] w-full sm:h-[540px]"
        aria-label="Carte interactive des comptoirs SOQUIBAT en Tunisie"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport selectedId={selectedId} />
        {comptoirs.map((location) => (
          <Marker
            key={location.id}
            position={[location.latitude, location.longitude]}
            icon={markerIcon}
            eventHandlers={{ click: () => onSelect(location.id) }}
          >
            <Popup>
              <div className="min-w-44">
                <p className="font-display text-sm font-semibold uppercase">{location.name}</p>
                <p className="mt-1 text-xs leading-relaxed">{location.address}</p>
                <a
                  className="mt-2 inline-block text-xs font-semibold text-[#c96532]"
                  href={`tel:${location.phone.startsWith('+') ? location.phone.replace(/[^\d+]/g, '') : `+216${location.phone.replace(/\D/g, '')}`}`}
                >
                  {location.phone}
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <p className="pointer-events-none absolute right-4 top-4 z-[400] rounded-lg border border-black/10 bg-white/95 px-3 py-2 text-xs font-medium text-slate-800 shadow-md">
        {comptoirs.length} emplacements SOQUIBAT
      </p>
    </div>
  );
}
