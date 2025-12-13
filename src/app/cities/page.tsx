'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Camera, Star, Navigation, Building, Utensils, Music } from 'lucide-react'
import Link from 'next/link'
import InteractiveMap from '@/components/InteractiveMap'
import SimpleMap from '@/components/SimpleMap'

export default function CitiesPage() {
  const [selectedCity, setSelectedCity] = useState(null)

  const cities = [
    {
      id: 1,
      name: "Barcelona",
      description: "Iconic architecture like La Sagrada Familia and Park Güell.",
      details: "Beaches + city culture + world-class food.",
      source: "Bon Traveler",
      prompt: "What was the first taste of Barcelona you remember?",
      image: "/barcelona.jpg",
      coordinates: [41.4, 2.2],
      highlights: ["La Sagrada Familia", "Park Güell", "Gothic Quarter", "Beaches"],
      cuisine: ["Tapas", "Paella", "Cava", "Seafood"],
      culture: ["Architecture", "Art", "Beach culture", "Nightlife"],
      bestTime: "April to June, September to October"
    },
    {
      id: 2,
      name: "Madrid",
      description: "Spain's capital with world-class museums (Prado, Reina Sofía).",
      details: "Lively plazas and parks like El Retiro.",
      source: "Bon Traveler",
      prompt: "What moment in Madrid made you fall for it?",
      image: "/madrid.jpg",
      coordinates: [40.4, -3.7],
      highlights: ["Prado Museum", "Reina Sofía", "El Retiro Park", "Royal Palace"],
      cuisine: ["Tapas", "Churros", "Jamón", "Wine"],
      culture: ["Art museums", "Flamenco", "Shopping", "Nightlife"],
      bestTime: "April to June, September to November"
    },
    {
      id: 3,
      name: "Seville",
      description: "Rich in history, flamenco culture, and beautiful plazas.",
      details: "Flamenco culture and beautiful plazas.",
      source: "Bon Traveler",
      prompt: "Did a flamenco show or sunset change how you see Spain?",
      image: "/seville.jpg",
      coordinates: [37.4, -6.0],
      highlights: ["Alcázar Palace", "Seville Cathedral", "Plaza de España", "Triana"],
      cuisine: ["Tapas", "Flamenco dinner", "Orange wine", "Churros"],
      culture: ["Flamenco", "History", "Religious festivals", "Bullfighting"],
      bestTime: "March to May, September to November"
    },
    {
      id: 4,
      name: "Granada & Alhambra",
      description: "Moorish architecture and hillside views.",
      details: "Moorish architecture and hillside views.",
      source: "Bon Traveler",
      prompt: "What detail from the Alhambra stayed with you?",
      image: "/granada.jpg",
      coordinates: [37.2, -3.6],
      highlights: ["Alhambra Palace", "Generalife Gardens", "Albaicín", "Sacromonte"],
      cuisine: ["Tapas", "Arab influences", "Tea houses", "Free tapas with drinks"],
      culture: ["Moorish history", "Flamenco caves", "University life", "Arab baths"],
      bestTime: "April to June, September to October"
    },
    {
      id: 5,
      name: "Ronda",
      description: "Dramatic cliffside town with stunning views.",
      details: "Dramatic cliffside town with stunning views.",
      source: "Cellar Tours",
      prompt: "What view took your breath away here?",
      image: "/ronda.jpg",
      coordinates: [36.7, -5.2],
      highlights: ["Puente Nuevo", "Plaza de Toros", "Old Town", "Wine cellars"],
      cuisine: ["Traditional Spanish", "Local wines", "Mountain dishes", "Tapas"],
      culture: ["Bullfighting history", "Wine culture", "Dramatic landscapes", "White towns"],
      bestTime: "April to June, September to October"
    }
  ]

  const otherCities = [
    { name: "San Sebastián", description: "Famous beaches and food.", source: "Bon Traveler", coordinates: [43.3, -2.0] },
    { name: "Ibiza & Majorca", description: "Mediterranean islands with beaches and culture.", source: "Winalist", coordinates: [38.9, 1.4] },
    { name: "Ons Island (Galicia)", description: "Quiet nature reserve with limited visitor access.", source: "The Sun", coordinates: [42.4, -9.0] },
    { name: "Cordoba", description: "Historic architecture and UNESCO heritage.", source: "Architectural Digest", coordinates: [37.9, -4.8] }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <section className="py-12 px-4 bg-purple-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Star className="h-8 w-8" />
              <span className="text-xl font-bold">Spain, Sofia</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="hover:text-purple-200">Home</Link>
              <Link href="/nature" className="hover:text-purple-200">Nature</Link>
              <Link href="/cities" className="text-purple-200 font-semibold">Cities</Link>
              <Link href="/seville" className="hover:text-purple-200">Seville</Link>
              <Link href="/gallery" className="hover:text-purple-200">Gallery</Link>
              <Link href="/journal" className="hover:text-purple-200">Journal</Link>
            </nav>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Most Memorable Places in Spain
          </h1>
          <p className="text-xl text-purple-100">
            Explore Spain's vibrant cities, rich culture, and historic treasures
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Quick Filters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Find Your Perfect City Experience</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">All</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">Architecture</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">Museums</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">Beaches</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">Food</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">Nightlife</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-purple-100">History</Badge>
            </div>
          </div>

          {/* Cities Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {cities.map((city) => (
              <Card key={city.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/logo.png'; // Fallback to logo if image fails
                      e.target.className = 'w-full h-full object-cover opacity-50';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                    <p className="text-sm opacity-90">{city.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-purple-800">
                      {city.bestTime.split(' ')[0]}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        Highlights
                      </h4>
                      <div className="space-y-1">
                        {city.highlights.slice(0, 3).map((highlight, index) => (
                          <div key={index} className="text-sm text-gray-600">• {highlight}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-1">
                        <Utensils className="h-4 w-4" />
                        Cuisine
                      </h4>
                      <div className="space-y-1">
                        {city.cuisine.slice(0, 3).map((item, index) => (
                          <div key={index} className="text-sm text-gray-600">• {item}</div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-1">
                        <Music className="h-4 w-4" />
                        Culture
                      </h4>
                      <div className="space-y-1">
                        {city.culture.slice(0, 3).map((item, index) => (
                          <div key={index} className="text-sm text-gray-600">• {item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{city.details}</p>
                  
                  <div className="bg-purple-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium text-purple-800 mb-1">Suggested journal prompt:</p>
                    <p className="text-sm text-purple-700">{city.prompt}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setSelectedCity(city)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                    <Link href={`/journal?location=${encodeURIComponent(city.name)}`}>
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

          {/* Other Cities Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-purple-900 mb-6">
              Other Memorable City and Village Ideas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherCities.map((city, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedCity(city)}>
                  <CardContent className="pt-4">
                    <h3 className="font-semibold text-purple-800 mb-2">{city.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{city.description}</p>
                    <p className="text-xs text-gray-500">Source: {city.source}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map Section */}
          {selectedCity && (
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-6 w-6 text-purple-600" />
                  Interactive Map: {selectedCity.name}
                </CardTitle>
                <CardDescription>
                  Explore the city and plan your visit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleMap 
                  location={selectedCity}
                  center={selectedCity.coordinates}
                  zoom={12}
                />
                <div className="mt-4 grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Getting There</h4>
                    <p className="text-sm text-gray-600">Transportation options and directions</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Best Time to Visit</h4>
                    <p className="text-sm text-gray-600">{selectedCity.bestTime || "Year round"}</p>
                  </div>
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <h4 className="font-semibold text-pink-800">Local Tips</h4>
                    <p className="text-sm text-gray-600">Insider recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Spain's Vibrant Cities?</h2>
          <p className="text-xl mb-8">Start planning your city adventures and journaling your experiences</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/journal">
              <Button size="lg" variant="secondary">
                Start Journaling
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-800">
                Upload Photos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}