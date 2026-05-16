import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  FiBox, FiDroplet, FiAward, FiShield, 
  FiChevronLeft, FiChevronRight, FiZoomIn,
  FiPackage, FiGift, FiStar,
  FiArrowRight, FiPlay, FiPause, FiX
} from 'react-icons/fi'

interface PackagingItem {
  id: number
  name: string
  collection: string
  description: string
  materials: string[]
  dimensions: string
  features: string[]
  images: string[]
  color: string
  gradient: string
}

const packagingCollection: PackagingItem[] = [
  {
    id: 1,
    name: 'Signature Collection',
    collection: 'Classic',
    description: 'Our iconic crystal-cut bottle, inspired by the geometric patterns of Art Deco architecture. Each bottle is hand-polished by master craftsmen, taking over 48 hours to complete.',
    materials: ['Hand-cut Crystal', '24K Gold-Plated Cap', 'Italian Leather Label'],
    dimensions: '100ml - 15cm × 8cm × 5cm',
    features: [
      'Hand-cut crystal facets',
      'Gold-plated magnetic cap',
      'Embossed leather label',
      'UV-protective coating',
      'Serial numbered base'
    ],
    images: [
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80',
    ],
    color: 'from-amber-500 to-yellow-600',
    gradient: 'from-amber-500/20 to-yellow-600/10',
  },
  {
    id: 2,
    name: 'Prive Collection',
    collection: 'Limited Edition',
    description: 'An exclusive limited edition housed in hand-blown Murano glass. Each piece is unique, created by master glassblowers using techniques passed down through generations.',
    materials: ['Murano Glass', 'Platinum-Plated Details', 'Suede Presentation Box'],
    dimensions: '75ml - 18cm × 10cm × 7cm',
    features: [
      'Hand-blown Murano glass',
      'Platinum-plated accents',
      'Suede-lined presentation box',
      'Certificate of authenticity',
      'Limited to 500 pieces worldwide'
    ],
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=800&q=80',
    ],
    color: 'from-purple-500 to-pink-600',
    gradient: 'from-purple-500/20 to-pink-600/10',
  },
  {
    id: 3,
    name: 'Essence Travel',
    collection: 'Travel',
    description: 'Elegance on the go. Our travel collection features sleek, portable designs without compromising on luxury. Perfect for the modern connoisseur.',
    materials: ['Brushed Aluminum', 'Reinforced Glass', 'Travel Leather Case'],
    dimensions: '30ml - 12cm × 6cm × 4cm',
    features: [
      'Aircraft-friendly size',
      'Leak-proof magnetic seal',
      'Brushed metal finish',
      'Compact travel case',
      'Refillable design'
    ],
    images: [
      'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
    ],
    color: 'from-emerald-500 to-teal-600',
    gradient: 'from-emerald-500/20 to-teal-600/10',
  },
  {
    id: 4,
    name: 'Gift Collection',
    collection: 'Gifting',
    description: 'The ultimate expression of luxury gifting. Each set is wrapped in our signature presentation box with hand-tied silk ribbons and a personalized message card.',
    materials: ['Premium Cardboard', 'Silk Ribbon', 'Velvet Interior', 'Gold Foil Stamping'],
    dimensions: 'Various sizes available',
    features: [
      'Premium gift wrapping',
      'Personalized message card',
      'Silk ribbon closure',
      'Velvet-lined interior',
      'Gift receipt option'
    ],
    images: [
      'https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    ],
    color: 'from-rose-500 to-red-600',
    gradient: 'from-rose-500/20 to-red-600/10',
  },
]

