import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiArrowLeft, FiCreditCard, FiTruck, FiGift,
  FiCheck, FiChevronRight, FiShield, FiLock,
  FiMapPin, FiMail, FiPhone, FiUser,
  FiEdit2, FiPlus, FiMinus, FiX
} from 'react-icons/fi'
import { useCart } from '../context/CartContext'

// Sample saved addresses
const savedAddresses = [
  {
    id: 1,
    name: 'Home',
    address: '123 Luxury Lane',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  },
  {
    id: 2,
    name: 'Office',
    address: '456 Business Ave',
    city: 'Manhattan',
    state: 'NY',
    zip: '10002',
    country: 'United States',
  },
]

// Sample saved cards
const savedCards = [
  {
    id: 1,
    brand: 'Visa',
    last4: '4242',
    expiry: '12/26',
    isDefault: true,
  },
  {
    id: 2,
    brand: 'Mastercard',
    last4: '8888',
    expiry: '08/25',
    isDefault: false,
  },
]

type CheckoutStep = 'shipping' | 'payment' | 'review'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isOrderComplete, setIsOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  
  // Shipping state
  const [selectedAddress, setSelectedAddress] = useState(savedAddresses[0].id)
  const [shippingMethod, setShippingMethod] = useState('standard')
  const [showNewAddress, setShowNewAddress] = useState(false)
  const [giftMessage, setGiftMessage] = useState('')
  const [isGift, setIsGift] = useState(false)
  
  // Payment state
  const [selectedCard, setSelectedCard] = useState(savedCards[0].id)
  const [showNewCard, setShowNewCard] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [promoApplied, setPromoApplied] = useState(false)
  
  // New address form
  const [newAddress, setNewAddress] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  })

  const shipping = cartTotal > 150 ? 0 : 15
  const tax = cartTotal * 0.08
  const discount = promoApplied ? cartTotal * 0.1 : 0
  const giftWrap = isGift ? 10 : 0
  const total = cartTotal + shipping + tax + giftWrap - discount

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    const orderNum = 'ORD-' + Date.now().toString().slice(-8)
    setOrderNumber(orderNum)
    setIsProcessing(false)
    setIsOrderComplete(true)
    clearCart()
  }

  const steps: { id: CheckoutStep; label: string; icon: any }[] = [
    { id: 'shipping', label: 'Shipping', icon: FiTruck },
    { id: 'payment', label: 'Payment', icon: FiCreditCard },
    { id: 'review', label: 'Review', icon: FiCheck },
  ]

  // Redirect if cart is empty
  if (cartItems.length === 0 && !isOrderComplete) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <FiGift className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
          <p className="text-white/50 mb-6">Add some fragrances to get started</p>
          <Link to="/collection">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-black px-8 py-3 rounded-full font-semibold"
            >
              Shop Now
            </motion.button>
          </Link>
        </div>
      </div>
    )
  }

  // Order Complete Screen
  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FiCheck className="w-12 h-12 text-emerald-400" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Order <span className="text-gold">Confirmed!</span>
            </h1>
            <p className="text-white/60 text-lg mb-2">
              Thank you for your purchase
            </p>
            <p className="text-white/40 mb-8">
              Order Number: <span className="text-gold font-mono">{orderNumber}</span>
            </p>

            <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-8 mb-8">
              <h3 className="text-white font-semibold mb-4">What's Next?</h3>
              <div className="space-y-4 text-left">
                {[
                  { icon: FiMail, text: 'Confirmation email sent to your email address' },
                  { icon: FiTruck, text: 'You\'ll receive shipping updates via email' },
                  { icon: FiGift, text: 'Expected delivery in 3-5 business days' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-3 text-white/60"
                  >
                    <item.icon className="w-5 h-5 text-gold flex-shrink-0" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold text-black px-8 py-3 rounded-full font-semibold w-full sm:w-auto"
                >
                  Track Order
                </motion.button>
              </Link>
              <Link to="/collection">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:border-gold hover:text-gold transition-all w-full sm:w-auto"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/cart" className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-4 group">
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Cart</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Checkout
          </h1>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center max-w-md mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      currentStep === step.id
                        ? 'bg-gold text-black'
                        : steps.indexOf({ id: currentStep } as typeof step) > index
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white/10 text-white/40'
                    }`}
                  >
                    {steps.indexOf({ id: currentStep } as typeof step) > index ? (
                      <FiCheck className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span className={`text-xs mt-2 hidden md:block ${
                    currentStep === step.id ? 'text-gold' : 'text-white/40'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                    steps.indexOf({ id: currentStep } as typeof step) > index
                      ? 'bg-emerald-500'
                      : 'bg-white/10'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  {/* Saved Addresses */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Shipping Address</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {savedAddresses.map((address) => (
                        <motion.div
                          key={address.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedAddress(address.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedAddress === address.id
                              ? 'border-gold bg-gold/5'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-white font-semibold">{address.name}</h3>
                              <p className="text-white/40 text-sm">{address.address}</p>
                              <p className="text-white/40 text-sm">
                                {address.city}, {address.state} {address.zip}
                              </p>
                            </div>
                            {selectedAddress === address.id && (
                              <FiCheck className="w-5 h-5 text-gold flex-shrink-0" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Add New Address */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowNewAddress(!showNewAddress)}
                      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-xl py-4 text-white/60 hover:border-gold hover:text-gold transition-all"
                    >
                      <FiPlus className="w-5 h-5" />
                      Add New Address
                    </motion.button>

                    <AnimatePresence>
                      {showNewAddress && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 space-y-4 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { label: 'Address Name', value: newAddress.name, key: 'name', placeholder: 'Home / Office' },
                              { label: 'Street Address', value: newAddress.address, key: 'address', placeholder: '123 Main St' },
                              { label: 'City', value: newAddress.city, key: 'city', placeholder: 'New York' },
                              { label: 'State', value: newAddress.state, key: 'state', placeholder: 'NY' },
                              { label: 'ZIP Code', value: newAddress.zip, key: 'zip', placeholder: '10001' },
                            ].map((field) => (
                              <div key={field.key}>
                                <label className="text-white/40 text-xs mb-1 block">{field.label}</label>
                                <input
                                  type="text"
                                  value={field.value}
                                  onChange={(e) => setNewAddress({ ...newAddress, [field.key]: e.target.value })}
                                  placeholder={field.placeholder}
                                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors text-sm"
                                />
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Shipping Method */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Shipping Method</h2>
                    
                    <div className="space-y-3">
                      {[
                        { id: 'standard', name: 'Standard Shipping', time: '5-7 business days', price: shipping === 0 ? 'Free' : formatPrice(15) },
                        { id: 'express', name: 'Express Shipping', time: '2-3 business days', price: formatPrice(25) },
                        { id: 'overnight', name: 'Overnight Shipping', time: 'Next business day', price: formatPrice(45) },
                      ].map((method) => (
                        <motion.div
                          key={method.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setShippingMethod(method.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            shippingMethod === method.id
                              ? 'border-gold bg-gold/5'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              shippingMethod === method.id ? 'border-gold' : 'border-white/30'
                            }`}>
                              {shippingMethod === method.id && (
                                <div className="w-2.5 h-2.5 bg-gold rounded-full" />
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">{method.name}</p>
                              <p className="text-white/40 text-sm">{method.time}</p>
                            </div>
                          </div>
                          <span className="text-white font-semibold">{method.price}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Gift Options */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold">Gift Options</h3>
                        <p className="text-white/40 text-sm">Add a personal touch to your order</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isGift}
                          onChange={(e) => setIsGift(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold" />
                      </label>
                    </div>

                    <AnimatePresence>
                      {isGift && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <textarea
                            value={giftMessage}
                            onChange={(e) => setGiftMessage(e.target.value)}
                            placeholder="Write your gift message..."
                            maxLength={200}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors resize-none h-24"
                          />
                          <p className="text-white/30 text-xs mt-2 text-right">
                            {giftMessage.length}/200 characters
                          </p>
                          <p className="text-gold text-sm mt-2">
                            +{formatPrice(10)} for gift wrapping
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Continue Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setCurrentStep('payment')}
                    className="w-full bg-gold text-black py-4 rounded-xl font-semibold text-lg hover:bg-gold-dark transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <FiChevronRight className="w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Saved Cards */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Payment Method</h2>
                    
                    <div className="space-y-3 mb-6">
                      {savedCards.map((card) => (
                        <motion.div
                          key={card.id}
                          whileHover={{ scale: 1.01 }}
                          onClick={() => setSelectedCard(card.id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                            selectedCard === card.id
                              ? 'border-gold bg-gold/5'
                              : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className="bg-white/10 p-3 rounded-lg">
                              <FiCreditCard className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {card.brand} •••• {card.last4}
                              </p>
                              <p className="text-white/40 text-sm">Expires {card.expiry}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {card.isDefault && (
                              <span className="text-gold text-xs">Default</span>
                            )}
                            {selectedCard === card.id && (
                              <FiCheck className="w-5 h-5 text-gold" />
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowNewCard(!showNewCard)}
                      className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-xl py-4 text-white/60 hover:border-gold hover:text-gold transition-all"
                    >
                      <FiPlus className="w-5 h-5" />
                      Add New Card
                    </motion.button>

                    <AnimatePresence>
                      {showNewCard && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 space-y-4 overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="text-white/40 text-xs mb-1 block">Card Number</label>
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-white/40 text-xs mb-1 block">Expiry Date</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors text-sm"
                              />
                            </div>
                            <div>
                              <label className="text-white/40 text-xs mb-1 block">CVC</label>
                              <input
                                type="text"
                                placeholder="123"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors text-sm"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Billing Address */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <h3 className="text-white font-semibold mb-4">Billing Address</h3>
                    <label className="flex items-center gap-3 text-white/60 cursor-pointer">
                      <input type="checkbox" className="accent-gold w-4 h-4" defaultChecked />
                      Same as shipping address
                    </label>
                  </div>

                  {/* Secure Note */}
                  <div className="flex items-center justify-center gap-2 text-white/30 text-sm">
                    <FiLock className="w-4 h-4" />
                    <span>Secured by 256-bit SSL encryption</span>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep('shipping')}
                      className="flex-1 border border-white/20 text-white py-4 rounded-xl font-semibold hover:border-gold hover:text-gold transition-all"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep('review')}
                      className="flex-1 bg-gold text-black py-4 rounded-xl font-semibold hover:bg-gold-dark transition-all flex items-center justify-center gap-2"
                    >
                      Review Order
                      <FiChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Order Items */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-6">Order Items</h2>
                    
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-4 pb-4 border-b border-white/5 last:border-0">
                          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white font-medium text-sm">{item.name}</h4>
                            <p className="text-white/40 text-xs">Qty: {item.quantity}</p>
                          </div>
                          <span className="text-white font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Summary */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Shipping Address</h3>
                      <button onClick={() => setCurrentStep('shipping')} className="text-gold text-sm hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="flex items-start gap-3 text-white/60">
                      <FiMapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <p>{savedAddresses.find(a => a.id === selectedAddress)?.address}</p>
                        <p>
                          {savedAddresses.find(a => a.id === selectedAddress)?.city},{' '}
                          {savedAddresses.find(a => a.id === selectedAddress)?.state}{' '}
                          {savedAddresses.find(a => a.id === selectedAddress)?.zip}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Payment Method</h3>
                      <button onClick={() => setCurrentStep('payment')} className="text-gold text-sm hover:underline">
                        Edit
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-white/60">
                      <FiCreditCard className="w-5 h-5 text-gold" />
                      <span>
                        {savedCards.find(c => c.id === selectedCard)?.brand} ••••{' '}
                        {savedCards.find(c => c.id === selectedCard)?.last4}
                      </span>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCurrentStep('payment')}
                      className="flex-1 border border-white/20 text-white py-4 rounded-xl font-semibold hover:border-gold hover:text-gold transition-all"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-gold text-black py-4 rounded-xl font-semibold text-lg hover:bg-gold-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
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
                          <FiLock className="w-5 h-5" />
                          Place Order - {formatPrice(total)}
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.name}</p>
                      <p className="text-white/40 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-white/60 text-sm flex-shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pb-6 border-b border-white/10">
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-white/60 text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {isGift && (
                  <div className="flex justify-between text-white/60 text-sm">
                    <span>Gift Wrap</span>
                    <span>{formatPrice(giftWrap)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 text-sm">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center py-4">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-gold font-bold text-xl">{formatPrice(total)}</span>
              </div>

              {/* Promo Code */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                    disabled={promoApplied}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPromoApplied(true)}
                    disabled={promoApplied || !promoCode}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      promoApplied
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-white/10 text-white hover:bg-gold hover:text-black'
                    }`}
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </motion.button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <FiShield className="w-4 h-4 text-gold" />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <FiTruck className="w-4 h-4 text-gold" />
                  <span>Free Shipping over $150</span>
                </div>
                <div className="flex items-center gap-2 text-white/30 text-xs">
                  <FiGift className="w-4 h-4 text-gold" />
                  <span>Easy 30-Day Returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout