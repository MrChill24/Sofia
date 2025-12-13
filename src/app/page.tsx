'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Camera, BookOpen, Heart, Star, Plane, Utensils, Music, Mountain } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-green-600" />,
      title: "Interactive Maps",
      description: "Explore each city and nature location with detailed maps",
      link: "/maps"
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-600" />,
      title: "Photo Gallery",
      description: "Upload and caption your travel memories",
      link: "/gallery"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-red-600" />,
      title: "Travel Journal",
      description: "Record your experiences with mood tracking and prompts",
      link: "/journal"
    },
    {
      icon: <Mountain className="h-8 w-8 text-purple-600" />,
      title: "Nature Places",
      description: "Discover Spain's most beautiful natural wonders",
      link: "/nature"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-600" />,
      title: "Cities & Culture",
      description: "Explore historic cities and vibrant culture",
      link: "/cities"
    },
    {
      icon: <Heart className="h-8 w-8 text-pink-600" />,
      title: "Special: Seville",
      description: "Your home base with exclusive local insights",
      link: "/seville"
    }
  ]

  const quickStats = [
    { number: "15+", label: "Nature Destinations" },
    { number: "8", label: "Major Cities" },
    { number: "∞", label: "Memories to Make" },
    { number: "1", label: "Amazing Adventure" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-orange-100/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-8">
            <img src="/logo.png" alt="Spain, Sofia" className="h-32 mx-auto mb-6 rounded-lg shadow-lg" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-amber-900 mb-6 leading-tight">
            Welcome to Spain, Sofia
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto leading-relaxed mb-8">
            Your personal tour guide and travel journal for exploring the incredible diversity of Spain
          </p>
          <p className="text-lg text-amber-700 max-w-3xl mx-auto leading-relaxed mb-12">
            From soaring mountains and volcanic landscapes to historic cities and charming coastal towns — 
            discover amazing places, capture your photos, and record the memories that matter most.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Badge variant="secondary" className="text-lg px-4 py-2">🇪🇸 Spain Adventure</Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">📸 Photo Journal</Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">🗺️ Interactive Maps</Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">📝 Travel Diary</Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-amber-900">{stat.number}</div>
                <div className="text-sm text-amber-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center">
            Your Complete Spain Travel Companion
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.link}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer h-full">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-amber-900">{feature.title}</CardTitle>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button variant="outline" className="w-full">
                      Explore {feature.title}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Preview Sections */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center">
            Start Your Journey
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Mountain className="h-6 w-6" />
                  Nature Adventures
                </CardTitle>
                <CardDescription>Explore Spain's natural wonders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Picos de Europa</span>
                    <Badge variant="outline">Mountains</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Teide National Park</span>
                    <Badge variant="outline">Volcanic</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sierra Nevada</span>
                    <Badge variant="outline">Skiing/Hiking</Badge>
                  </div>
                </div>
                <Link href="/nature">
                  <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">
                    Explore Nature
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-800">
                  <Star className="h-6 w-6" />
                  City Experiences
                </CardTitle>
                <CardDescription>Discover vibrant Spanish cities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Barcelona</span>
                    <Badge variant="outline">Architecture</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Madrid</span>
                    <Badge variant="outline">Museums</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Seville</span>
                    <Badge variant="outline">Flamenco</Badge>
                  </div>
                </div>
                <Link href="/cities">
                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Explore Cities
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Special Seville Feature */}
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-orange-200">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-orange-900 flex items-center justify-center gap-2">
                <Heart className="h-8 w-8 text-red-600" />
                Special Feature: Seville
              </CardTitle>
              <CardDescription className="text-lg">
                Your home base with exclusive local insights and experiences
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white rounded-lg">
                  <Music className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Flamenco Shows</h3>
                  <p className="text-sm text-gray-600">Authentic experiences</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <Utensils className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Local Cuisine</h3>
                  <p className="text-sm text-gray-600">Tapas & traditions</p>
                </div>
                <div className="p-4 bg-white rounded-lg">
                  <Plane className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold">Day Trips</h3>
                  <p className="text-sm text-gray-600">Nearby adventures</p>
                </div>
              </div>
              <Link href="/seville">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-lg px-8">
                  Discover Seville
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-6">
            Ready to Begin Your Spanish Adventure?
          </h2>
          <p className="text-xl text-amber-800 mb-8">
            Start exploring, capturing, and journaling your journey through Spain
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/journal">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Start Journaling
              </Button>
            </Link>
            <Link href="/gallery">
              <Button size="lg" variant="outline">
                Upload Photos
              </Button>
            </Link>
            <Link href="/maps">
              <Button size="lg" variant="outline">
                View Maps
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}