import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiClock,
  FiSearch, FiBookmark, FiShare2, FiHeart,
  FiCalendar, FiInstagram,
} from 'react-icons/fi'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorRole: string
  authorImage: string
  date: string
  readTime: string
  image: string
  tags: string[]
  featured?: boolean
  likes: number
  bookmarks: number
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Art of Layering: Creating Your Signature Scent',
    excerpt: 'Discover the sophisticated technique of fragrance layering and how to create a unique olfactory signature that is distinctly yours.',
    content: '',
    category: 'Fragrance Guide',
    author: 'Isabella Laurent',
    authorRole: 'Master Perfumer',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-20',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
    tags: ['Layering', 'Tips', 'Personal Style'],
    featured: true,
    likes: 234,
    bookmarks: 89,
  },
  {
    id: 2,
    title: 'Understanding Fragrance Notes: From Top to Base',
    excerpt: 'A comprehensive guide to understanding the pyramid of fragrance notes and how they work together to create complex, evolving scents.',
    content: '',
    category: 'Education',
    author: 'Alexander Dubois',
    authorRole: 'Master Distiller',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-18',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80',
    tags: ['Notes', 'Education', 'Beginner'],
    likes: 187,
    bookmarks: 124,
  },
  {
    id: 3,
    title: 'The Sustainable Future of Luxury Fragrance',
    excerpt: 'How L\'Essence is pioneering eco-friendly practices in the luxury fragrance industry without compromising on quality or elegance.',
    content: '',
    category: 'Sustainability',
    author: 'Sofia Rodriguez',
    authorRole: 'Head of Sustainability',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-15',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=800&q=80',
    tags: ['Sustainability', 'Eco-Friendly', 'Innovation'],
    likes: 156,
    bookmarks: 67,
  },
  {
    id: 4,
    title: 'Seasonal Scents: Choosing Fragrances for Every Season',
    excerpt: 'Learn which fragrance families work best for each season and how to transition your scent wardrobe throughout the year.',
    content: '',
    category: 'Style Guide',
    author: 'Marcus Chen',
    authorRole: 'Creative Director',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-12',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=800&q=80',
    tags: ['Seasons', 'Style', 'Tips'],
    likes: 198,
    bookmarks: 92,
  },
  {
    id: 5,
    title: 'The History of Oud: Liquid Gold of the Middle East',
    excerpt: 'Explore the fascinating history of oud, one of the most precious and sought-after ingredients in perfumery.',
    content: '',
    category: 'Heritage',
    author: 'Isabella Laurent',
    authorRole: 'Master Perfumer',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-10',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=80',
    tags: ['History', 'Ingredients', 'Oud'],
    likes: 267,
    bookmarks: 143,
  },
  {
    id: 6,
    title: 'Behind the Bottle: The Design Philosophy of L\'Essence',
    excerpt: 'Take a closer look at the meticulous design process behind our iconic bottles and packaging.',
    content: '',
    category: 'Design',
    author: 'Marcus Chen',
    authorRole: 'Creative Director',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-08',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=800&q=80',
    tags: ['Design', 'Packaging', 'Art'],
    likes: 145,
    bookmarks: 56,
  },
  {
    id: 7,
    title: 'Fragrance for Every Occasion: Day to Night Guide',
    excerpt: 'Master the art of choosing the perfect fragrance for every occasion, from boardroom meetings to romantic evenings.',
    content: '',
    category: 'Style Guide',
    author: 'Alexander Dubois',
    authorRole: 'Master Distiller',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-05',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    tags: ['Lifestyle', 'Tips', 'Occasions'],
    likes: 176,
    bookmarks: 78,
  },
  {
    id: 8,
    title: 'The Rise of Genderless Fragrances',
    excerpt: 'How modern perfumery is breaking traditional gender boundaries and creating scents for everyone.',
    content: '',
    category: 'Trends',
    author: 'Sofia Rodriguez',
    authorRole: 'Head of Sustainability',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80',
    date: '2024-01-03',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80',
    tags: ['Trends', 'Genderless', 'Modern'],
    likes: 312,
    bookmarks: 167,
  },
  {
    id: 9,
    title: 'Caring for Your Fragrance Collection',
    excerpt: 'Expert tips on how to properly store and preserve your precious fragrances to maintain their quality.',
    content: '',
    category: 'Care Guide',
    author: 'Alexander Dubois',
    authorRole: 'Master Distiller',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    date: '2023-12-28',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=800&q=80',
    tags: ['Care', 'Collection', 'Tips'],
    likes: 123,
    bookmarks: 95,
  },
]

const categories = [
  'All',
  'Fragrance Guide',
  'Education',
  'Sustainability',
  'Style Guide',
  'Heritage',
  'Design',
  'Trends',
  'Care Guide',
]

const popularTags = [
  'Tips', 'Layering', 'Notes', 'Style', 'Sustainability', 
  'History', 'Oud', 'Design', 'Seasons', 'Trends'
]

