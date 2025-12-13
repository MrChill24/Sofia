'use client'

import { useEffect, useState } from 'react'

export default function InteractiveMap({ locations, onLocationClick, center = [40.0, -3.7], zoom = 6 }) {
  const [isClient, setIsClient] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Dynamically import Leaflet only on client side
    if (typeof window !== 'undefined') {
      Promise.all([
        import('leaflet'),
        import('react-leaflet'),
        import('leaflet/dist/leaflet.css')
      ]).then(([L, reactLeaflet]) => {
        // Fix for default markers
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: '/marker-icon-2x.png',
          iconUrl: '/marker-icon.png',
          shadowUrl: '/marker-shadow.png',
        })
        setMapLoaded(true)
        window.L = L
        window.reactLeaflet = reactLeaflet
      }).catch(err => {
        console.error('Error loading Leaflet:', err)
      })
    }
  }, [])

  if (!isClient || !mapLoaded) {
    return (
      <div className="h-96 w-full rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interactive map...</p>
        </div>
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup } = window.reactLeaflet
  const L = window.L

  // Create custom icons for different location types
  const createCustomIcon = (type, color) => {
    return L.divIcon({
      html: `<div style="
        background-color: ${color};
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 12px;
      ">${type === 'nature' ? '🌲' : '🏛️'}</div>`,
      className: 'custom-marker',
      iconSize: [25, 25],
      iconAnchor: [12, 12]
    })
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={location.coordinates}
            icon={createCustomIcon(location.type, location.type === 'nature' ? '#22c55e' : '#a855f7')}
            eventHandlers={{
              click: () => onLocationClick(location)
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                <div className="flex flex-wrap gap-1 justify-center mb-2">
                  {location.highlights?.slice(0, 2).map((highlight, index) => (
                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {highlight}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => onLocationClick(location)}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}