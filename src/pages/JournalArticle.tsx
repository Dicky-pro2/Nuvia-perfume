import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { 
  FiArrowLeft, FiClock, FiCalendar, 
  FiTag, FiHeart, FiBookmark, FiShare2,
  FiTwitter, FiFacebook, FiLinkedin,
  FiChevronRight, FiMessageCircle
} from 'react-icons/fi'
import { useState, useEffect } from 'react'

// Full article data - extended from the journal page
const articlesData = [
  {
    id: 1,
    title: 'The Art of Layering: Creating Your Signature Scent',
    excerpt: 'Discover the sophisticated technique of fragrance layering and how to create a unique olfactory signature that is distinctly yours.',
    category: 'Fragrance Guide',
    author: 'Isabella Laurent',
    authorRole: 'Master Perfumer',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorBio: 'With over 25 years of experience in haute parfumerie, Isabella is the founder and master perfumer of L\'Essence.',
    date: '2024-01-20',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80',
    tags: ['Layering', 'Tips', 'Personal Style'],
    likes: 234,
    bookmarks: 89,
    comments: 47,
    content: `
      <p class="lead">Fragrance layering is an art form that allows you to create a scent that is uniquely yours. It's the olfactory equivalent of a bespoke suit—tailored perfectly to your personality, mood, and style.</p>
      
      <h2>Understanding the Basics</h2>
      <p>Before diving into the art of layering, it's essential to understand the foundation. Fragrance layering isn't simply about spraying multiple scents on top of each other. It's a thoughtful process that requires understanding how different notes interact and evolve on your skin.</p>
      
      <p>The key to successful layering lies in understanding fragrance families and how they complement each other. Just as a master chef knows which flavors work together, a fragrance connoisseur understands the delicate balance of notes.</p>
      
      <h3>The Three-Layer Rule</h3>
      <p>Professional perfumers often follow the three-layer rule when creating layered scents:</p>
      <ul>
        <li><strong>Base Layer:</strong> Start with a subtle, warm base. Think vanilla, sandalwood, or musk.</li>
        <li><strong>Middle Layer:</strong> Add complexity with floral or spicy notes like rose, jasmine, or cinnamon.</li>
        <li><strong>Top Layer:</strong> Finish with fresh, citrusy notes like bergamot, lemon, or grapefruit.</li>
      </ul>
      
      <h2>Choosing Your Canvas</h2>
      <p>Every great painting starts with a canvas, and in fragrance layering, your base scent is that canvas. Choose a fragrance that serves as a foundation—something subtle enough to not overpower but distinctive enough to make its presence known.</p>
      
      <p>At L'Essence, we recommend starting with our Velvet Amber as a base. Its warm, woody notes create the perfect foundation for layering, allowing other fragrances to shine while maintaining their own character.</p>
      
      <blockquote>
        "Fragrance layering is like composing music. Each note must harmonize with the others to create a beautiful symphony." — Isabella Laurent
      </blockquote>
      
      <h2>Seasonal Layering Guide</h2>
      <p>The art of layering changes with the seasons. What works in winter may feel overwhelming in summer. Here's your seasonal guide to perfect fragrance layering:</p>
      
      <h3>Spring</h3>
      <p>Spring calls for fresh, green combinations. Layer a light floral like Gardenia Bliss with citrus notes for a refreshing, awakening scent that captures the essence of new beginnings.</p>
      
      <h3>Summer</h3>
      <p>Keep it light and breezy. Combine aquatic notes with subtle coconut or vanilla undertones. Ocean Breeze layered with a touch of vanilla creates a beach-inspired paradise.</p>
      
      <h3>Autumn</h3>
      <p>As the leaves change, so should your scent. Mix warm spices like cinnamon and clove with woody bases. Our Midnight Rose paired with sandalwood creates an enchanting autumn aura.</p>
      
      <h3>Winter</h3>
      <p>Winter is the season for rich, intense combinations. Layer oud with amber and a hint of vanilla for a warm, comforting embrace that lasts through the coldest days.</p>
      
      <h2>Common Mistakes to Avoid</h2>
      <p>Even experienced fragrance enthusiasts can make mistakes when layering. Here are the most common pitfalls:</p>
      
      <ul>
        <li><strong>Too Many Layers:</strong> Stick to 2-3 fragrances maximum. More than that creates olfactory chaos.</li>
        <li><strong>Ignoring Dry-Down:</strong> Always wait for each layer to dry before applying the next.</li>
        <li><strong>Overlooking Skin Chemistry:</strong> What works on paper may not work on your skin. Always test.</li>
        <li><strong>Rushing the Process:</strong> Take your time to discover what truly works for you.</li>
      </ul>
      
      <h2>Creating Your Signature</h2>
      <p>Your signature scent should be as unique as your fingerprint. Start by identifying the notes that resonate with your personality and lifestyle. Are you bold and adventurous? Try spicy oriental combinations. Prefer understated elegance? Stick to clean, fresh florals.</p>
      
      <p>Remember, the goal isn't to smell like anyone else—it's to create something that is authentically you. Your signature scent should tell your story before you even speak a word.</p>
    `,
    relatedArticles: [2, 4, 7],
  },
  {
    id: 2,
    title: 'Understanding Fragrance Notes: From Top to Base',
    excerpt: 'A comprehensive guide to understanding the pyramid of fragrance notes and how they work together to create complex, evolving scents.',
    category: 'Education',
    author: 'Alexander Dubois',
    authorRole: 'Master Distiller',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    authorBio: 'A seventh-generation perfumer from Grasse, Alexander brings centuries of family expertise to every bottle.',
    date: '2024-01-18',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    tags: ['Notes', 'Education', 'Beginner'],
    likes: 187,
    bookmarks: 124,
    comments: 63,
    content: `
      <p class="lead">Every fragrance tells a story, and that story unfolds in chapters. These chapters are what perfumers call "notes"—the individual components that make up a fragrance's composition.</p>
      
      <h2>The Fragrance Pyramid</h2>
      <p>Think of a fragrance like a pyramid with three distinct levels. Each level represents a different phase in the fragrance's life on your skin, and together they create a harmonious olfactory experience.</p>
      
      <h3>Top Notes: The First Impression</h3>
      <p>Top notes are the first thing you smell when you apply a fragrance. They're light, volatile, and evaporate quickly—usually within 15-30 minutes. Common top notes include:</p>
      <ul>
        <li>Citrus: Bergamot, Lemon, Grapefruit</li>
        <li>Herbs: Lavender, Basil, Rosemary</li>
        <li>Light Fruits: Apple, Pear, Berries</li>
      </ul>
      
      <h3>Heart Notes: The Soul of the Fragrance</h3>
      <p>Heart notes emerge as the top notes fade, forming the core of the fragrance. They last 3-5 hours and define the fragrance's character:</p>
      <ul>
        <li>Florals: Rose, Jasmine, Ylang-Ylang</li>
        <li>Spices: Cinnamon, Cardamom, Clove</li>
        <li>Greens: Tea, Grass, Violet Leaf</li>
      </ul>
      
      <h3>Base Notes: The Lasting Impression</h3>
      <p>Base notes are the foundation, appearing once the heart notes begin to fade. They can last 6-12 hours or more:</p>
      <ul>
        <li>Woods: Sandalwood, Cedar, Oud</li>
        <li>Resins: Amber, Frankincense, Myrrh</li>
        <li>Musk and Vanilla</li>
      </ul>
      
      <blockquote>
        "Understanding notes is like learning to read music. Once you know the notes, you can appreciate the symphony." — Alexander Dubois
      </blockquote>
    `,
    relatedArticles: [1, 5, 9],
  },
  {
    id: 3,
    title: 'The Sustainable Future of Luxury Fragrance',
    excerpt: 'How L\'Essence is pioneering eco-friendly practices in the luxury fragrance industry without compromising on quality or elegance.',
    category: 'Sustainability',
    author: 'Sofia Rodriguez',
    authorRole: 'Head of Sustainability',
    authorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    authorBio: 'An environmental scientist turned luxury advocate, Sofia leads our mission to prove that true luxury and sustainability can coexist beautifully.',
    date: '2024-01-15',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=1200&q=80',
    tags: ['Sustainability', 'Eco-Friendly', 'Innovation'],
    likes: 156,
    bookmarks: 67,
    comments: 34,
    content: `
      <p class="lead">In an era where environmental consciousness is paramount, the luxury fragrance industry faces a unique challenge: how to maintain the highest standards of quality while embracing sustainability.</p>
      
      <h2>Our Green Promise</h2>
      <p>At L'Essence, we believe that true luxury and environmental responsibility are not mutually exclusive. Our Green Promise, launched in 2015, commits us to 100% sustainable sourcing and eco-friendly packaging by 2025.</p>
      
      <h3>Sustainable Sourcing</h3>
      <p>We work directly with farmers and distillers around the world to ensure ethical and sustainable practices:</p>
      <ul>
        <li>Fair trade partnerships with local communities</li>
        <li>Organic farming methods</li>
        <li>Biodiversity protection programs</li>
        <li>Water conservation initiatives</li>
      </ul>
      
      <h3>Eco-Friendly Packaging</h3>
      <p>Our packaging revolution includes:</p>
      <ul>
        <li>100% recyclable materials</li>
        <li>Refillable bottle designs</li>
        <li>Biodegradable shipping materials</li>
        <li>Reduced carbon footprint in production</li>
      </ul>
      
      <blockquote>
        "Sustainability isn't a trend—it's our responsibility to future generations." — Sofia Rodriguez
      </blockquote>
    `,
    relatedArticles: [4, 6, 8],
  },
  {
    id: 4,
    title: 'Seasonal Scents: Choosing Fragrances for Every Season',
    excerpt: 'Learn which fragrance families work best for each season and how to transition your scent wardrobe throughout the year.',
    category: 'Style Guide',
    author: 'Marcus Chen',
    authorRole: 'Creative Director',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    authorBio: 'Marcus brings his avant-garde vision from the world of high fashion to L\'Essence.',
    date: '2024-01-12',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=1200&q=80',
    tags: ['Seasons', 'Style', 'Tips'],
    likes: 198,
    bookmarks: 92,
    comments: 41,
    content: `
      <p class="lead">Just as your wardrobe changes with the seasons, so should your fragrance. Each season calls for different notes that complement the weather, your mood, and the occasions that define that time of year.</p>
      
      <h2>Spring Awakening</h2>
      <p>Spring is the season of renewal and freshness. Opt for light, green, and floral fragrances that capture the essence of blooming flowers and fresh-cut grass.</p>
      
      <h3>Recommended Notes:</h3>
      <ul>
        <li>Green notes: Fresh-cut grass, bamboo, green tea</li>
        <li>Light florals: Cherry blossom, lily of the valley, freesia</li>
        <li>Citrus: Bergamot, mandarin, neroli</li>
      </ul>
      
      <h2>Summer Breeze</h2>
      <p>Heat amplifies fragrance, so summer calls for lighter, fresher scents that won't overwhelm.</p>
      
      <h3>Recommended Notes:</h3>
      <ul>
        <li>Aquatic: Sea salt, marine notes, water lily</li>
        <li>Tropical: Coconut, tiare flower, frangipani</li>
        <li>Citrus: Lemon, grapefruit, lime</li>
      </ul>
    `,
    relatedArticles: [1, 7, 9],
  },
  {
    id: 5,
    title: 'The History of Oud: Liquid Gold of the Middle East',
    excerpt: 'Explore the fascinating history of oud, one of the most precious and sought-after ingredients in perfumery.',
    category: 'Heritage',
    author: 'Isabella Laurent',
    authorRole: 'Master Perfumer',
    authorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    authorBio: 'With over 25 years of experience in haute parfumerie, Isabella is the founder and master perfumer of L\'Essence.',
    date: '2024-01-10',
    readTime: '15 min read',
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=80',
    tags: ['History', 'Ingredients', 'Oud'],
    likes: 267,
    bookmarks: 143,
    comments: 58,
    content: `
      <p class="lead">Known as "liquid gold" or "the wood of the gods," oud has captivated humanity for thousands of years. This rare and precious ingredient has a rich history that spans continents and cultures.</p>
      
      <h2>What is Oud?</h2>
      <p>Oud, also known as agarwood, is a dark, fragrant resin that forms in the heartwood of Aquilaria trees when they become infected with a specific type of mold. This natural defense mechanism creates one of the most complex and coveted scents in the world.</p>
      
      <h3>The Rarity Factor</h3>
      <p>Only about 2% of wild Aquilaria trees produce oud naturally, making it one of the rarest and most expensive raw materials in perfumery. Some premium oud oils can cost more than gold by weight.</p>
      
      <h2>Historical Significance</h2>
      <p>Oud has been used for centuries in various cultures:</p>
      <ul>
        <li><strong>Ancient Egypt:</strong> Used in embalming and religious ceremonies</li>
        <li><strong>Islamic Tradition:</strong> Burned as incense in mosques and homes</li>
        <li><strong>Japanese Kodo:</strong> The art of appreciating incense, where oud is highly prized</li>
        <li><strong>Chinese Medicine:</strong> Used for its therapeutic properties</li>
      </ul>
      
      <blockquote>
        "Oud is not just a scent—it's a journey through time, culture, and tradition." — Isabella Laurent
      </blockquote>
    `,
    relatedArticles: [2, 6, 8],
  },
]

