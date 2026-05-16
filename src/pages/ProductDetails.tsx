import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiShoppingBag, FiHeart, FiShare2, FiChevronLeft, 
  FiChevronRight, FiTruck, FiShield, FiRotateCcw,
  FiMinus, FiPlus, FiStar, FiCheck, FiInfo
} from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

// Sample product data - in real app, fetch from API
const productData = {
  id: 1,
  name: 'Midnight Rose',
  category: 'Floral Oriental',
  price: 189,
  discount: 15,
  description: 'A captivating blend of Turkish rose and mysterious oud, Midnight Rose opens with bright bergamot and pink pepper, unfolding into a heart of Damascus rose and jasmine. The base reveals warm notes of oud, amber, and vanilla, creating an unforgettable signature scent.',
  details: 'Eau de Parfum • 100ml / 3.4 fl. oz.',
  rating: 4.8,
  reviews: 127,
  inStock: true,
  images: [
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80',
  ],
  notes: {
    top: ['Bergamot', 'Pink Pepper', 'Mandarin'],
    heart: ['Damascus Rose', 'Jasmine', 'Iris'],
    base: ['Oud', 'Amber', 'Vanilla', 'Musk'],
  },
  sizeOptions: ['50ml', '100ml', '150ml'],
  relatedProducts: [
    {
      id: 2,
      name: 'Ocean Breeze',
      category: 'Fresh Aquatic',
      price: 165,
      image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
      rating: 4.6,
      reviews: 89,
    },
    {
      id: 3,
      name: 'Velvet Amber',
      category: 'Woody Oriental',
      price: 210,
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 4,
      name: 'Gardenia Bliss',
      category: 'White Floral',
      price: 178,
      image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      reviews: 94,
    },
    {
      id: 5,
      name: 'Citrus Elixir',
      category: 'Fresh Citrus',
      price: 155,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80',
      rating: 4.5,
      reviews: 73,
    },
  ],
  reviews_list: [
    {
      id: 1,
      user: 'Sophie M.',
      rating: 5,
      date: '2024-01-15',
      title: 'Absolutely divine!',
      comment: 'This has become my signature scent. I get compliments everywhere I go. The rose and oud combination is perfectly balanced.',
      verified: true,
    },
    {
      id: 2,
      user: 'James R.',
      rating: 5,
      date: '2024-01-10',
      title: 'Worth every penny',
      comment: 'Bought this for my wife and she loves it. The longevity is impressive - lasts all day with just a couple of sprays.',
      verified: true,
    },
    {
      id: 3,
      user: 'Maria L.',
      rating: 4,
      date: '2023-12-28',
      title: 'Beautiful but strong',
      comment: 'Gorgeous scent, though a bit strong for daytime wear. Perfect for evening events. The packaging is stunning too!',
      verified: false,
    },
  ],
}