const Journal = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [bookmarkedPosts, setBookmarkedPosts] = useState<number[]>([])
  const [hoveredPost, setHoveredPost] = useState<number | null>(null)
  const [email, setEmail] = useState('')

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const toggleBookmark = (postId: number) => {
    setBookmarkedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find(post => post.featured)
  const recentPosts = filteredPosts.filter(post => !post.featured)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=2000&q=80"
            alt="Journal Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gold text-sm tracking-[0.3em] uppercase mb-6"
            >
              Stories & Insights
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              The <span className="text-gold">Journal</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-white/60 text-lg md:text-xl max-w-2xl"
            >
              Discover the world of luxury fragrance through stories, guides, 
              and insights from our master perfumers
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className="bg-black border-b border-white/10 sticky top-20 z-30 backdrop-blur-lg bg-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gold text-black font-semibold'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={`/journal/${featuredPost.id}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gradient-to-r from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 group-hover:border-gold/30 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold text-black px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                      <span className="text-gold">{featuredPost.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3 h-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-gold transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-white/60 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={featuredPost.authorImage}
                          alt={featuredPost.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white text-sm font-medium">{featuredPost.author}</p>
                          <p className="text-white/40 text-xs">{featuredPost.authorRole}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-white/40 text-sm">
                        <FiCalendar className="w-3 h-3" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Link>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {recentPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredPost(post.id)}
                  onHoverEnd={() => setHoveredPost(null)}
                  className="group relative"
                >
                  <Link to={`/journal/${post.id}`}>
                    <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 group-hover:border-gold/30 transition-all duration-500 h-full flex flex-col">
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>

                        {/* Quick Actions */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredPost === post.id ? 1 : 0 }}
                          className="absolute top-4 right-4 flex flex-col gap-2"
                        >
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.preventDefault()
                              toggleBookmark(post.id)
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                              bookmarkedPosts.includes(post.id)
                                ? 'bg-gold text-black'
                                : 'bg-white/10 text-white hover:bg-white/20'
                            }`}
                          >
                            <FiBookmark className={`w-4 h-4 ${bookmarkedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                          </motion.button>
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-white/40 text-xs mb-3">
                          <span className="flex items-center gap-1">
                            <FiClock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FiCalendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>

                        <h3 className="text-white text-xl font-semibold mb-3 group-hover:text-gold transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-white/50 text-sm mb-4 leading-relaxed line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-white/30 text-xs bg-white/5 px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Author & Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-white/60 text-sm">{post.author}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.preventDefault()
                                toggleLike(post.id)
                              }}
                              className="flex items-center gap-1 text-white/40 hover:text-red-500 transition-colors"
                            >
                              <FiHeart className={`w-4 h-4 ${likedPosts.includes(post.id) ? 'fill-current text-red-500' : ''}`} />
                              <span className="text-xs">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.preventDefault()
                              }}
                              className="text-white/40 hover:text-white transition-colors"
                            >
                              <FiShare2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white/10 text-white/60 px-8 py-3 rounded-full font-semibold hover:border-gold hover:text-gold transition-all duration-300"
            >
              Load More Articles
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Popular Tags */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-8">Popular Topics</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularTags.map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(tag)}
                  className="px-6 py-3 rounded-full bg-white/5 text-white/60 hover:bg-gold hover:text-black transition-all duration-300 border border-white/10 hover:border-gold"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Stay Inspired</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join Our <span className="text-gold">Community</span>
            </h3>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
              Subscribe to receive the latest articles, exclusive fragrance tips, 
              and behind-the-scenes stories from NUVIA PERFUME, delivered straight to your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-gold transition-colors"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gold text-black px-8 py-4 rounded-full font-semibold hover:bg-gold-dark transition-all duration-300 whitespace-nowrap"
                >
                  Subscribe
                </motion.button>
              </div>
            </form>

            <p className="text-white/40 text-sm mt-6">
              Join 50,000+ fragrance enthusiasts. No spam, ever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Follow Us on <span className="text-gold">Instagram</span>
            </h3>
            <p className="text-white/40">@NUVIA_PERFUME</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: item * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
              >
                <img
                  src={`https://images.unsplash.com/photo-${item === 1 ? '1541643600914-78b084683601' : 
                    item === 2 ? '1592945403244-b3fbafd7f539' :
                    item === 3 ? '1588405748880-12d1d2a59f75' :
                    item === 4 ? '1590736969955-71cc94901144' :
                    item === 5 ? '1563170351-be82bc888aa4' :
                    item === 6 ? '1557174361-f19736f5ca44' :
                    item === 7 ? '1600612253971-422e7f7faeb6' :
                    '1596462502278-27bfdc403348'}?auto=format&fit=crop&w=400&q=80`}
                  alt={`Instagram post ${item}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <FiInstagram className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Journal