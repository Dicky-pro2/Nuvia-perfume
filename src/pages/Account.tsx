import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiUser, FiMail, FiLock, FiPhone, FiMapPin,
  FiPackage, FiHeart, FiSettings, FiLogOut,
  FiEdit2, FiCheck, FiX, FiEye, FiEyeOff,
  FiShoppingBag, FiClock, FiChevronRight,
  FiCalendar, FiTruck, FiCreditCard, FiGift
} from 'react-icons/fi'

interface Order {
  id: string
  date: string
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  items: number
  tracking?: string
}

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
  inStock: boolean
}

// Sample data
const sampleOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-20',
    status: 'delivered',
    total: 378,
    items: 2,
    tracking: 'TRK123456789',
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-15',
    status: 'shipped',
    total: 189,
    items: 1,
    tracking: 'TRK987654321',
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-10',
    status: 'processing',
    total: 420,
    items: 3,
  },
]

const sampleWishlist: WishlistItem[] = [
  {
    id: 1,
    name: 'Midnight Rose',
    price: 189,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=200&q=80',
    category: 'Floral Oriental',
    inStock: true,
  },
  {
    id: 3,
    name: 'Velvet Amber',
    price: 210,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=200&q=80',
    category: 'Woody Oriental',
    inStock: true,
  },
  {
    id: 5,
    name: 'Citrus Elixir',
    price: 155,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=200&q=80',
    category: 'Fresh Citrus',
    inStock: false,
  },
]

