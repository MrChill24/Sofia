'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Filter, Search, Star, Camera, BookOpen } from 'lucide-react'
import Link from 'next/link'
import InteractiveMap from '@/components/InteractiveMap'

export default function MapsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(null)

  const locations = [
    // Nature Places
    {
      id: 1,
      name: "Picos de Europa National Park",
      type: "nature",
      description: "Dramatic mountain ranges with deep valleys",
      coordinates: [43.2, -4.8],
      image: "/picos-europa.jpg",
      highlights: ["Hiking trails", "Mountain villages", "Wildlife", "Scenic views"],
      bestTime: "May to October",
      difficulty: "Moderate to Difficult"
    },
    {
      id: 2,
      name: "Teide National Park (Tenerife)",
      type: "nature",
      description: "Volcanic landscapes with Mount Teide",
      coordinates: [28.3, -16.6],
      image: "/teide-national-park.jpg",
      highlights: ["Stargazing", "Cable car", "Volcanic craters", "Unique landscapes"],
      bestTime: "Year round",
      difficulty: "Easy to Moderate"
    },
    {
      id: 3,
      name: "Sierra Nevada Mountains",
      type: "nature",
      description: "Snow-capped peaks near Granada",
      coordinates: [37.1, -3.4],
      image: "/sierra-nevada.jpg",
      highlights: ["Skiing", "Hiking", "Mountain biking", "Alpine scenery"],
      bestTime: "Year round",
      difficulty: "Easy to Difficult"
    },
    {
      id: 4,
      name: "Cabo de Gata-Níjar Natural Park",
      type: "nature",
      description: "UNESCO biosphere with wild beaches",
      coordinates: [36.8, -2.2],
      image: "/cabo-gata.jpg",
      highlights: ["Hidden beaches", "Snorkeling", "Desert landscapes", "Bird watching"],
      bestTime: "April to October",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Irati Forest",
      type: "nature",
      description: "Lush forest nature reserve",
      coordinates: [42.9, -1.0],
      image: "/irati-forest.jpg",
      highlights: ["Forest hiking", "Canoeing", "Wildlife", "Camping"],
      bestTime: "May to September",
      difficulty: "Easy to Moderate"
    },
    // Cities
    {
      id: 6,
      name: "Barcelona",
      type: "city",
      description: "Iconic architecture and beaches",
      coordinates: [41.4, 2.2],
      image: "/barcelona.jpg",
      highlights: ["La Sagrada Familia", "Park Güell", "Gothic Quarter", "Beaches"],
      bestTime: "April to June, September to October",
      atmosphere: "Vibrant, artistic"
    },
    {
      id: 7,
      name: "Madrid",
      type: "city",
      description: "Spain's capital with world-class museums",
      coordinates: [40.4, -3.7],
      image: "/madrid.jpg",
      highlights: ["Prado Museum", "El Retiro Park", "Royal Palace", "Plaza Mayor"],
      bestTime: "April to June, September to November",
      atmosphere: "Cultural, lively"
    },
    {
      id: 8,
      name: "Seville",
      type: "city",
      description: "Flamenco culture and historic plazas",
      coordinates: [37.4, -6.0],
      image: "/seville.jpg",
      highlights: ["Alcázar Palace", "Seville Cathedral", "Plaza de España", "Triana"],
      bestTime: "March to May, September to November",
      atmosphere: "Romantic, traditional"
    },
    {
      id: 9,
      name: "Granada",
      type: "city",
      description: "Moorish architecture and hillside views",
      coordinates: [37.2, -3.6],
      image: "/granada.jpg",
      highlights: ["Alhambra Palace", "Generalife Gardens", "Albaicín", "Sacromonte"],
      bestTime: "April to June, September to October",
      atmosphere: "Historic, enchanting"
    },
    {
      id: 10,
      name: "Ronda",
      type: "city",
      description: "Dramatic cliffside town",
      coordinates: [36.7, -5.2],
      image: "/ronda.jpg",
      highlights: ["Puente Nuevo", "Plaza de Toros", "Old Town", "Wine cellars"],
      bestTime: "April to June, September to October",
      atmosphere: "Dramatic, picturesque"
    },
    // Additional Cities
    {
      id: 11,
      name: "San Sebastián",
      type: "city",
      description: "Famous beaches and food scene",
      coordinates: [43.3, -2.0],
      highlights: ["La Concha beach", "Old Town", "Pintxos", "Monte Igueldo"],
      bestTime: "June to September",
      atmosphere: "Elegant, culinary"
    },
    {
      id: 12,
      name: "Córdoba",
      type: "city",
      description: "Historic architecture and UNESCO heritage",
      coordinates: [37.9, -4.8],
      highlights: ["Mezquita", "Jewish Quarter", "Roman Bridge", "Patios"],
      bestTime: "April to June, September to October",
      atmosphere: "Historic, charming"
    }
  ]

  const categories = [
    { id: 'all', name: 'All Locations', count: locations.length },
    { id: 'nature', name: 'Nature Places', count: locations.filter(l => l.type === 'nature').length },
    { id: 'city', name: 'Cities', count: locations.filter(l => l.type === 'city').length }
  ]

  const filteredLocations = locations.filter(location => {
    const matchesCategory = selectedCategory === 'all' || location.type === selectedCategory
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getLocationColor = (type) => {
    return type === 'nature' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      {/* Header */}
      <section className="py-12 px-4 bg-indigo-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <MapPin className="h-8 w-8" />
              <span className="text-xl font-bold">Spain, Sofia</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="hover:text-indigo-200">Home</Link>
              <Link href="/nature" className="hover:text-indigo-200">Nature</Link>
              <Link href="/cities" className="hover:text-indigo-200">Cities</Link>
              <Link href="/seville" className="hover:text-indigo-200">Seville</Link>
              <Link href="/gallery" className="hover:text-indigo-200">Gallery</Link>
              <Link href="/journal" className="hover:text-indigo-200">Journal</Link>
              <Link href="/maps" className="text-indigo-200 font-semibold">Maps</Link>
            </nav>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive Maps
          </h1>
          <p className="text-xl text-indigo-100">
            Explore all your destinations with detailed maps and location insights
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filters */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex gap-4 mb-4 md:mb-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id ? "bg-indigo-600 hover:bg-indigo-700" : ""}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Main Interactive Map */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-6 w-6 text-indigo-600" />
                Spain Adventure Map
              </CardTitle>
              <CardDescription>
                Click on map markers to view location details and plan your route
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InteractiveMap 
                locations={filteredLocations} 
                onLocationClick={setSelectedLocation}
                center={[40.0, -3.7]}
                zoom={6}
              />
              <div className="mt-4 flex justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow"></div>
                  <span className="text-sm">Nature Locations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow"></div>
                  <span className="text-sm">City Locations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Cards */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <Card key={location.id} className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" onClick={() => setSelectedLocation(location)}>
                <div className="relative h-48">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/logo.png'; // Fallback to logo if image fails
                      e.target.className = 'w-full h-full object-cover opacity-50';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{location.name}</h3>
                    <p className="text-sm opacity-90">{location.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className={getLocationColor(location.type)}>
                      {location.type === 'nature' ? 'Nature' : 'City'}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {location.highlights.slice(0, 3).map((highlight, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                      {location.highlights.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{location.highlights.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                    <span>Best: {location.bestTime}</span>
                    {location.difficulty && (
                      <span>Difficulty: {location.difficulty}</span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedLocation(location)
                      }}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Link href={`/journal?location=${encodeURIComponent(location.name)}`}>
                      <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                        <BookOpen className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/gallery`}>
                      <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                        <Camera className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Location Detail Modal */}
          {selectedLocation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedLocation(null)}>
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="relative h-64">
                  <img
                    src={selectedLocation.image}
                    alt={selectedLocation.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/logo.png'; // Fallback to logo if image fails
                      e.target.className = 'w-full h-full object-cover opacity-50';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-3xl font-bold mb-2">{selectedLocation.name}</h2>
                    <p className="text-lg opacity-90">{selectedLocation.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center text-xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-3">Highlights</h3>
                      <div className="space-y-2">
                        {selectedLocation.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-800 mb-3">Travel Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Best Time to Visit:</span>
                          <span>{selectedLocation.bestTime}</span>
                        </div>
                        {selectedLocation.difficulty && (
                          <div className="flex justify-between">
                            <span className="font-medium">Difficulty:</span>
                            <span>{selectedLocation.difficulty}</span>
                          </div>
                        )}
                        {selectedLocation.atmosphere && (
                          <div className="flex justify-between">
                            <span className="font-medium">Atmosphere:</span>
                            <span>{selectedLocation.atmosphere}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="font-medium">Coordinates:</span>
                          <span className="text-sm">{selectedLocation.coordinates[0]}, {selectedLocation.coordinates[1]}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Detailed Interactive Map for Selected Location */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-indigo-800 mb-3">Detailed Location Map</h3>
                    <InteractiveMap 
                      locations={[selectedLocation]} 
                      onLocationClick={setSelectedLocation}
                      center={selectedLocation.coordinates}
                      zoom={12}
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Link href={`/journal?location=${encodeURIComponent(selectedLocation.name)}`}>
                      <Button size="lg" className="flex-1">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Journal Entry
                      </Button>
                    </Link>
                    <Link href={`/gallery`}>
                      <Button size="lg" variant="outline" className="flex-1">
                        <Camera className="h-5 w-5 mr-2" />
                        Add Photos
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-indigo-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Spain Adventure</h2>
          <p className="text-xl mb-8">Use these maps to plan your route and document your journey</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/journal">
              <Button size="lg" variant="secondary">
                Start Journaling
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-indigo-800">
                Upload Photos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}