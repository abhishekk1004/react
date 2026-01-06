/**
 * =============================================================================
 * PHOTOGRAPHY PAGE - ALBUM GALLERY
 * =============================================================================
 * 
 * 📍 WHAT TO CUSTOMIZE:
 * 
 * 1. ALBUMS (Lines ~20-80): Add your own photo albums
 *    - name: Album title (e.g., "Temples", "Nature")
 *    - cover: Cover image URL for the album
 *    - photos: Array of photo URLs in that album
 *    - count: Number of photos (update this when adding photos)
 * 
 * 🔧 ADMIN FUNCTIONALITY:
 * When you add Django backend, you can:
 * - Add new albums via admin panel
 * - Upload photos to albums
 * - Delete/reorder photos
 * 
 * =============================================================================
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';

/**
 * ============================================
 * 📸 PHOTO ALBUMS DATA
 * Add your own albums and photos here
 * ============================================
 */
const albums = [
  {
    name: "Temples",
    // 🖼️ COVER IMAGE: Main thumbnail for this album
    cover: "https://images.unsplash.com/photo-1564804955450-e6e4c84a0fc5?w=800",
    // 📷 PHOTOS: All images in this album
    photos: [
      "https://images.unsplash.com/photo-1564804955450-e6e4c84a0fc5?w=1200",
      "https://images.unsplash.com/photo-1544931170-0a0e8f6e7f1a?w=1200",
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
      "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=1200",
    ],
    count: 4, // Update this when adding/removing photos
  },
  {
    name: "Nature",
    cover: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800",
    photos: [
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
      "https://images.unsplash.com/photo-1518173946687-a4c036bc3f2c?w=1200",
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1200",
    ],
    count: 5,
  },
  {
    name: "Street",
    cover: "https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=800",
    photos: [
      "https://images.unsplash.com/photo-1476973422084-e0fa66ff9456?w=1200",
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1200",
    ],
    count: 3,
  },
  {
    name: "Portraits",
    cover: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800",
    photos: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1200",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200",
    ],
    count: 4,
  },
  {
    name: "Architecture",
    cover: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=800",
    photos: [
      "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?w=1200",
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200",
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200",
    ],
    count: 3,
  },
  {
    name: "Events",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    photos: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200",
    ],
    count: 2,
  },
  /* 
   * ➕ ADD MORE ALBUMS HERE
   * Copy the structure above and paste below:
   * 
   * {
   *   name: "Your Album Name",
   *   cover: "https://your-cover-image-url.jpg",
   *   photos: [
   *     "https://photo1.jpg",
   *     "https://photo2.jpg",
   *   ],
   *   count: 2,
   * },
   */
];

const Photography = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<typeof albums[0] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextImage = () => {
    if (selectedAlbum && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % selectedAlbum.photos.length);
    }
  };

  const prevImage = () => {
    if (selectedAlbum && lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + selectedAlbum.photos.length) % selectedAlbum.photos.length);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Photography Gallery"
          subtitle="Capturing moments through my lens - a visual journey of life, nature, and culture"
        />

        <AnimatePresence mode="wait">
          {selectedAlbum ? (
            /* ================================================================
               ALBUM PHOTOS VIEW - Shows all photos in selected album
               ================================================================ */
            <motion.div
              key="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                variant="ghost"
                onClick={() => setSelectedAlbum(null)}
                className="mb-6"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Albums
              </Button>

              <h2 className="font-heading text-2xl font-bold mb-6">{selectedAlbum.name}</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedAlbum.photos.map((photo, index) => (
                  <motion.div
                    key={photo}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => openLightbox(index)}
                    className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={photo}
                      alt={`${selectedAlbum.name} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* ================================================================
               ALBUMS GRID VIEW - Shows all album covers
               ================================================================ */
            <motion.div
              key="albums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {albums.map((album, index) => (
                <motion.div
                  key={album.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedAlbum(album)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-card">
                    <img
                      src={album.cover}
                      alt={album.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                            {album.name}
                          </h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <ImageIcon className="h-3 w-3" />
                            {album.count} photos
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <ChevronRight className="h-5 w-5 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ================================================================
            LIGHTBOX - Full screen photo viewer
            ================================================================ */}
        <AnimatePresence>
          {lightboxIndex !== null && selectedAlbum && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center"
              onClick={closeLightbox}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={closeLightbox}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                src={selectedAlbum.photos[lightboxIndex]}
                alt=""
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
                {lightboxIndex + 1} / {selectedAlbum.photos.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Photography;