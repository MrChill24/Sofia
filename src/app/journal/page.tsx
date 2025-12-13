'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { BookOpen, MapPin, Calendar, Heart, Star, Plus, Edit, Trash2, Search, Filter } from 'lucide-react'
import Link from 'next/link'

export default function JournalPage() {
  const [journalEntries, setJournalEntries] = useState([])
  const [newEntry, setNewEntry] = useState({
    date: '',
    location: '',
    text: '',
    mood: '',
    bestMoment: '',
    unexpected: '',
    wish: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMood, setSelectedMood] = useState('all')
  const [isAdding, setIsAdding] = useState(false)

  // Load entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('spain-journal-entries')
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries))
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('spain-journal-entries', JSON.stringify(journalEntries))
  }, [journalEntries])

  const handleJournalSubmit = async () => {
    if (newEntry.date && newEntry.location) {
      try {
        const response = await fetch('/api/journal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEntry),
        })
        const result = await response.json()
        if (result.success) {
          const entryWithId = { ...newEntry, id: Date.now() }
          setJournalEntries(prev => [entryWithId, ...prev])
          setNewEntry({
            date: '',
            location: '',
            text: '',
            mood: '',
            bestMoment: '',
            unexpected: '',
            wish: ''
          })
          setIsAdding(false)
          console.log('Journal entry saved successfully')
        }
      } catch (error) {
        console.error('Error saving journal entry:', error)
      }
    }
  }

  const deleteEntry = (id) => {
    setJournalEntries(prev => prev.filter(entry => entry.id !== id))
  }

  const getMoodColor = (mood) => {
    const moodColors = {
      'excited': 'bg-yellow-100 text-yellow-800',
      'happy': 'bg-green-100 text-green-800',
      'peaceful': 'bg-blue-100 text-blue-800',
      'tired': 'bg-gray-100 text-gray-800',
      'homesick': 'bg-purple-100 text-purple-800',
      'free': 'bg-orange-100 text-orange-800',
      'grateful': 'bg-pink-100 text-pink-800',
      'adventurous': 'bg-red-100 text-red-800'
    }
    return moodColors[mood] || 'bg-gray-100 text-gray-800'
  }

  const filteredEntries = journalEntries.filter(entry => {
    const matchesSearch = entry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.text.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMood = selectedMood === 'all' || entry.mood === selectedMood
    return matchesSearch && matchesMood
  })

  const uniqueMoods = [...new Set(journalEntries.map(entry => entry.mood).filter(Boolean))]

  const reflectionPrompts = [
    "Three words to remember today.",
    "One thing I learned about Spain today.",
    "One thing I didn't expect to feel.",
    "A sound I'll always remember."
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      {/* Header */}
      <section className="py-12 px-4 bg-red-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-8 w-8" />
              <span className="text-xl font-bold">Spain, Sofia</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="hover:text-red-200">Home</Link>
              <Link href="/nature" className="hover:text-red-200">Nature</Link>
              <Link href="/cities" className="hover:text-red-200">Cities</Link>
              <Link href="/seville" className="hover:text-red-200">Seville</Link>
              <Link href="/gallery" className="hover:text-red-200">Gallery</Link>
              <Link href="/journal" className="text-red-200 font-semibold">Journal</Link>
            </nav>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Travel Journal
          </h1>
          <p className="text-xl text-red-100">
            Document your Spain journey with thoughts, feelings, and memories
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Quick Actions */}
          <div className="flex flex-wrap justify-between items-center mb-8">
            <div className="flex gap-4 mb-4 md:mb-0">
              <Button 
                onClick={() => setIsAdding(!isAdding)}
                className="bg-red-600 hover:bg-red-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
              <Link href="/gallery">
                <Button variant="outline">
                  Add Photos
                </Button>
              </Link>
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Moods</option>
                {uniqueMoods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Add New Entry Form */}
          {isAdding && (
            <Card className="mb-8 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">New Journal Entry</CardTitle>
                <CardDescription>Record your memories and reflections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEntry.date}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="Where were you?"
                      value={newEntry.location}
                      onChange={(e) => setNewEntry(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="mood">Mood Tag</Label>
                  <Input
                    id="mood"
                    placeholder="e.g., excited, homesick, free"
                    value={newEntry.mood}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, mood: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="text">Journal Entry</Label>
                  <Textarea
                    id="text"
                    placeholder="Write about your experience..."
                    rows={6}
                    value={newEntry.text}
                    onChange={(e) => setNewEntry(prev => ({ ...prev, text: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-red-800">Optional Prompts:</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bestMoment">Best moment of the day</Label>
                      <Textarea
                        id="bestMoment"
                        placeholder="What was the best moment?"
                        rows={2}
                        value={newEntry.bestMoment}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, bestMoment: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="unexpected">Most unexpected thing</Label>
                      <Textarea
                        id="unexpected"
                        placeholder="What surprised you?"
                        rows={2}
                        value={newEntry.unexpected}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, unexpected: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="wish">Wish I could tell someone back home...</Label>
                      <Textarea
                        id="wish"
                        placeholder="What do you wish to share?"
                        rows={2}
                        value={newEntry.wish}
                        onChange={(e) => setNewEntry(prev => ({ ...prev, wish: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleJournalSubmit} className="bg-red-600 hover:bg-red-700">
                    Save Journal Entry
                  </Button>
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Reflection Prompts */}
          <Card className="mb-8 bg-gradient-to-r from-pink-50 to-red-50">
            <CardHeader>
              <CardTitle className="text-pink-800">Quick Reflection Prompts</CardTitle>
              <CardDescription>When you're busy, try these quick reflections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {reflectionPrompts.map((prompt, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-pink-200">
                    <p className="text-pink-800 text-sm font-medium">{prompt}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Journal Entries */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-red-900 mb-6">
              Your Journal Entries ({filteredEntries.length})
            </h2>
            
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-600 mb-4">No journal entries yet</h3>
                <p className="text-gray-500 mb-6">Start documenting your Spain adventure!</p>
                <Button onClick={() => setIsAdding(true)} className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-5 w-5 mr-2" />
                  Write Your First Entry
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredEntries.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-xl font-semibold text-red-800">{entry.location}</h3>
                            {entry.mood && (
                              <Badge className={getMoodColor(entry.mood)}>
                                {entry.mood}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{entry.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {entry.text && (
                        <div className="mb-4">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{entry.text}</p>
                        </div>
                      )}
                      
                      {(entry.bestMoment || entry.unexpected || entry.wish) && (
                        <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                          {entry.bestMoment && (
                            <div className="bg-yellow-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-yellow-800 mb-1">Best Moment</p>
                              <p className="text-sm text-yellow-700">{entry.bestMoment}</p>
                            </div>
                          )}
                          {entry.unexpected && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-blue-800 mb-1">Unexpected</p>
                              <p className="text-sm text-blue-700">{entry.unexpected}</p>
                            </div>
                          )}
                          {entry.wish && (
                            <div className="bg-pink-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-pink-800 mb-1">Wish to Share</p>
                              <p className="text-sm text-pink-700">{entry.wish}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 px-4 bg-red-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your Spain Story Awaits</h2>
          <p className="text-xl mb-8">Every entry captures a moment. Keep writing your adventure!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button onClick={() => setIsAdding(true)} size="lg" variant="secondary">
              <Plus className="h-5 w-5 mr-2" />
              New Entry
            </Button>
            <Link href="/gallery">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-800">
                Add Photos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}