const Account = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'settings'>('profile')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  
  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('Isabella Laurent')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [address, setAddress] = useState('123 Luxury Lane, New York, NY 10001')

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'orders', label: 'Orders', icon: FiPackage },
    { id: 'wishlist', label: 'Wishlist', icon: FiHeart },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ]

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'processing': return 'bg-yellow-500/20 text-yellow-400'
      case 'shipped': return 'bg-blue-500/20 text-blue-400'
      case 'delivered': return 'bg-emerald-500/20 text-emerald-400'
      case 'cancelled': return 'bg-red-500/20 text-red-400'
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'processing': return FiClock
      case 'shipped': return FiTruck
      case 'delivered': return FiCheck
      case 'cancelled': return FiX
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic
    setIsLoggedIn(true)
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle register logic
    setIsLoggedIn(true)
  }

  // Not logged in - Show Auth Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-md mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="bg-gold/10 p-6 rounded-full inline-block mb-6">
              <FiUser className="w-12 h-12 text-gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {isLogin ? 'Welcome Back' : 'Join L\'Essence'}
            </h1>
            <p className="text-white/50">
              {isLogin ? 'Sign in to access your account' : 'Create an account to get started'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-8 border border-white/10"
          >
            {/* Tab Switcher */}
            <div className="flex bg-white/5 rounded-full p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isLogin ? 'bg-gold text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  !isLogin ? 'bg-gold text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                Register
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                /* Login Form */
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleLogin}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                      >
                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-white/60 cursor-pointer">
                      <input type="checkbox" className="accent-gold" />
                      Remember me
                    </label>
                    <button type="button" className="text-gold hover:text-gold-dark transition-colors">
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gold text-black py-3 rounded-xl font-semibold hover:bg-gold-dark transition-all"
                  >
                    Sign In
                  </motion.button>
                </motion.form>
              ) : (
                /* Register Form */
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleRegister}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Full Name</label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Email Address</label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Password</label>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-12 py-3 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                      >
                        {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="text-white/40 text-xs">
                    By creating an account, you agree to our{' '}
                    <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gold text-black py-3 rounded-xl font-semibold hover:bg-gold-dark transition-all"
                  >
                    Create Account
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900 text-white/40">or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              {['Google', 'Apple', 'Facebook'].map((provider) => (
                <motion.button
                  key={provider}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 border border-white/10 rounded-xl py-3 text-white/60 hover:bg-white/10 hover:text-white transition-all text-sm"
                >
                  {provider}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Logged in - Show Dashboard
  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My <span className="text-gold">Account</span>
          </h1>
          <p className="text-white/40">Welcome back, {name}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            {/* Mobile Tab Selector */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-gold text-black font-semibold'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6 sticky top-24">
              {/* User Avatar */}
              <div className="text-center mb-6 pb-6 border-b border-white/10">
                <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-gold">{name.charAt(0)}</span>
                </div>
                <h3 className="text-white font-semibold">{name}</h3>
                <p className="text-white/40 text-sm">{email}</p>
              </div>

              {/* Nav Links */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 5 }}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? 'bg-gold/20 text-gold font-medium'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                    {tab.id === 'wishlist' && (
                      <span className="ml-auto bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">
                        {sampleWishlist.length}
                      </span>
                    )}
                    {tab.id === 'orders' && (
                      <span className="ml-auto bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full">
                        {sampleOrders.length}
                      </span>
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Logout */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300"
                >
                  <FiLogOut className="w-5 h-5" />
                  Sign Out
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-white">Personal Information</h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                          isEditing
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-white/5 text-white/60 hover:bg-white/10'
                        }`}
                      >
                        {isEditing ? (
                          <>
                            <FiCheck className="w-4 h-4" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <FiEdit2 className="w-4 h-4" />
                            Edit Profile
                          </>
                        )}
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { icon: FiUser, label: 'Full Name', value: name, setter: setName },
                        { icon: FiMail, label: 'Email', value: email, setter: setEmail, type: 'email' },
                        { icon: FiPhone, label: 'Phone', value: phone, setter: setPhone, type: 'tel' },
                        { icon: FiMapPin, label: 'Address', value: address, setter: setAddress },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="text-white/40 text-xs mb-2 block">{field.label}</label>
                          <div className="relative">
                            <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
                            <input
                              type={field.type || 'text'}
                              value={field.value}
                              onChange={(e) => field.setter(e.target.value)}
                              disabled={!isEditing}
                              className={`w-full bg-white/5 border rounded-xl pl-12 pr-4 py-3 text-white transition-all ${
                                isEditing
                                  ? 'border-gold/50 focus:border-gold'
                                  : 'border-white/10 cursor-default'
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: FiPackage, label: 'Orders', value: sampleOrders.length },
                      { icon: FiHeart, label: 'Wishlist', value: sampleWishlist.length },
                      { icon: FiGift, label: 'Rewards', value: '250 pts' },
                      { icon: FiCreditCard, label: 'Saved Cards', value: '2' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/10 text-center">
                        <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                        <div className="text-white font-bold text-lg">{stat.value}</div>
                        <div className="text-white/40 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Order History</h2>
                  
                  {sampleOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all group cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="bg-gold/10 p-3 rounded-xl">
                            <FiShoppingBag className="w-6 h-6 text-gold" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-white font-semibold">{order.id}</h3>
                              <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                                {(() => {
                                  const StatusIcon = getStatusIcon(order.status)
                                  return <StatusIcon className="w-3 h-3" />
                                })()}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-white/40 text-sm">
                              <span className="flex items-center gap-1">
                                <FiCalendar className="w-3 h-3" />
                                {order.date}
                              </span>
                              <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
                              {order.tracking && (
                                <span className="flex items-center gap-1">
                                  <FiTruck className="w-3 h-3" />
                                  {order.tracking}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="text-gold font-bold text-lg">{formatPrice(order.total)}</span>
                          <FiChevronRight className="w-5 h-5 text-white/20 group-hover:text-gold transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {sampleOrders.length === 0 && (
                    <div className="text-center py-16">
                      <FiPackage className="w-16 h-16 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40 text-lg">No orders yet</p>
                      <Link to="/collection" className="text-gold hover:underline text-sm mt-2 inline-block">
                        Start shopping
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Wishlist Tab */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl font-bold text-white mb-6">My Wishlist</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sampleWishlist.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-4 flex gap-4 hover:border-white/20 transition-all group"
                      >
                        <Link to={`/product/${item.id}`} className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`} className="text-white font-semibold hover:text-gold transition-colors text-sm">
                            {item.name}
                          </Link>
                          <p className="text-white/40 text-xs mb-2">{item.category}</p>
                          <span className="text-gold font-bold text-sm">{formatPrice(item.price)}</span>
                          <div className="mt-2">
                            {item.inStock ? (
                              <span className="text-emerald-400 text-xs flex items-center gap-1">
                                <FiCheck className="w-3 h-3" /> In Stock
                              </span>
                            ) : (
                              <span className="text-red-400 text-xs flex items-center gap-1">
                                <FiX className="w-3 h-3" /> Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                        <button className="text-white/30 hover:text-red-500 transition-colors self-start">
                          <FiX className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {sampleWishlist.length === 0 && (
                    <div className="text-center py-16">
                      <FiHeart className="w-16 h-16 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40 text-lg">Your wishlist is empty</p>
                      <Link to="/collection" className="text-gold hover:underline text-sm mt-2 inline-block">
                        Discover fragrances
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
                  
                  {/* Notification Settings */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/10 p-6">
                    <h3 className="text-white font-semibold mb-4">Notifications</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Order updates', desc: 'Get notified about your order status' },
                        { label: 'Promotions & offers', desc: 'Receive exclusive deals and discounts' },
                        { label: 'New arrivals', desc: 'Be the first to know about new collections' },
                        { label: 'Newsletter', desc: 'Weekly fragrance tips and stories' },
                      ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-2">
                          <div>
                            <p className="text-white text-sm">{item.label}</p>
                            <p className="text-white/40 text-xs">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold" />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-red-500/20 p-6">
                    <h3 className="text-red-400 font-semibold mb-2">Danger Zone</h3>
                    <p className="text-white/40 text-sm mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border border-red-500/50 text-red-400 px-6 py-2 rounded-full text-sm hover:bg-red-500/10 transition-all"
                    >
                      Delete Account
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile Logout Button */}
        <div className="lg:hidden mt-8">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 py-4 rounded-xl font-medium"
          >
            <FiLogOut className="w-5 h-5" />
            Sign Out
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Account