import { motion } from 'framer-motion'
import { FiShield, FiFeather, FiDroplet } from 'react-icons/fi'

const BrandStory = () => {
  const features = [
    {
      icon: FiDroplet,
      title: 'Pure Ingredients',
      description: 'Sourced from the finest natural essences across the globe',
    },
    {
      icon: FiFeather,
      title: 'Artisanal Craft',
      description: 'Each fragrance is meticulously blended by master perfumers',
    },
    {
      icon: FiShield,
      title: 'Sustainable Luxury',
      description: 'Committed to ethical sourcing and eco-friendly practices',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=800&q=80"
                alt="Brand Story"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -right-6 bg-gold text-black p-8 rounded-2xl shadow-2xl"
            >
              <div className="text-3xl font-bold">15+</div>
              <div className="text-sm">Years of<br />Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Heritage</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Essence of
                <br />
                <span className="text-gold">Luxury</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Since 2009, NUVIA PERFUME has been crafting extraordinary fragrances 
                that capture the most precious moments in life. Our master perfumers 
                travel the world in search of the rarest ingredients, ensuring each 
                creation is a masterpiece of olfactory art.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-gold/10 p-3 rounded-lg">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                    <p className="text-white/60">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-black px-8 py-3 rounded-full font-semibold hover:bg-gold-dark transition-all duration-300"
            >
              Discover More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BrandStory;