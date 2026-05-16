import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiShoppingBag, FiHeart } from 'react-icons/fi'

const products = [
  {
    id: 1,
    name: 'Midnight Rose',
    category: 'Floral Oriental',
    price: 189,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80',
    description: 'A captivating blend of Turkish rose and mysterious oud',
  },
  {
    id: 2,
    name: 'Ocean Breeze',
    category: 'Fresh Aquatic',
    price: 165,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp marine notes with a hint of Mediterranean citrus',
  },
  {
    id: 3,
    name: 'Velvet Amber',
    category: 'Woody Oriental',
    price: 210,
    image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=600&q=80',
    description: 'Warm amber wrapped in creamy sandalwood and vanilla',
  },
  {
    id: 4,
    name: 'Gardenia Bliss',
    category: 'White Floral',
    price: 178,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=600&q=80',
    description: 'Pure gardenia essence with jasmine and white musk',
  },
]

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Selection</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Best Sellers</h3>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Discover our most coveted fragrances, each crafted to perfection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-white/10 group-hover:border-gold/50 transition-all duration-500">
                {/* Product Image */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-gold hover:text-black transition-all duration-300"
                    >
                      <FiHeart className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <p className="text-gold text-xs tracking-[0.2em] uppercase mb-2">{product.category}</p>
                  <h4 className="text-white text-xl font-semibold mb-2 group-hover:text-gold transition-colors duration-300">
                    {product.name}
                  </h4>
                  <p className="text-white/50 text-sm mb-4 leading-relaxed">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-gold text-2xl font-bold">${product.price}</span>
                    <Link to={`/product/${product.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gold text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gold-dark transition-all duration-300 flex items-center gap-2"
                      >
                        <FiShoppingBag className="w-4 h-4" />
                        Explore
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/collection">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gold text-gold px-8 py-3 rounded-full font-semibold hover:bg-gold hover:text-black transition-all duration-300"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProducts