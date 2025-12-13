'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Camera, Mountain, Star, Navigation } from 'lucide-react'
import Link from 'next/link'
import InteractiveMap from '@/components/InteractiveMap'
import SimpleMap from '@/components/SimpleMap'

export default function NaturePage() {
  const [selectedPlace, setSelectedPlace] = useState(null)

  const naturePlaces = [
    {
      id: 1,
      name: "Picos de Europa National Park",
      description: "One of Spain's oldest and most dramatic mountain ranges.",
      details: "Known for dramatic peaks, deep valleys, and traditional mountain villages.",
      source: "Airalo",
      prompt: "What did the hike and views here feel like?",
      image: "/picos-europa.jpg",
      coordinates: [43.2, -4.8],
      activities: ["Hiking", "Mountain climbing", "Wildlife watching", "Photography"],
      bestTime: "May to October",
      difficulty: "Moderate to Difficult"
    },
    {
      id: 2,
      name: "Teide National Park (Tenerife)",
      description: "Volcanic landscapes and home to Mount Teide, the tallest peak in Spain.",
      details: "Otherworldly crater views and night skies ideal for stargazing.",
      source: "Lifestyle Crossroads",
      prompt: "Did this place feel peaceful or powerful?",
      image: "/teide-national-park.jpg",
      coordinates: [28.3, -16.6],
      activities: ["Stargazing", "Cable car ride", "Hiking", "Photography"],
      bestTime: "Year round",
      difficulty: "Easy to Moderate"
    },
    {
      id: 3,
      name: "Sierra Nevada Mountains",
      description: "Snow-capped peaks near Granada — tallest mountains in mainland Spain.",
      details: "Great for hiking in summer and skiing in winter.",
      source: "Spain Less Traveled",
      prompt: "What winter or summer activity did you love most here?",
      image: "/sierra-nevada.jpg",
      coordinates: [37.1, -3.4],
      activities: ["Skiing", "Snowboarding", "Hiking", "Mountain biking"],
      bestTime: "Year round",
      difficulty: "Easy to Difficult"
    },
    {
      id: 4,
      name: "Cabo de Gata-Níjar Natural Park",
      description: "A UNESCO biosphere reserve with wild beaches and desert-like landscapes.",
      details: "Wild beaches and desert-like landscapes.",
      source: "Spain Less Traveled",
      prompt: "What small hidden beach or path did you find?",
      image: "/cabo-gata.jpg",
      coordinates: [36.8, -2.2],
      activities: ["Beach exploration", "Snorkeling", "Hiking", "Bird watching"],
      bestTime: "April to October",
      difficulty: "Easy"
    },
    {
      id: 5,
      name: "Irati Forest & Natural Wonders by Region",
      description: "Spain has 300 nature reserves and many national parks across its regions.",
      details: "From forests to wetlands, Spain's natural diversity is incredible.",
      source: "Spain.info",
      prompt: "Which region surprised you the most with nature?",
      image: "/irati-forest.jpg",
      coordinates: [42.9, -1.0],
      activities: ["Forest hiking", "Wildlife photography", "Canoeing", "Camping"],
      bestTime: "May to September",
      difficulty: "Easy to Moderate"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <section className="py-12 px-4 bg-green-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Mountain className="h-8 w-8" />
              <span className="text-xl font-bold">Spain, Sofia</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="hover:text-green-200">Home</Link>
              <Link href="/nature" className="text-green-200 font-semibold">Nature</Link>
              <Link href="/cities" className="hover:text-green-200">Cities</Link>
              <Link href="/seville" className="hover:text-green-200">Seville</Link>
              <Link href="/gallery" className="hover:text-green-200">Gallery</Link>
              <Link href="/journal" className="hover:text-green-200">Journal</Link>
            </nav>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best Nature Places in Spain
          </h1>
          <p className="text-xl text-green-100">
            Discover Spain's incredible natural diversity from mountains to beaches
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Quick Filters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-green-900 mb-4">Find Your Perfect Nature Experience</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">All</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">Mountains</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">Beaches</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">Forests</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">Volcanic</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">Easy</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">Moderate</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-green-100">Difficult</Badge>
            </div>
          </div>

          {/* Nature Places Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {naturePlaces.map((place) => (
              <Card key={place.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/logo.png'; // Fallback to logo if image fails
                      e.target.className = 'w-full h-full object-cover opacity-50';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{place.name}</h3>
                    <p className="text-sm opacity-90">{place.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-green-800">
                      {place.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Activities</h4>
                      <div className="flex flex-wrap gap-1">
                        {place.activities.map((activity, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {activity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Details</h4>
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Best Time:</span> {place.bestTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Difficulty:</span> {place.difficulty}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{place.details}</p>
                  
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <p className="text-sm font-medium text-green-800 mb-1">Suggested journal prompt:</p>
                    <p className="text-sm text-green-700">{place.prompt}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => setSelectedPlace(place)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      View on Map
                    </Button>
                    <Link href={`/journal?location=${encodeURIComponent(place.name)}`}>
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

          {/* Map Section */}
          {selectedPlace && (
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-6 w-6 text-green-600" />
                  Interactive Map: {selectedPlace.name}
                </CardTitle>
                <CardDescription>
                  Explore the location and plan your visit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimpleMap 
                  location={selectedPlace}
                  center={selectedPlace.coordinates}
                  zoom={12}
                />
                <div className="mt-4 grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Getting There</h4>
                    <p className="text-sm text-gray-600">Transportation options and directions</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Best Time to Visit</h4>
                    <p className="text-sm text-gray-600">{selectedPlace.bestTime}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Local Tips</h4>
                    <p className="text-sm text-gray-600">Insider recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-green-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Spain's Natural Wonders?</h2>
          <p className="text-xl mb-8">Start planning your nature adventures and journaling your experiences</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/journal">
              <Button size="lg" variant="secondary">
                Start Journaling
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800">
                Upload Photos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}