const ProductDetails = () => {
  const { id } = useParams()
  const { addToCart } = useCart()
  
  // State management
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('100ml')
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [showZoom, setShowZoom] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // In real app, fetch product by ID
  const product = productData // This would be fetched based on `id`

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount) / 100 
    : product.price

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.images[0],
    })
    
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 2000)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setMousePosition({ x, y })
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  return (
    <div className="min-h-screen bg-black pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-sm text-white/40"
        >
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-gold transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-white/60">{product.name}</span>
        </motion.div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Main Image with Zoom */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black border border-white/10 group cursor-crosshair"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-200 ${
                    showZoom ? 'scale-150' : 'scale-100'
                  }`}
                  style={
                    showZoom
                      ? { transformOrigin: `${mousePosition.x}% ${mousePosition.y}%` }
                      : undefined
                  }
                />
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-black"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gold hover:text-black"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>

              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                  -{product.discount}%
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 ${
                    selectedImage === index
                      ? 'border-gold'
                      : 'border-transparent hover:border-white/30'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-gold/20" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Category & Name */}
            <div>
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-3">
                {product.category}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {product.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex text-gold text-lg">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-semibold">{product.rating}</span>
                <span className="text-white/40">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gold">
                ${discountedPrice}
              </span>
              {product.discount && (
                <>
                  <span className="text-2xl text-white/30 line-through">
                    ${product.price}
                  </span>
                  <span className="text-emerald-400 text-sm font-semibold">
                    Save ${product.price - discountedPrice}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-white/60 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-white font-semibold mb-4">Size</h3>
              <div className="flex gap-3">
                {product.sizeOptions.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-gold text-black'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center bg-white/5 rounded-full border border-white/10">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-white hover:text-gold transition-colors"
                >
                  <FiMinus className="w-5 h-5" />
                </motion.button>
                <span className="text-white font-semibold w-12 text-center">
                  {quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-white hover:text-gold transition-colors"
                >
                  <FiPlus className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                  isAddedToCart
                    ? 'bg-emerald-500 text-white'
                    : product.inStock
                    ? 'bg-gold text-black hover:bg-gold-dark'
                    : 'bg-white/10 text-white/40 cursor-not-allowed'
                }`}
              >
                <FiShoppingBag className="w-5 h-5" />
                {isAddedToCart ? 'Added to Cart!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </motion.button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all duration-300 ${
                  isLiked
                    ? 'border-red-500 text-red-500 bg-red-500/10'
                    : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">
                  {isLiked ? 'Saved' : 'Save'}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/60 hover:border-white/30 hover:text-white transition-all duration-300"
              >
                <FiShare2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </motion.button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg">
                  <FiTruck className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Free Shipping</p>
                  <p className="text-white/40 text-xs">On orders over $150</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg">
                  <FiShield className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Secure Payment</p>
                  <p className="text-white/40 text-xs">100% secure checkout</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-gold/10 p-2 rounded-lg">
                  <FiRotateCcw className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Easy Returns</p>
                  <p className="text-white/40 text-xs">30-day return policy</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Tab Buttons */}
          <div className="flex gap-8 mb-12 border-b border-white/10">
            {['description', 'notes', 'reviews'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-lg font-medium capitalize transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'text-gold'
                    : 'text-white/40 hover:text-white/80'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold text-white mb-6">About This Fragrance</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-8">
                    {product.description}
                  </p>
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FiInfo className="text-gold" />
                      Product Details
                    </h4>
                    <p className="text-white/60">{product.details}</p>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeTab === 'notes' && (
                <div className="max-w-3xl">
                  <h3 className="text-2xl font-bold text-white mb-8">Fragrance Notes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Top Notes */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-gradient-to-b from-gold/5 to-transparent rounded-2xl p-8 border border-gold/20"
                    >
                      <h4 className="text-gold font-semibold mb-4 text-lg">Top Notes</h4>
                      <ul className="space-y-2">
                        {product.notes.top.map((note) => (
                          <li key={note} className="text-white/60 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Heart Notes */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-b from-gold/10 to-transparent rounded-2xl p-8 border border-gold/30"
                    >
                      <h4 className="text-gold font-semibold mb-4 text-lg">Heart Notes</h4>
                      <ul className="space-y-2">
                        {product.notes.heart.map((note) => (
                          <li key={note} className="text-white/60 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Base Notes */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gradient-to-b from-gold/5 to-transparent rounded-2xl p-8 border border-gold/20"
                    >
                      <h4 className="text-gold font-semibold mb-4 text-lg">Base Notes</h4>
                      <ul className="space-y-2">
                        {product.notes.base.map((note) => (
                          <li key={note} className="text-white/60 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
                            {note}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Fragrance Pyramid Visual */}
                  <div className="mt-12 flex justify-center">
                    <div className="relative w-64 h-64">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-gradient-to-b from-gold/20 to-transparent flex items-center justify-center border border-gold/30">
                        <span className="text-gold text-sm font-semibold">Top</span>
                      </div>
                      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-gradient-to-b from-gold/10 to-transparent flex items-center justify-center border border-gold/20">
                        <span className="text-gold text-sm font-semibold mt-8">Heart</span>
                      </div>
                      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-gradient-to-b from-gold/5 to-transparent flex items-center justify-center border border-gold/10">
                        <span className="text-gold text-sm font-semibold mt-16">Base</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="max-w-3xl">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold text-white">Customer Reviews</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gold text-black px-6 py-2 rounded-full font-semibold hover:bg-gold-dark transition-colors"
                    >
                      Write a Review
                    </motion.button>
                  </div>

                  {/* Review Summary */}
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10 mb-8">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-2">{product.rating}</div>
                        <div className="flex text-gold mb-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? 'fill-current' : ''
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-white/40 text-sm">{product.reviews} reviews</div>
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div key={star} className="flex items-center gap-3">
                            <span className="text-white/60 text-sm w-8">{star} ★</span>
                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gold rounded-full"
                                style={{
                                  width: `${
                                    star === 5 ? 75 : star === 4 ? 18 : star === 3 ? 5 : star === 2 ? 2 : 0
                                  }%`,
                                }}
                              />
                            </div>
                            <span className="text-white/40 text-sm w-8">
                              {star === 5 ? '75%' : star === 4 ? '18%' : star === 3 ? '5%' : star === 2 ? '2%' : '0%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {product.reviews_list.map((review, index) => (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                              <span className="text-gold font-semibold">
                                {review.user.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-white font-semibold">{review.user}</h4>
                                {review.verified && (
                                  <span className="flex items-center gap-1 text-emerald-400 text-xs">
                                    <FiCheck className="w-3 h-3" />
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="flex text-gold text-sm">
                                  {[...Array(5)].map((_, i) => (
                                    <FiStar
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < review.rating ? 'fill-current' : ''
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-white/40 text-sm">{review.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h5 className="text-white font-medium mb-2">{review.title}</h5>
                        <p className="text-white/60 leading-relaxed">{review.comment}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Load More Button */}
                  <div className="text-center mt-8">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-white/10 text-white/60 px-8 py-3 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
                    >
                      Load More Reviews
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      <div className="bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-gold text-sm tracking-[0.3em] uppercase mb-4">You May Also Like</h2>
            <h3 className="text-4xl font-bold text-white">Related Fragrances</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {product.relatedProducts.map((relatedProduct, index) => (
              <motion.div
                key={relatedProduct.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart (Mobile) */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 p-4 lg:hidden z-40"
      >
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-white font-semibold">{product.name}</p>
            <p className="text-gold font-bold">${discountedPrice}</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className={`px-6 py-3 rounded-full font-semibold ${
              isAddedToCart
                ? 'bg-emerald-500 text-white'
                : 'bg-gold text-black'
            }`}
          >
            {isAddedToCart ? 'Added!' : 'Add to Cart'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default ProductDetails