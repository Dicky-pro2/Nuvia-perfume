import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiShoppingBag, FiTrash2, FiMinus, FiPlus, 
  FiArrowLeft, FiTruck, FiShield, FiGift,
  FiChevronRight, FiHeart,
} from 'react-icons/fi'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

// Sample recommended products
const recommendedProducts = [
  {
    id: 1,
    name: 'Midnight Rose',
    category: 'Floral Oriental',
    price: 189,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    reviews: 127,
  },
  {
    id: 3,
    name: 'Velvet Amber',
    category: 'Woody Oriental',
    price: 210,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    reviews: 156,
    discount: 10,
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
  {
    id: 6,
    name: 'Sandalwood Dream',
    category: 'Woody',
    price: 195,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    reviews: 92,
    isNew: true,
  },
]

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoDiscount, setPromoDiscount] = useState(0)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const shipping = cartTotal > 150 ? 0 : 15
  const tax = cartTotal * 0.08
  const discount = promoApplied ? promoDiscount : 0
  const total = cartTotal + shipping + tax - discount

  const handleApplyPromo = () => {
    // Simulate promo code validation
    if (promoCode.toUpperCase() === 'LUXURY20') {
      setPromoDiscount(cartTotal * 0.2)
      setPromoApplied(true)
    } else if (promoCode.toUpperCase() === 'WELCOME10') {
      setPromoDiscount(cartTotal * 0.1)
      setPromoApplied(true)
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false)
      // Navigate to checkout or show success
    }, 2000)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link 
            to="/collection"
            className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-6 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Continue Shopping</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Shopping <span className="text-gold">Bag</span>
          </h1>
          <p className="text-white/40 mt-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your bag
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-8"
            >
              <FiShoppingBag className="w-24 h-24 text-white/10" />
            </motion.div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Your bag is empty</h2>
            <p className="text-white/50 text-lg mb-8 max-w-md mx-auto">
              Discover our collection of luxury fragrances and find your signature scent
            </p>
            
            <Link to="/collection">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-gold-dark transition-all duration-300 inline-flex items-center gap-2"
              >
                Explore Collection
                <FiChevronRight />
              </motion.button>
            </Link>

            {/* Recommended Products */}
            <div className="mt-24">
              <h3 className="text-2xl font-bold text-white mb-8">You Might Like</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, height: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-all duration-500"
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <Link 
                        to={`/product/${item.id}`}
                        className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link 
                              to={`/product/${item.id}`}
                              className="text-white font-semibold text-lg hover:text-gold transition-colors"
                            >
                              {item.name}
                            </Link>
                            <p className="text-white/40 text-sm mt-1">Eau de Parfum • 100ml</p>
                          </div>
                          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-white/30 hover:text-red-500 transition-colors p-2"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center bg-white/5 rounded-full border border-white/10">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-white/60 hover:text-gold transition-colors"
                            >
                              <FiMinus className="w-4 h-4" />
                            </motion.button>
                            
                            <span className="text-white font-semibold w-10 text-center text-sm">
                              {item.quantity}
                            </span>
                            
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-white/60 hover:text-gold transition-colors"
                            >
                              <FiPlus className="w-4 h-4" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="text-gold font-bold text-lg">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-white/40 text-xs">
                                {formatPrice(item.price)} each
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Wishlist & Quick Actions */}
                        <div className="flex gap-4 mt-4 pt-4 border-t border-white/5">
                          <button className="text-white/40 hover:text-gold transition-colors text-sm flex items-center gap-1">
                            <FiHeart className="w-4 h-4" />
                            Save for Later
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link 
                  to="/collection"
                  className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors group"
                >
                  <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                  <span>Continue Shopping</span>
                </Link>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24">
                <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-white/10">
                  <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-white/60">
                      <span>Subtotal</span>
                      <span className="text-white">{formatPrice(cartTotal)}</span>
                    </div>
                    
                    <div className="flex justify-between text-white/60">
                      <span>Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-emerald-400">Free</span>
                      ) : (
                        <span className="text-white">{formatPrice(shipping)}</span>
                      )}
                    </div>
                    
                    <div className="flex justify-between text-white/60">
                      <span>Tax</span>
                      <span className="text-white">{formatPrice(tax)}</span>
                    </div>

                    {promoApplied && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="flex justify-between text-emerald-400"
                      >
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </motion.div>
                    )}

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total</span>
                        <span className="text-gold">{formatPrice(total)}</span>
                      </div>
                      {shipping === 0 && (
                        <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
                          <FiTruck className="w-3 h-3" />
                          You've qualified for free shipping!
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <label className="text-white/60 text-sm mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors text-sm"
                        disabled={promoApplied}
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleApplyPromo}
                        disabled={promoApplied || !promoCode}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                          promoApplied
                            ? 'bg-emerald-500/20 text-emerald-400 cursor-not-allowed'
                            : 'bg-white/10 text-white hover:bg-gold hover:text-black'
                        }`}
                      >
                        {promoApplied ? 'Applied!' : 'Apply'}
                      </motion.button>
                    </div>
                    {promoApplied && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-emerald-400 text-xs mt-2"
                      >
                        Code applied successfully!
                      </motion.p>
                    )}
                    <div className="flex gap-2 mt-2">
                      {['LUXURY20', 'WELCOME10'].map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setPromoCode(code)
                            setPromoApplied(false)
                          }}
                          className="text-white/30 text-xs hover:text-gold transition-colors border border-white/10 rounded-full px-3 py-1"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-gold text-black py-4 rounded-full font-semibold text-lg hover:bg-gold-dark transition-all duration-300 mb-4 flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <FiChevronRight />
                      </>
                    )}
                  </motion.button>

                  {/* Trust Badges */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/40 text-sm">
                      <FiShield className="w-4 h-4 text-gold" />
                      <span>Secure Checkout</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/40 text-sm">
                      <FiTruck className="w-4 h-4 text-gold" />
                      <span>Free Shipping over $150</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/40 text-sm">
                      <FiGift className="w-4 h-4 text-gold" />
                      <span>Complimentary Gift Wrapping</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-white/40 text-xs mb-3">We Accept</p>
                    <div className="flex gap-3">
                      {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map((method) => (
                        <div
                          key={method}
                          className="bg-white/5 rounded-lg px-3 py-2 text-white/30 text-xs font-medium"
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {cartTotal < 150 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 border border-white/10"
                  >
                    <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
                      <FiTruck className="text-gold" />
                      <span>
                        Add {formatPrice(150 - cartTotal)} more for free shipping
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(cartTotal / 150) * 100}%` }}
                        className="h-full bg-gradient-to-r from-gold to-gold-dark rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Recommended Products */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                You Might Also <span className="text-gold">Love</span>
              </h2>
              <p className="text-white/50">Complete your collection with these favorites</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <ProductCard product={product} variant="minimal" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Quick Add Modal */}
      <AnimatePresence>
        {isCheckingOut && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-white/10 max-w-md w-full mx-4 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold text-white mb-2">Processing Order</h3>
              <p className="text-white/50">Please wait while we prepare your checkout...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Cart