const Packaging = () => {
  const [activeCollection, setActiveCollection] = useState(0)
  const [activeImage, setActiveImage] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false)

  const currentPackaging = packagingCollection[activeCollection]

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Reset zoom when changing collection
  useEffect(() => {
    setIsZoomed(false)
    setActiveImage(0)
  }, [activeCollection])

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % currentPackaging.images.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + currentPackaging.images.length) % currentPackaging.images.length)
  }

  // Auto-play images
  useEffect(() => {
    if (!isAutoPlaying || showFullscreenGallery) return
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % currentPackaging.images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentPackaging.images.length, showFullscreenGallery])

  // Prevent body scroll when fullscreen gallery is open
  useEffect(() => {
    if (showFullscreenGallery) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showFullscreenGallery])

  return (
    <div className="min-h-screen bg-black pt-16 md:pt-20">
      {/* Hero Section */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent" />
          <div className="absolute top-0 left-0 w-48 md:w-96 h-48 md:h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-48 md:w-96 h-48 md:h-96 bg-amber-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-3 md:mb-4"
            >
              Craftsmanship
            </motion.p>
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6">
              The Art of <span className="text-gold">Packaging</span>
            </h1>
            <p className="text-white/60 text-sm md:text-lg max-w-2xl mx-auto px-4">
              Every Nuvia Perfume bottle is a masterpiece of design and craftsmanship, 
              created to be as extraordinary as the fragrance within
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collection Selector */}
      <section className="py-4 md:py-8 bg-black/50 backdrop-blur-lg border-y border-white/10 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {packagingCollection.map((item, index) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCollection(index)
                  setActiveImage(0)
                }}
                className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all duration-300 whitespace-nowrap text-xs md:text-sm ${
                  activeCollection === index
                    ? 'bg-gold text-black font-semibold'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                <FiBox className="w-3 h-3 md:w-4 md:h-4" />
                {item.collection}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Display */}
      <section className="py-8 md:py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCollection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                {/* Image Gallery */}
                <div className="space-y-4 md:space-y-6">
                  {/* Main Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black border border-white/10 group"
                  >
                    <div 
                      className="aspect-square relative cursor-pointer"
                      onClick={() => {
                        if (isMobile) {
                          setShowFullscreenGallery(true)
                        } else {
                          setIsZoomed(!isZoomed)
                        }
                      }}
                    >
                      <img
                        src={currentPackaging.images[activeImage]}
                        alt={currentPackaging.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          !isMobile && isZoomed ? 'scale-150' : 'scale-100'
                        }`}
                      />

                      {/* Mobile tap hint */}
                      {isMobile && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 active:opacity-100 transition-opacity bg-black/20">
                          <FiZoomIn className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Image Navigation */}
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex justify-between items-center">
                        {/* Dots */}
                        <div className="flex gap-1.5 md:gap-2">
                          {currentPackaging.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveImage(index)
                              }}
                              className={`rounded-full transition-all duration-300 ${
                                activeImage === index
                                  ? 'bg-gold w-4 md:w-6 h-1.5 md:h-2'
                                  : 'bg-white/30 hover:bg-white/50 w-1.5 md:w-2 h-1.5 md:h-2'
                              }`}
                            />
                          ))}
                        </div>
                        
                        {/* Controls */}
                        <div className="flex gap-1.5 md:gap-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              prevImage()
                            }}
                            className="bg-white/10 backdrop-blur-md p-1.5 md:p-2 rounded-full text-white hover:bg-gold hover:text-black transition-all"
                          >
                            <FiChevronLeft className="w-3.5 h-3.5 md:w-5 md:h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              nextImage()
                            }}
                            className="bg-white/10 backdrop-blur-md p-1.5 md:p-2 rounded-full text-white hover:bg-gold hover:text-black transition-all"
                          >
                            <FiChevronRight className="w-3.5 h-3.5 md:w-5 md:h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsAutoPlaying(!isAutoPlaying)
                            }}
                            className={`p-1.5 md:p-2 rounded-full transition-all ${
                              isAutoPlaying
                                ? 'bg-gold/20 text-gold'
                                : 'bg-white/10 text-white'
                            }`}
                          >
                            {isAutoPlaying ? (
                              <FiPause className="w-3.5 h-3.5 md:w-5 md:h-5" />
                            ) : (
                              <FiPlay className="w-3.5 h-3.5 md:w-5 md:h-5" />
                            )}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (isMobile) {
                                setShowFullscreenGallery(true)
                              } else {
                                setIsZoomed(!isZoomed)
                              }
                            }}
                            className="bg-white/10 backdrop-blur-md p-1.5 md:p-2 rounded-full text-white hover:bg-gold hover:text-black transition-all"
                          >
                            <FiZoomIn className="w-3.5 h-3.5 md:w-5 md:h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Zoom Indicator (Desktop only) */}
                    {!isMobile && isZoomed && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full hidden md:block"
                      >
                        Click to zoom out
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Thumbnail Gallery - Hidden on mobile */}
                  <div className="hidden md:grid grid-cols-3 gap-3 md:gap-4">
                    {currentPackaging.images.map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveImage(index)}
                        className={`relative rounded-lg md:rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                          activeImage === index
                            ? 'border-gold'
                            : 'border-transparent hover:border-white/30'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {activeImage === index && (
                          <div className="absolute inset-0 bg-gold/20" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6 md:space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className={`inline-block bg-gradient-to-r ${currentPackaging.color} text-white text-xs px-3 py-1 rounded-full font-semibold mb-3 md:mb-4`}>
                      {currentPackaging.collection}
                    </span>
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">
                      {currentPackaging.name}
                    </h2>
                    <p className="text-white/60 text-sm md:text-lg leading-relaxed mb-6 md:mb-8">
                      {currentPackaging.description}
                    </p>
                  </motion.div>

                  {/* Materials */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10"
                  >
                    <h3 className="text-white font-semibold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                      <FiDroplet className="text-gold w-4 h-4 md:w-5 md:h-5" />
                      Premium Materials
                    </h3>
                    <div className="grid grid-cols-1 gap-2 md:gap-3">
                      {currentPackaging.materials.map((material, index) => (
                        <motion.div
                          key={material}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                          className="flex items-center gap-2 md:gap-3 text-white/60 text-sm md:text-base"
                        >
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gold rounded-full flex-shrink-0" />
                          {material}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Dimensions */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10"
                  >
                    <h3 className="text-white font-semibold mb-3 md:mb-4 flex items-center gap-2 text-sm md:text-base">
                      <FiPackage className="text-gold w-4 h-4 md:w-5 md:h-5" />
                      Dimensions
                    </h3>
                    <p className="text-white/60 text-sm md:text-base">{currentPackaging.dimensions}</p>
                  </motion.div>

                  {/* Features */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2 md:space-y-3"
                  >
                    <h3 className="text-white font-semibold flex items-center gap-2 text-sm md:text-base">
                      <FiStar className="text-gold w-4 h-4 md:w-5 md:h-5" />
                      Key Features
                    </h3>
                    {currentPackaging.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        onHoverStart={() => setSelectedFeature(index)}
                        onHoverEnd={() => setSelectedFeature(null)}
                        className={`flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-300 cursor-default ${
                          selectedFeature === index
                            ? `bg-gradient-to-r ${currentPackaging.gradient} border border-white/20`
                            : 'bg-white/5 border border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                          selectedFeature === index
                            ? 'bg-gold text-black'
                            : 'bg-white/10 text-white/60'
                        }`}>
                          <FiShield className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                        <span className={`transition-colors duration-300 text-sm md:text-base ${
                          selectedFeature === index ? 'text-white' : 'text-white/60'
                        }`}>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              The <span className="text-gold">Craftsmanship</span> Process
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base px-4">
              Each bottle undergoes a meticulous creation process that combines 
              traditional techniques with modern innovation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: FiDroplet,
                title: 'Glass Blowing',
                description: 'Master glassblowers shape each bottle using techniques perfected over centuries',
                time: '48 hours',
              },
              {
                icon: FiAward,
                title: 'Polishing',
                description: 'Hand-polished to achieve the perfect crystal clarity and brilliance',
                time: '24 hours',
              },
              {
                icon: FiStar,
                title: 'Gold Plating',
                description: '24K gold is carefully applied to create the signature cap finish',
                time: '12 hours',
              },
              {
                icon: FiGift,
                title: 'Assembly',
                description: 'Final assembly and quality inspection ensures perfection in every detail',
                time: '8 hours',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative"
              >
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/10 hover:border-gold/30 transition-all duration-500 text-center h-full">
                  <div className="bg-gold/10 p-3 md:p-4 rounded-lg md:rounded-xl inline-block mb-4 md:mb-6">
                    <step.icon className="w-6 h-6 md:w-8 md:h-8 text-gold" />
                  </div>
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-2 md:mb-3">{step.title}</h3>
                  <p className="text-white/50 text-xs md:text-sm mb-3 md:mb-4">{step.description}</p>
                  <span className="text-gold text-xs md:text-sm font-semibold">{step.time}</span>
                </div>
                
                {/* Connector Line - Hidden on mobile, visible on lg+ */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gold/50 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 md:py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              Collection <span className="text-gold">Comparison</span>
            </h2>
          </motion.div>

          {/* Mobile: Card-based comparison */}
          <div className="md:hidden space-y-4">
            {packagingCollection.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => {
                  setActiveCollection(index)
                  setActiveImage(0)
                  window.scrollTo({ top: 300, behavior: 'smooth' })
                }}
                className="bg-white/5 rounded-xl p-4 border border-white/10 active:border-gold/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold text-sm">{item.name}</span>
                  <span className={`inline-block bg-gradient-to-r ${item.color} text-white text-xs px-2 py-0.5 rounded-full`}>
                    {item.collection}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-white/40">Material:</span>
                    <p className="text-white/60">{item.materials[0]}</p>
                  </div>
                  <div>
                    <span className="text-white/40">Size:</span>
                    <p className="text-white/60">{item.dimensions.split(' - ')[0]}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <span className="text-white/40">Features: </span>
                  <span className="text-white/60">{item.features.length} unique features</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-white/40 font-medium">Collection</th>
                  <th className="text-left p-4 text-white/40 font-medium">Material</th>
                  <th className="text-left p-4 text-white/40 font-medium">Size</th>
                  <th className="text-left p-4 text-white/40 font-medium">Features</th>
                  <th className="text-left p-4 text-white/40 font-medium">Edition</th>
                </tr>
              </thead>
              <tbody>
                {packagingCollection.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => {
                      setActiveCollection(index)
                      setActiveImage(0)
                      window.scrollTo({ top: 400, behavior: 'smooth' })
                    }}
                  >
                    <td className="p-4">
                      <span className="text-white font-semibold">{item.name}</span>
                    </td>
                    <td className="p-4 text-white/60">{item.materials[0]}</td>
                    <td className="p-4 text-white/60">{item.dimensions.split(' - ')[0]}</td>
                    <td className="p-4 text-white/60">{item.features.length} unique features</td>
                    <td className="p-4">
                      <span className={`inline-block bg-gradient-to-r ${item.color} text-white text-xs px-3 py-1 rounded-full`}>
                        {item.collection}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gold rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
              Own a Piece of <span className="text-gold">Art</span>
            </h2>
            <p className="text-white/60 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto px-4">
              Each Nuvia Perfume bottle is not just a container for fragrance—it's a 
              collectible work of art designed to be treasured
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-semibold text-sm md:text-lg hover:bg-gold-dark transition-all duration-300 inline-flex items-center gap-2"
            >
              Explore Collection
              <FiArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Gallery for Mobile */}
      <AnimatePresence>
        {showFullscreenGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black md:hidden"
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setShowFullscreenGallery(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 backdrop-blur-md p-3 rounded-full text-white"
            >
              <FiX className="w-5 h-5" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full">
              {activeImage + 1} / {currentPackaging.images.length}
            </div>

            {/* Fullscreen Image */}
            <div className="w-full h-full flex items-center justify-center p-4">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={currentPackaging.images[activeImage]}
                alt={currentPackaging.name}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full text-white"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-3 rounded-full text-white"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Thumbnails */}
            <div className="absolute bottom-8 left-4 right-4">
              <div className="flex justify-center gap-2">
                {currentPackaging.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index ? 'border-gold' : 'border-white/20'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Swipe hint */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-24 left-1/2 -translate-x-1/2 text-white/40 text-xs"
            >
              Swipe or tap arrows to navigate
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Packaging