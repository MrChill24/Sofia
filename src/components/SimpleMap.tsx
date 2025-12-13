'use client'

export default function SimpleMap({ location, center, zoom = 15 }) {
  const [lat, lng] = center || [40.0, -3.7]
  
  const generateMapUrl = () => {
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.1},${lat-0.1},${lng+0.1},${lat+0.1}&layer=mapnik&marker=${lat},${lng}`
  }

  return (
    <div className="h-96 w-full rounded-lg overflow-hidden">
      <iframe
        src={generateMapUrl()}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title={`Map of ${location?.name || 'location'}`}
      />
      <div className="mt-2 text-center">
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 hover:underline"
        >
          View larger map
        </a>
      </div>
    </div>
  )
}