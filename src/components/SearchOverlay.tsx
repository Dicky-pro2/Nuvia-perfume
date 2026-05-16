import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FiSearch, FiX, FiTrendingUp, FiClock, 
  FiArrowRight, FiPackage, FiBookOpen
} from 'react-icons/fi'

interface SearchResult {
  id: number
  type: 'product' | 'article' | 'page'
  title: string
  description: string
  image: string
  price?: number
  category?: string
  url: string
}

// Sample search data - in real app, this would come from an API
const searchData: SearchResult[] = [
  {
    id: 1,
    type: 'product',
    title: 'Midnight Rose',
    description: 'A captivating blend of Turkish rose and mysterious oud',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=100&q=80',
    price: 189,
    category: 'Floral Oriental',
    url: '/product/1',
  },
  {
    id: 2,
    type: 'product',
    title: 'Ocean Breeze',
    description: 'Crisp marine notes with a hint of Mediterranean citrus',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=100&q=80',
    price: 165,
    category: 'Fresh Aquatic',
    url: '/product/2',
  },
  {
    id: 3,
    type: 'product',
    title: 'Velvet Amber',
    description: 'Warm amber wrapped in creamy sandalwood and vanilla',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=100&q=80',
    price: 210,
    category: 'Woody Oriental',
    url: '/product/3',
  },
  {
    id: 4,
    type: 'product',
    title: 'Gardenia Bliss',
    description: 'Pure gardenia essence with jasmine and white musk',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=100&q=80',
    price: 178,
    category: 'White Floral',
    url: '/product/4',
  },
  {
    id: 5,
    type: 'product',
    title: 'Citrus Elixir',
    description: 'Zesty citrus blend with warm woody undertones',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=100&q=80',
    price: 155,
    category: 'Fresh Citrus',
    url: '/product/5',
  },
  {
    id: 6,
    type: 'article',
    title: 'The Art of Layering: Creating Your Signature Scent',
    description: 'Discover the sophisticated technique of fragrance layering',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=100&q=80',
    category: 'Fragrance Guide',
    url: '/journal/1',
  },
  {
    id: 7,
    type: 'article',
    title: 'Understanding Fragrance Notes: From Top to Base',
    description: 'A comprehensive guide to understanding the pyramid of fragrance notes',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=100&q=80',
    category: 'Education',
    url: '/journal/2',
  },
  {
    id: 8,
    type: 'page',
    title: 'Our Packaging Collection',
    description: 'Explore our luxury packaging and bottle designs',
    image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=100&q=80',
    category: 'Page',
    url: '/packaging',
  },
  {
    id: 9,
    type: 'page',
    title: 'About L\'Essence',
    description: 'Discover our heritage and craftsmanship',
    image: 'https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=100&q=80',
    category: 'Page',
    url: '/about',
  },
  {
    id: 10,
    type: 'product',
    title: 'Sandalwood Dream',
    description: 'Creamy sandalwood with hints of vanilla and spice',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=100&q=80',
    price: 195,
    category: 'Woody',
    url: '/product/6',
  },
]

const popularSearches = [
  'Rose Fragrance',
  'Oud Perfume',
  'Gift Sets',
  'Summer Scents',
  'Luxury Collection',
]

const recentSearches = [
  'Midnight Rose',
  'Velvet Amber',
  'Travel Size',
]

