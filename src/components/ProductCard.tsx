import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiHeart, FiEye } from 'react-icons/fi'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

interface Product {
  id: number
  name: string
  category: string
  price: number
  image: string
  description?: string
  rating?: number
  reviews?: number
  isNew?: boolean
  isBestSeller?: boolean
  discount?: number
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'minimal' | 'featured'
}

const ProductCard = ({ product, variant = 'default' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    
    setIsAddedToCart(true)
    setTimeout(() => setIsAddedToCart(false), 1500)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount) / 100 
    : null

  // Featured variant - larger card with more details
  if (variant === 'featured') {
    return (
      <Link to={`/product/${product.id}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="group relative bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all duration-500"
        >
          {/* Image Container */}
          <div className="relative h-96 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
                >
                  NEW
                </motion.span>
              )}
              {product.isBestSeller && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gold text-black text-xs px-3 py-1 rounded-full font-semibold"
                >
                  BEST SELLER
                </motion.span>
              )}
              {product.discount && (
                <motion.span
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
                >
                  -{product.discount}%
                </motion.span>
              )}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              className="absolute top-4 right-4 flex flex-col gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
                className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-gold hover:text-black transition-all duration-300"
              >
                <FiEye className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-gold text-xs tracking-[0.2em] uppercase mb-3">{product.category}</p>
            <h3 className="text-white text-2xl font-semibold mb-3 group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-white/50 text-sm mb-6 leading-relaxed">{product.description}</p>
            )}
            
            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-gold">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>
                      {i < Math.floor(product.rating!) ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                {product.reviews && (
                  <span className="text-white/40 text-sm">({product.reviews} reviews)</span>
                )}
              </div>
            )}

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {discountedPrice ? (
                  <>
                    <span className="text-gold text-2xl font-bold">${discountedPrice}</span>
                    <span className="text-white/30 text-lg line-through">${product.price}</span>
                  </>
                ) : (
                  <span className="text-gold text-2xl font-bold">${product.price}</span>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                  isAddedToCart
                    ? 'bg-emerald-500 text-white'
                    : 'bg-gold text-black hover:bg-gold-dark'
                }`}
              >
                <span className="flex items-center gap-2">
                  <FiShoppingBag className="w-4 h-4" />
                  {isAddedToCart ? 'Added!' : 'Add to Cart'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    )
  }

  // Minimal variant - compact card
  if (variant === 'minimal') {
    return (
      <Link to={`/product/${product.id}`}>
        <motion.div
          whileHover={{ y: -3 }}
          className="group relative bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-300"
        >
          <div className="relative h-64 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {product.isNew && (
              <span className="absolute top-3 left-3 bg-gold text-black text-xs px-2 py-1 rounded-full">
                NEW
              </span>
            )}
          </div>
          <div className="p-4">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{product.category}</p>
            <h4 className="text-white font-medium mb-2">{product.name}</h4>
            <span className="text-gold font-semibold">${product.price}</span>
          </div>
        </motion.div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-gold/10"
      >
        {/* Image Section */}
        <div className="relative h-72 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Hover Overlay */}
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6"
          >
            <motion.button
              initial={{ y: 20 }}
              animate={{ y: isHovered ? 0 : 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                isAddedToCart
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-black hover:bg-gold'
              }`}
            >
              <span className="flex items-center gap-2">
                <FiShoppingBag className="w-4 h-4" />
                {isAddedToCart ? 'Added to Cart!' : 'Quick Add'}
              </span>
            </motion.button>
          </motion.div>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <span className="bg-emerald-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                NEW
              </span>
            )}
            {product.discount && (
              <span className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-black/50 backdrop-blur-sm text-white hover:bg-white/20'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </motion.button>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">
            {product.category}
          </p>
          <h3 className="text-white text-lg font-semibold mb-2 group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
          
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <div className="flex text-gold text-sm">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(product.rating!) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              {product.reviews && (
                <span className="text-white/40 text-xs">({product.reviews})</span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {discountedPrice ? (
                <>
                  <span className="text-gold text-xl font-bold">${discountedPrice}</span>
                  <span className="text-white/30 text-sm line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-gold text-xl font-bold">${product.price}</span>
              )}
            </div>
            
            <Link 
              to={`/product/${product.id}`}
              className="text-white/50 hover:text-gold transition-colors text-sm flex items-center gap-1"
            >
              Details
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? '100%' : '-100%',
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
        />
      </motion.div>
    </Link>
  )
}

export default ProductCard