const JournalArticle = () => {
  const { id } = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const article = articlesData.find(a => a.id === Number(id))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!article) {
    return (
      <div className="min-h-screen bg-black pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Article Not Found</h2>
          <Link to="/journal" className="text-gold hover:underline">
            Back to Journal
          </Link>
        </div>
      </div>
    )
  }

  const relatedArticles = articlesData.filter(a => 
    article.relatedArticles.includes(a.id)
  )

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Header */}
      <section className="relative pt-20">
        <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="/journal"
                className="inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors mb-6 group"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                <span>Back to Journal</span>
              </Link>

              <div className="flex items-center gap-4 text-white/40 text-sm mb-4">
                <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  {article.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <FiCalendar className="w-3 h-3" />
                  {new Date(article.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {article.title}
              </h1>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={article.authorImage}
                  alt={article.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold/50"
                />
                <div>
                  <p className="text-white font-semibold">{article.author}</p>
                  <p className="text-white/50 text-sm">{article.authorRole}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Social Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 flex lg:flex-col gap-3 items-center lg:items-start">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-red-500'
                  }`}
                >
                  <FiHeart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-3 rounded-full transition-all duration-300 ${
                    isBookmarked
                      ? 'bg-gold text-black'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-gold'
                  }`}
                >
                  <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3 rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </motion.button>

                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute left-14 lg:left-full lg:ml-2 top-0 bg-gray-900 rounded-xl p-2 border border-white/10 shadow-xl flex lg:flex-col gap-2"
                    >
                      {[
                        { icon: FiTwitter, color: 'hover:text-blue-400' },
                        { icon: FiFacebook, color: 'hover:text-blue-600' },
                        { icon: FiLinkedin, color: 'hover:text-blue-500' },
                      ].map((social, i) => (
                        <button
                          key={i}
                          className={`p-2 text-white/60 ${social.color} transition-colors`}
                        >
                          <social.icon className="w-4 h-4" />
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="text-white/30 text-xs lg:text-center lg:mt-2">
                  {article.likes + (isLiked ? 1 : 0)}
                </div>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-8"
            >
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:text-white prose-headings:font-bold
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
                  prose-lead:text-white/90 prose-lead:text-xl prose-lead:font-light
                  prose-strong:text-white prose-strong:font-semibold
                  prose-ul:text-white/70 prose-li:text-white/70
                  prose-li:marker:text-gold
                  prose-blockquote:border-gold prose-blockquote:text-white/60 prose-blockquote:italic prose-blockquote:bg-gold/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                  [&_p.lead]:text-white/90 [&_p.lead]:text-xl [&_p.lead]:font-light [&_p.lead]:mb-8"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <FiTag className="text-gold w-4 h-4" />
                  <span className="text-white/60 text-sm">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/journal?search=${tag}`}
                      className="px-4 py-2 rounded-full bg-white/5 text-white/60 hover:bg-gold/20 hover:text-gold border border-white/10 hover:border-gold/50 transition-all text-sm"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 p-6 bg-gradient-to-r from-gray-900 to-black rounded-2xl border border-white/10">
                <div className="flex items-start gap-4">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gold/50 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-white font-semibold text-lg">{article.author}</h4>
                    <p className="text-gold text-sm mb-2">{article.authorRole}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{article.authorBio}</p>
                  </div>
                </div>
              </div>

              {/* Comments Section Placeholder */}
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FiMessageCircle className="text-gold" />
                    Comments ({article.comments})
                  </h3>
                </div>

                {/* Comment Form */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
                  <h4 className="text-white font-semibold mb-4">Leave a Comment</h4>
                  <textarea
                    placeholder="Share your thoughts..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors resize-none h-32 mb-4"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gold text-black px-6 py-2.5 rounded-full font-semibold hover:bg-gold-dark transition-all"
                  >
                    Post Comment
                  </motion.button>
                </div>

                {/* Sample Comments */}
                <div className="space-y-4">
                  {[
                    { name: 'Michael R.', date: '2 days ago', text: 'This was incredibly informative! I never knew oud had such a rich history.' },
                    { name: 'Elena V.', date: '5 days ago', text: 'Isabella Laurent is truly a master of her craft. Every article she writes is pure gold.' },
                  ].map((comment, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="bg-white/5 rounded-xl p-4 border border-white/5"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center text-gold text-sm font-bold">
                          {comment.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{comment.name}</p>
                          <p className="text-white/30 text-xs">{comment.date}</p>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm">{comment.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="lg:col-span-3 hidden lg:block"
            >
              <div className="sticky top-24 space-y-6">
                <h3 className="text-white font-semibold text-lg">Related Articles</h3>
                {relatedArticles.map((rel) => (
                  <Link key={rel.id} to={`/journal/${rel.id}`}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="group flex gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all"
                    >
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-white text-sm font-medium group-hover:text-gold transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <p className="text-white/40 text-xs mt-1">{rel.readTime}</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}

                {/* Newsletter Card */}
                <div className="bg-gradient-to-br from-gold/10 to-transparent rounded-2xl p-6 border border-gold/20">
                  <h4 className="text-white font-semibold mb-2">Stay Inspired</h4>
                  <p className="text-white/50 text-sm mb-4">
                    Get the latest fragrance stories delivered to your inbox.
                  </p>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-white/20 focus:outline-none focus:border-gold transition-colors mb-3"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gold text-black py-2 rounded-lg font-semibold text-sm hover:bg-gold-dark transition-all"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mobile Related Articles */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900 lg:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-white mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <Link key={rel.id} to={`/journal/${rel.id}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group bg-gradient-to-b from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-gold/30 transition-all"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white font-semibold group-hover:text-gold transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-white/40 text-sm mt-2">{rel.readTime}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Discover More <span className="text-gold">Stories</span>
            </h2>
            <p className="text-white/50 mb-8">
              Explore our complete collection of fragrance insights and guides
            </p>
            <Link to="/journal">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-black px-8 py-3 rounded-full font-semibold hover:bg-gold-dark transition-all inline-flex items-center gap-2"
              >
                View All Articles
                <FiChevronRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default JournalArticle