interface SearchOverlayProps {
  isOpen: boolean
  onClose: () => void
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Focus input when overlay opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            window.location.href = results[selectedIndex].url
            onClose()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, results, onClose])

  // Simulate search with debounce
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setIsLoading(false)
      setSelectedIndex(-1)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product':
        return <FiPackage className="w-4 h-4" />
      case 'article':
        return <FiBookOpen className="w-4 h-4" />
      default:
        return <FiArrowRight className="w-4 h-4" />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-lg"
            onClick={onClose}
          />

          {/* Search Container */}
          <div className="relative z-10 max-w-3xl mx-auto pt-20 px-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {/* Search Input */}
              <div className="relative mb-8">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/40" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search fragrances, articles, and more..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl pl-16 pr-16 py-5 text-white text-lg placeholder-white/30 focus:outline-none focus:border-gold transition-all duration-300"
                />
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuery('')}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </motion.button>
                )}
              </div>

              {/* Search Results */}
              <motion.div
                ref={resultsRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="max-h-[60vh] overflow-y-auto custom-scrollbar"
              >
                {isLoading ? (
                  /* Loading State */
                  <div className="flex items-center justify-center py-12">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full"
                    />
                  </div>
                ) : query.trim() ? (
                  /* Search Results */
                  results.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-white/40 text-sm">
                          {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                        </p>
                      </div>
                      {results.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={result.url}
                            onClick={onClose}
                          >
                            <motion.div
                              whileHover={{ x: 5 }}
                              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group ${
                                index === selectedIndex
                                  ? 'bg-gold/20 border border-gold/50'
                                  : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20'
                              }`}
                            >
                              {/* Image */}
                              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-b from-gray-800 to-gray-900">
                                <img
                                  src={result.image}
                                  alt={result.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                    result.type === 'product'
                                      ? 'bg-emerald-500/20 text-emerald-400'
                                      : result.type === 'article'
                                      ? 'bg-blue-500/20 text-blue-400'
                                      : 'bg-purple-500/20 text-purple-400'
                                  }`}>
                                    {getTypeIcon(result.type)}
                                    {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                                  </span>
                                  {result.category && (
                                    <span className="text-white/30 text-xs">{result.category}</span>
                                  )}
                                </div>
                                <h4 className="text-white font-semibold group-hover:text-gold transition-colors truncate">
                                  {result.title}
                                </h4>
                                <p className="text-white/40 text-sm truncate">{result.description}</p>
                              </div>

                              {/* Price or Arrow */}
                              <div className="flex-shrink-0">
                                {result.price ? (
                                  <span className="text-gold font-bold">{formatPrice(result.price)}</span>
                                ) : (
                                  <FiArrowRight className="w-5 h-5 text-white/30 group-hover:text-gold transition-colors" />
                                )}
                              </div>
                            </motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    /* No Results */
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <FiSearch className="w-12 h-12 text-white/10 mx-auto mb-4" />
                      <p className="text-white/40 text-lg mb-2">No results found</p>
                      <p className="text-white/30 text-sm">
                        Try different keywords or browse our collections
                      </p>
                    </motion.div>
                  )
                ) : (
                  /* Default State - Show suggestions */
                  <div className="space-y-8">
                    {/* Popular Searches */}
                    <div>
                      <h3 className="text-white/40 text-sm font-medium mb-4 flex items-center gap-2">
                        <FiTrendingUp className="w-4 h-4" />
                        Popular Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <motion.button
                            key={term}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setQuery(term)}
                            className="px-4 py-2 rounded-full bg-white/5 text-white/60 hover:bg-gold/20 hover:text-gold border border-white/10 hover:border-gold/50 transition-all duration-300 text-sm"
                          >
                            {term}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Recent Searches */}
                    <div>
                      <h3 className="text-white/40 text-sm font-medium mb-4 flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((term) => (
                          <motion.button
                            key={term}
                            whileHover={{ x: 5 }}
                            onClick={() => setQuery(term)}
                            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-between group"
                          >
                            <span>{term}</span>
                            <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                      <h3 className="text-white/40 text-sm font-medium mb-4">Quick Links</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: 'View Collection', url: '/collection' },
                          { name: 'Best Sellers', url: '/collection?sort=bestsellers' },
                          { name: 'Gift Sets', url: '/collection?category=gifts' },
                          { name: 'New Arrivals', url: '/collection?sort=newest' },
                        ].map((link) => (
                          <Link
                            key={link.name}
                            to={link.url}
                            onClick={onClose}
                          >
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-gold/30 transition-all duration-300 text-white/60 hover:text-gold text-sm font-medium group"
                            >
                              <span className="flex items-center justify-between">
                                {link.name}
                                <FiArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </span>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>

          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="fixed top-8 right-8 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 transition-all duration-300"
          >
            <FiX className="w-6 h-6" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SearchOverlay