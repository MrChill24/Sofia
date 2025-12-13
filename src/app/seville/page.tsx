'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Camera, Heart, Navigation, Music, Utensils, Calendar, Star, Clock, Users, BookOpen } from 'lucide-react'
import Link from 'next/link'
import InteractiveMap from '@/components/InteractiveMap'
import SimpleMap from '@/components/SimpleMap'

export default function SevillePage() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [showFoodMap, setShowFoodMap] = useState(false)

  const sevilleHighlights = [
    {
      id: 1,
      name: "Alcázar of Seville",
      description: "Royal palace with stunning Moorish architecture and gardens.",
      image: "/seville.jpg",
      coordinates: [37.383, -5.990],
      category: "Historic",
      timeNeeded: "3-4 hours",
      bestTime: "Morning",
      tips: "Book tickets in advance, visit the gardens"
    },
    {
      id: 2,
      name: "Seville Cathedral",
      description: "Largest Gothic cathedral in the world with Giralda tower.",
      image: "/seville.jpg",
      coordinates: [37.384, -5.990],
      category: "Religious",
      timeNeeded: "2-3 hours",
      bestTime: "Afternoon",
      tips: "Climb the Giralda for city views"
    },
    {
      id: 3,
      name: "Plaza de España",
      description: "Magnificent square with tiled benches representing Spanish provinces.",
      image: "/seville-plaza.jpg",
      coordinates: [37.377, -5.987],
      category: "Architecture",
      timeNeeded: "1-2 hours",
      bestTime: "Sunset",
      tips: "Perfect for photos, rent a rowboat"
    },
    {
      id: 4,
      name: "Triana Neighborhood",
      description: "Traditional flamenco district with ceramic workshops and local culture.",
      image: "/seville-flamenco.jpg",
      coordinates: [37.381, -6.004],
      category: "Culture",
      timeNeeded: "Half day",
      bestTime: "Evening",
      tips: "Visit ceramic workshops, watch flamenco"
    }
  ]

  const flamencoShows = [
    {
      name: "Tablao Flamenco El Arenal",
      description: "Traditional flamenco in historic setting",
      price: "€35-45",
      schedule: "Daily shows at 7PM & 9PM",
      atmosphere: "Authentic, intimate"
    },
    {
      name: "La Carbonería",
      description: "Bohemian flamenco bar, free shows",
      price: "Free (drink minimum)",
      schedule: "11PM onwards",
      atmosphere: "Casual, lively"
    },
    {
      name: "Museo del Baile Flamenco",
      description: "Flamenco museum with performances",
      price: "€25-35",
      schedule: "Daily at 7PM",
      atmosphere: "Cultural, educational"
    }
  ]

  const localDishes = [
    {
      name: "Tapas Tour",
      description: "Traditional small plates experience",
      mustTry: ["Jamón ibérico", "Salmorejo", "Espinacas con garbanzos", "Solomillo al whisky"],
      areas: ["El Arenal", "Santa Cruz", "Triana"],
      price: "€2-5 per tapa"
    },
    {
      name: "Traditional Restaurants",
      description: "Sit-down dining experience",
      mustTry: ["Cocido andaluz", "Pescaíto frito", "Flamenco eggs", "Rabo de toro"],
      areas: ["Santa Cruz", "El Centro"],
      price: "€15-25 per person"
    }
  ]

  const dayTrips = [
    {
      name: "Córdoba",
      distance: "45 min by train",
      highlights: ["Mezquita", "Jewish Quarter", "Roman Bridge"],
      duration: "Day trip",
      bestFor: "History lovers"
    },
    {
      name: "Cádiz",
      distance: "1.5 hours by train",
      highlights: ["Beaches", "Old Town", "Watchtowers"],
      duration: "Day trip",
      bestFor: "Beach and history"
    },
    {
      name: "Doñana National Park",
      distance: "1 hour by car",
      highlights: ["Bird watching", "Wildlife", "Nature trails"],
      duration: "Full day",
      bestFor: "Nature enthusiasts"
    },
    {
      name: "Jerez de la Frontera",
      distance: "1 hour by train",
      highlights: ["Sherry wineries", "Andalusian horses", "Flamenco"],
      duration: "Day trip",
      bestFor: "Wine and culture"
    }
  ]

  const foodLocations = [
    {
      id: 1,
      name: "El Rinconcillo",
      type: "Traditional Tapas",
      coordinates: [37.388, -5.994],
      description: "Oldest tapas bar in Seville",
      area: "El Arenal"
    },
    {
      id: 2,
      name: "Casa Morales",
      type: "Traditional Tapas",
      coordinates: [37.392, -5.993],
      description: "Historic tavern with vermouth and tapas",
      area: "El Centro"
    },
    {
      id: 3,
      name: "La Brunilda",
      type: "Modern Tapas",
      coordinates: [37.385, -5.989],
      description: "Creative tapas in a cozy setting",
      area: "Alameda"
    },
    {
      id: 4,
      name: "Casa Hernando",
      type: "Traditional",
      coordinates: [37.390, -5.996],
      description: "Famous for salmorejo and traditional dishes",
      area: "El Centro"
    },
    {
      id: 5,
      name: "Bar Alfalfa",
      type: "Tapas Bar",
      coordinates: [37.386, -5.988],
      description: "Lively tapas bar in the Alfalfa district",
      area: "Alameda"
    },
    {
      id: 6,
      name: "Casa Cuesta",
      type: "Traditional",
      coordinates: [37.393, -5.997],
      description: "Classic Sevillian cuisine since 1880",
      area: "El Arenal"
    }
  ]

  const seasonalEvents = [
    {
      name: "Feria de Abril",
      dates: "April",
      description: "Week-long spring fair with flamenco, horses, and partying",
      atmosphere: "Festive, traditional"
    },
    {
      name: "Semana Santa",
      dates: "March/April",
      description: "Holy Week processions with elaborate floats",
      atmosphere: "Solemn, spectacular"
    },
    {
      name: "Bienal de Flamenco",
      dates: "September (even years)",
      description: "World's most important flamenco festival",
      atmosphere: "Cultural, intense"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-r from-red-700 to-orange-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Heart className="h-8 w-8" />
              <span className="text-xl font-bold">Spain, Sofia</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="hover:text-orange-200">Home</Link>
              <Link href="/nature" className="hover:text-orange-200">Nature</Link>
              <Link href="/cities" className="hover:text-orange-200">Cities</Link>
              <Link href="/seville" className="text-orange-200 font-semibold">Seville</Link>
              <Link href="/gallery" className="hover:text-orange-200">Gallery</Link>
              <Link href="/journal" className="hover:text-orange-200">Journal</Link>
            </nav>
          </div>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Welcome to Seville, Sofia
            </h1>
            <p className="text-xl mb-6">
              Your home base for exploring Andalusia's rich culture and traditions
            </p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">🏠 Home Base</Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">💃 Flamenco</Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">🍽️ Tapas</Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">🏛️ History</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Quick Navigation */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-6 text-center">
              Discover Your Seville
            </h2>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => document.getElementById('highlights')?.scrollIntoView()}>
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Highlights</h3>
                  <p className="text-sm text-gray-600">Must-see sights</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => document.getElementById('flamenco')?.scrollIntoView()}>
                <CardContent className="pt-6">
                  <Music className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Flamenco</h3>
                  <p className="text-sm text-gray-600">Authentic shows</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => document.getElementById('food')?.scrollIntoView()}>
                <CardContent className="pt-6">
                  <Utensils className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Food</h3>
                  <p className="text-sm text-gray-600">Local cuisine</p>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer" onClick={() => document.getElementById('daytrips')?.scrollIntoView()}>
                <CardContent className="pt-6">
                  <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Day Trips</h3>
                  <p className="text-sm text-gray-600">Nearby adventures</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Must-See Highlights */}
          <section id="highlights" className="mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-6">Must-See Highlights</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {sevilleHighlights.map((highlight) => (
                <Card key={highlight.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-48">
                    <img
                      src={highlight.image}
                      alt={highlight.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/logo.png'; // Fallback to logo if image fails
                        e.target.className = 'w-full h-full object-cover opacity-50';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{highlight.name}</h3>
                      <p className="text-sm opacity-90">{highlight.description}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/90 text-red-800">
                        {highlight.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <Clock className="h-4 w-4 text-red-600 mx-auto mb-1" />
                        <p className="text-xs font-medium">{highlight.timeNeeded}</p>
                        <p className="text-xs text-gray-500">Time needed</p>
                      </div>
                      <div className="text-center">
                        <Calendar className="h-4 w-4 text-orange-600 mx-auto mb-1" />
                        <p className="text-xs font-medium">{highlight.bestTime}</p>
                        <p className="text-xs text-gray-500">Best time</p>
                      </div>
                      <div className="text-center">
                        <Users className="h-4 w-4 text-green-600 mx-auto mb-1" />
                        <p className="text-xs font-medium">Popular</p>
                        <p className="text-xs text-gray-500">Tourist spot</p>
                      </div>
                    </div>
                    
                    <div className="bg-orange-50 p-3 rounded-lg mb-4">
                      <p className="text-sm font-medium text-orange-800">Local Tips:</p>
                      <p className="text-sm text-orange-700">{highlight.tips}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setSelectedLocation(highlight)}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        View on Map
                      </Button>
                      <Link href={`/journal?location=${encodeURIComponent(highlight.name)}`}>
                        <Button variant="outline">
                          <Camera className="h-4 w-4 mr-2" />
                          Journal
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Flamenco Section */}
          <section id="flamenco" className="mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-6 flex items-center gap-2">
              <Music className="h-8 w-8 text-orange-600" />
              Experience Authentic Flamenco
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {flamencoShows.map((show, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-orange-800">{show.name}</CardTitle>
                    <CardDescription>{show.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Price:</span>
                        <span className="text-sm text-green-600">{show.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Schedule:</span>
                        <span className="text-sm">{show.schedule}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Atmosphere:</span>
                        <span className="text-sm">{show.atmosphere}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700">
                      Book Show
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-900 mb-3">Flamenco Tips for Sofia</h3>
              <ul className="space-y-2 text-orange-800">
                <li>• Book shows in advance, especially during festival seasons</li>
                <li>• Dress smartly - flamenco venues are quite elegant</li>
                <li>• Arrive early for the best seats and atmosphere</li>
                <li>• Some venues offer dinner packages - great for a full evening</li>
                <li>• Triana neighborhood has the most authentic flamenco schools</li>
              </ul>
            </div>
          </section>

          {/* Food Section */}
          <section id="food" className="mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-6 flex items-center gap-2">
              <Utensils className="h-8 w-8 text-yellow-600" />
              Seville's Food Scene
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {localDishes.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-yellow-800">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="font-semibold text-yellow-700 mb-2">Must Try:</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.mustTry.map((dish, dishIndex) => (
                          <Badge key={dishIndex} variant="outline" className="text-xs">
                            {dish}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-yellow-700 mb-1">Best Areas:</h4>
                        <p className="text-sm text-gray-600">{category.areas.join(", ")}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-yellow-700 mb-1">Price Range:</h4>
                        <p className="text-sm text-gray-600">{category.price}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => setShowFoodMap(true)}
                    >
                      Explore Food Map
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Day Trips Section */}
          <section id="daytrips" className="mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-6 flex items-center gap-2">
              <Calendar className="h-8 w-8 text-green-600" />
              Day Trips from Seville
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dayTrips.map((trip, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedLocation(trip)}>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-green-800 mb-2">{trip.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{trip.distance}</p>
                    <div className="mb-3">
                      <h4 className="text-xs font-medium text-green-700 mb-1">Highlights:</h4>
                      <div className="space-y-1">
                        {trip.highlights.slice(0, 2).map((highlight, highlightIndex) => (
                          <div key={highlightIndex} className="text-xs text-gray-600">• {highlight}</div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="font-medium">Duration: {trip.duration}</span>
                      <span className="text-green-600">{trip.bestFor}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Seasonal Events */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-6">Seasonal Events & Festivals</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {seasonalEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-red-800">{event.name}</CardTitle>
                    <CardDescription>{event.dates}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 mb-3">{event.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {event.atmosphere}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Map Section */}
        {/* Food Map Modal */}
          {showFoodMap && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowFoodMap(false)}>
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-yellow-800">Seville Food Map</h2>
                    <button
                      onClick={() => setShowFoodMap(false)}
                      className="bg-gray-200 hover:bg-gray-300 rounded-full p-2 w-10 h-10 flex items-center justify-center text-xl"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Tapas & Dining Locations</h3>
                    <InteractiveMap 
                      locations={foodLocations} 
                      onLocationClick={(location) => console.log('Selected food location:', location)}
                      center={[37.388, -5.990]}
                      zoom={14}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {foodLocations.map((place) => (
                      <Card key={place.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="pt-4">
                          <h4 className="font-semibold text-yellow-800 mb-1">{place.name}</h4>
                          <p className="text-sm text-gray-600 mb-1">{place.type}</p>
                          <p className="text-sm text-gray-600 mb-2">{place.description}</p>
                          <Badge variant="outline" className="text-xs">
                            {place.area}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Location Detail Modal */}
          {selectedLocation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedLocation(null)}>
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="relative h-64">
                  {selectedLocation.image ? (
                    <img
                      src={selectedLocation.image}
                      alt={selectedLocation.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/logo.png'; // Fallback to logo if image fails
                        e.target.className = 'w-full h-full object-cover opacity-50';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center">
                      <MapPin className="h-16 w-16 text-red-400" />
                    </div>
                  )}
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
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Highlights</h3>
                      <div className="space-y-2">
                        {selectedLocation.highlights?.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm">{highlight}</span>
                          </div>
                        )) || (
                          <p className="text-sm text-gray-500">No highlights available for this location.</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-3">Travel Information</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Best Time to Visit:</span>
                          <span>{selectedLocation.bestTime || 'Year round'}</span>
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
                    <h3 className="text-lg font-semibold text-red-800 mb-3">Detailed Location Map</h3>
                    <SimpleMap 
                      location={selectedLocation}
                      center={selectedLocation.coordinates}
                      zoom={15}
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
      <section className="py-12 px-4 bg-gradient-to-r from-red-700 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Seville?</h2>
          <p className="text-xl mb-8">Start documenting your Seville adventures and local discoveries</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/journal">
              <Button size="lg" variant="secondary">
                Start Journaling
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-700">
                Upload Photos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}