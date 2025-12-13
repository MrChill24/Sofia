'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Camera, MapPin, Calendar, Heart, Edit, Trash2, Download, Share } from 'lucide-react'
import Link from 'next/link'

export default function GalleryPage() {
  const [photos, setPhotos] = useState([])
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    location: '',
    date: '',
    caption: '',
    category: ''
  })

  const categories = [
    "Nature adventures",
    "City memories", 
    "Hidden gems",
    "Food & culture",
    "People & portraits",
    "Architecture",
    "Beaches & coasts",
    "Mountains & hiking"
  ]

  const handlePhotoUpload = async (e) => {
    const files = e.target.files
    if (files.length > 0) {
      const newPhotos = Array.from(files).map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        location: '',
        date: new Date().toISOString().split('T')[0],
        caption: '',
        category: 'Nature adventures',
        uploadedAt: new Date()
      }))
      setPhotos(prev => [...prev, ...newPhotos])

      // Upload to server
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('photos', file)
      })

      try {
        const response = await fetch('/api/photos', {
          method: 'POST',
          body: formData,
        })
        const result = await response.json()
        if (result.success) {
          console.log('Photos uploaded successfully:', result.count)
        }
      } catch (error) {
        console.error('Error uploading photos:', error)
      }
    }
  }

  const handleEditPhoto = (photo) => {
    setSelectedPhoto(photo)
    setEditForm({
      location: photo.location,
      date: photo.date,
      caption: photo.caption,
      category: photo.category
    })
    setIsEditing(true)
  }

  const savePhotoEdit = () => {
    if (selectedPhoto) {
      setPhotos(prev => prev.map(photo => 
        photo.id === selectedPhoto.id 
          ? { ...photo, ...editForm }
          : photo
      ))
      setIsEditing(false)
      setSelectedPhoto(null)
    }
  }

  const deletePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId))
  }

  const getPhotosByCategory = (category) => {
    return photos.filter(photo => photo.category === category)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <section className="py-12 px-4 bg-blue-800 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center gap-2">
              <Camera className="h-8 w-8" />
              <span className="text-xl font-bold">Spain, Sofia</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="hover:text-blue-200">Home</Link>
              <Link href="/nature" className="hover:text-blue-200">Nature</Link>
              <Link href="/cities" className="hover:text-blue-200">Cities</Link>
              <Link href="/seville" className="hover:text-blue-200">Seville</Link>
              <Link href="/gallery" className="text-blue-200 font-semibold">Gallery</Link>
              <Link href="/journal" className="hover:text-blue-200">Journal</Link>
            </nav>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Photo Gallery
          </h1>
          <p className="text-xl text-blue-100">
            Capture and caption your Spain adventures
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Upload Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-6 w-6 text-blue-600" />
                Upload Your Photos
              </CardTitle>
              <CardDescription>
                Add photos from your Spain adventures and add detailed captions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="photo-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                      <Camera className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-blue-700 mb-2">Click to upload photos</p>
                      <p className="text-sm text-blue-500">or drag and drop multiple files</p>
                      <p className="text-xs text-blue-400 mt-2">Supports: JPG, PNG, GIF (Max 10MB each)</p>
                    </div>
                  </Label>
                  <Input
                    id="photo-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* Recent Uploads */}
                {photos.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Recent Uploads ({photos.length})</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {photos.slice(-6).map((photo) => (
                        <div key={photo.id} className="relative group">
                          <img
                            src={photo.preview}
                            alt="Preview"
                            className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => handleEditPhoto(photo)}
                            onError={(e) => {
                              e.target.src = '/logo.png'; // Fallback to logo if image fails
                              e.target.className = 'w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity opacity-50';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Edit className="h-6 w-6 text-white" />
                          </div>
                          {!photo.caption && (
                            <div className="absolute top-1 right-1">
                              <Badge variant="destructive" className="text-xs">No caption</Badge>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Category Filters */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge 
                  key={category} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-blue-100 px-3 py-1"
                >
                  {category} ({getPhotosByCategory(category).length})
                </Badge>
              ))}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <Card key={photo.id} className="overflow-hidden hover:shadow-xl transition-shadow group">
                <div className="relative aspect-square">
                  <img
                    src={photo.preview}
                    alt={photo.caption || 'Uploaded photo'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/logo.png'; // Fallback to logo if image fails
                      e.target.className = 'w-full h-full object-cover opacity-50';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm font-medium truncate">{photo.location || 'No location'}</p>
                      <p className="text-xs opacity-90">{photo.date}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <Badge variant="secondary" className="text-xs">
                      {photo.category}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{photo.location || 'Add location'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{photo.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {photo.caption || 'No caption added yet. Click edit to add your story!'}
                  </p>
                  
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" variant="outline" className="flex-1">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Photo Details</DialogTitle>
                          <DialogDescription>
                            View and manage your photo details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <img
                              src={photo.preview}
                              alt={photo.caption}
                              className="w-full rounded-lg"
                              onError={(e) => {
                                e.target.src = '/logo.png'; // Fallback to logo if image fails
                                e.target.className = 'w-full rounded-lg opacity-50';
                              }}
                            />
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Location</Label>
                              <p className="text-sm text-gray-600">{photo.location || 'Not set'}</p>
                            </div>
                            <div>
                              <Label>Date</Label>
                              <p className="text-sm text-gray-600">{photo.date}</p>
                            </div>
                            <div>
                              <Label>Category</Label>
                              <Badge variant="outline">{photo.category}</Badge>
                            </div>
                            <div>
                              <Label>Caption</Label>
                              <p className="text-sm text-gray-600">{photo.caption || 'No caption'}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleEditPhoto(photo)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                              <Button size="sm" variant="outline">
                                <Share className="h-4 w-4 mr-2" />
                                Share
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditPhoto(photo)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deletePhoto(photo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {photos.length === 0 && (
            <div className="text-center py-12">
              <Camera className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No photos yet</h3>
              <p className="text-gray-500 mb-6">Start uploading your Spain adventure photos!</p>
              <Label htmlFor="photo-upload-empty" className="cursor-pointer">
                <Button size="lg">
                  <Camera className="h-5 w-5 mr-2" />
                  Upload Your First Photo
                </Button>
              </Label>
              <Input
                id="photo-upload-empty"
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          )}
        </div>
      </section>

      {/* Edit Photo Modal */}
      {isEditing && selectedPhoto && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Photo Details</DialogTitle>
              <DialogDescription>
                Add location, date, caption, and category to your photo
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <img
                    src={selectedPhoto.preview}
                    alt="Preview"
                    className="w-full rounded-lg"
                    onError={(e) => {
                      e.target.src = '/logo.png'; // Fallback to logo if image fails
                      e.target.className = 'w-full rounded-lg opacity-50';
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Where was this photo taken?"
                      value={editForm.location}
                      onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={editForm.date}
                      onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={editForm.category}
                      onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="caption">Caption / Memory Summary</Label>
                <Textarea
                  id="caption"
                  placeholder="What made this moment meaningful? Tell the story behind this photo..."
                  rows={4}
                  value={editForm.caption}
                  onChange={(e) => setEditForm(prev => ({ ...prev, caption: e.target.value }))}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={savePhotoEdit} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Call to Action */}
      <section className="py-12 px-4 bg-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Building Your Spain Memory Collection</h2>
          <p className="text-xl mb-8">Every photo tells a story. Keep capturing and documenting your journey!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/journal">
              <Button size="lg" variant="secondary">
                Write in Journal
              </Button>
            </Link>
            <Label htmlFor="photo-upload-cta" className="cursor-pointer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-800">
                Upload More Photos
              </Button>
            </Label>
            <Input
              id="photo-upload-cta"
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>
      </section>
    </div>
  )
}