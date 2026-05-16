import { motion } from 'framer-motion'
import { 
  FiAward, FiUsers, FiGlobe, FiHeart,
  FiDroplet, FiShield, FiClock, FiStar,
  FiInstagram, FiTwitter, FiFacebook
} from 'react-icons/fi'
import { useState } from 'react'

const About = () => {
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null)

  const stats = [
    { icon: FiClock, value: '15+', label: 'Years of Excellence' },
    { icon: FiGlobe, value: '45+', label: 'Countries Worldwide' },
    { icon: FiUsers, value: '500K+', label: 'Happy Customers' },
    { icon: FiAward, value: '28', label: 'Industry Awards' },
  ]

  const values = [
    {
      icon: FiDroplet,
      title: 'Pure Ingredients',
      description: 'We source only the finest natural essences from sustainable farms across the globe. Each ingredient is carefully selected by our master perfumers.',
      color: 'from-amber-500/20 to-yellow-500/10',
    },
    {
      icon: FiHeart,
      title: 'Artisanal Craft',
      description: 'Every fragrance is handcrafted in small batches, ensuring meticulous attention to detail and uncompromising quality in every bottle.',
      color: 'from-rose-500/20 to-pink-500/10',
    },
    {
      icon: FiShield,
      title: 'Sustainable Luxury',
      description: 'We are committed to environmental responsibility, using eco-friendly packaging and supporting reforestation projects worldwide.',
      color: 'from-emerald-500/20 to-green-500/10',
    },
    {
      icon: FiStar,
      title: 'Timeless Elegance',
      description: 'Our fragrances transcend trends, creating timeless scents that become part of your personal legacy and signature style.',
      color: 'from-purple-500/20 to-violet-500/10',
    },
  ]

  const team = [
    {
      name: 'Isabella Laurent',
      role: 'Founder & Master Perfumer',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bio: 'With over 25 years of experience in haute parfumerie, Isabella trained at the prestigious Grasse Institute of Perfumery before founding L\'Essence.',
      quote: '"Fragrance is the silent language of the soul."',
    },
    {
      name: 'Marcus Chen',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      bio: 'Marcus brings his avant-garde vision from the world of high fashion, ensuring each L\'Essence creation is as visually stunning as it is olfactorily captivating.',
      quote: '"Design is the bridge between art and emotion."',
    },
    {
      name: 'Sofia Rodriguez',
      role: 'Head of Sustainability',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
      bio: 'An environmental scientist turned luxury advocate, Sofia leads our mission to prove that true luxury and sustainability can coexist beautifully.',
      quote: '"Luxury with conscience is the only way forward."',
    },
    {
      name: 'Alexander Dubois',
      role: 'Master Distiller',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bio: 'A seventh-generation perfumer from Grasse, Alexander brings centuries of family expertise to every bottle, combining tradition with innovation.',
      quote: '"Every scent tells a story waiting to be discovered."',
    },
  ]

  const timeline = [
    {
      year: '2009',
      title: 'The Beginning',
      description: 'Isabella Laurent opens the first L\'Essence boutique in Paris, launching with just three signature fragrances.',
    },
    {
      year: '2012',
      title: 'International Expansion',
      description: 'L\'Essence expands to London, New York, and Tokyo, bringing French luxury to the world stage.',
    },
    {
      year: '2015',
      title: 'Sustainability Initiative',
      description: 'Launch of our Green Promise, committing to 100% sustainable sourcing and eco-friendly packaging by 2025.',
    },
    {
      year: '2018',
      title: 'Award Recognition',
      description: 'Named "Perfume House of the Year" at the International Fragrance Awards for the third consecutive year.',
    },
    {
      year: '2021',
      title: 'Digital Revolution',
      description: 'Launch of our innovative virtual scent experience, allowing customers to discover fragrances from home.',
    },
    {
      year: '2024',
      title: 'Global Community',
      description: 'With over 500,000 loyal customers and 45 countries, L\'Essence continues to redefine luxury fragrance.',
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1557174361-f19736f5ca44?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Perfume Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gold text-sm md:text-base tracking-[0.3em] uppercase mb-6"
            >
              Our Heritage
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
            >
              The Art of
              <br />
              <span className="text-gold">Extraordinary</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl"
            >
              Since 2009, L'Essence has been crafting more than just fragrances—we create 
              memories, evoke emotions, and capture the essence of life's most precious moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/50 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-gold rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80"
                  alt="Our Story"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-lg"
              >
                <div className="text-gold text-5xl font-bold mb-2">15+</div>
                <div className="text-white text-lg font-semibold">Years of</div>
                <div className="text-white/60">Excellence</div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                A Legacy of
                <br />
                <span className="text-gold">Olfactory Art</span>
              </h2>
              
              <div className="space-y-4 text-white/60 text-lg leading-relaxed">
                <p>
                  L'Essence was born from a simple yet profound belief: that fragrance has 
                  the power to transform moments into memories. Our founder, Isabella Laurent, 
                  trained at the world-renowned Grasse Institute of Perfumery, where she 
                  mastered the delicate alchemy of scent creation.
                </p>
                <p>
                  What began as a small boutique in the heart of Paris has blossomed into a 
                  global luxury house, yet we've never lost sight of our founding principles. 
                  Each L'Essence fragrance is still crafted with the same meticulous attention 
                  to detail, using only the finest ingredients sourced from ethical producers 
                  around the world.
                </p>
                <p>
                  Today, our master perfumers continue to push the boundaries of fragrance 
                  creation, blending centuries-old traditions with cutting-edge innovation 
                  to create scents that are both timeless and contemporary.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="pt-6"
              >
                <img
                  src="https://images.unsplash.com/photo-1557682223-5b3c2a5d1fc3?auto=format&fit=crop&w=200&q=80"
                  alt="Signature"
                  className="h-16 opacity-50"
                />
                <p className="text-white/40 text-sm mt-2">Isabella Laurent, Founder</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Pillars of <span className="text-gold">L'Essence</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Every decision we make is guided by our unwavering commitment to these core values
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative group bg-gradient-to-br ${value.color} rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl" />
                
                <div className="relative">
                  <div className="bg-white/5 p-4 rounded-xl inline-block mb-6 group-hover:bg-gold/20 transition-all duration-500">
                    <value.icon className="w-8 h-8 text-gold" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                  <p className="text-white/60 leading-relaxed">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-black relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              A Timeline of <span className="text-gold">Excellence</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-gold/50 via-gold to-gold/50" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-gold/30 transition-all duration-300">
                      <span className="text-gold text-sm font-semibold tracking-wider">{item.year}</span>
                      <h3 className="text-white text-xl font-bold mt-2 mb-3">{item.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-2/12 flex justify-center">
                    <motion.div
                      whileHover={{ scale: 1.5 }}
                      className="w-4 h-4 bg-gold rounded-full border-4 border-black relative z-10"
                    />
                  </div>

                  {/* Empty Space */}
                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">The People Behind the Magic</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Meet Our <span className="text-gold">Artisans</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
              Passionate creators dedicated to crafting your perfect fragrance experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveTeamMember(index)}
                onHoverEnd={() => setActiveTeamMember(null)}
                className="group relative"
              >
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-900 to-black border border-white/10 group-hover:border-gold/30 transition-all duration-500">
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Quote Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeTeamMember === index ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center p-6"
                    >
                      <p className="text-white text-center text-lg italic font-light">
                        {member.quote}
                      </p>
                    </motion.div>
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-white text-xl font-semibold mb-1 group-hover:text-gold transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-gold text-sm mb-3">{member.role}</p>
                    <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Social Links */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-gold hover:text-black transition-all duration-300"
                      >
                        <Icon className="w-4 h-4" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-gold text-sm tracking-[0.3em] uppercase">Our Craft</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                The Science of
                <br />
                <span className="text-gold">Perfection</span>
              </h2>
              
              <div className="space-y-4 text-white/60 text-lg leading-relaxed">
                <p>
                  Creating a L'Essence fragrance is a journey that spans continents and 
                  can take years to complete. Our master perfumers travel to remote corners 
                  of the world, building relationships with local farmers and distillers 
                  to source the most exceptional raw materials.
                </p>
                <p>
                  Each ingredient undergoes rigorous quality testing in our Paris laboratory 
                  before being approved for use. A single fragrance may contain over 100 
                  different components, each measured to the microgram to achieve perfect 
                  balance and harmony.
                </p>
                <p>
                  The aging process alone can take up to six months, allowing the notes to 
                  meld and mature into their final, exquisite form. This patience and dedication 
                  to craft is what sets L'Essence apart.
                </p>
              </div>

              {/* Craft Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {[
                  { value: '100+', label: 'Ingredients per fragrance' },
                  { value: '6M', label: 'Aging process' },
                  { value: '3Y', label: 'Average creation time' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl font-bold text-gold mb-2">{stat.value}</div>
                    <div className="text-white/40 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?auto=format&fit=crop&w=400&q=80"
                    alt="Craftsmanship"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80"
                    alt="Ingredients"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden h-64">
                  <img
                    src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&w=400&q=80"
                    alt="Bottling"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden h-48">
                  <img
                    src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=400&q=80"
                    alt="Final Product"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Experience the
              <br />
              <span className="text-gold">L'Essence</span> Difference
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
              Discover your signature scent and become part of our story. 
              Each fragrance is waiting to become part of yours.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold text-black px-10 py-4 rounded-full font-semibold text-lg hover:bg-gold-dark transition-all duration-300"
              >
                Explore Collection
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:border-gold hover:text-gold transition-all duration-300"
              >
                Visit Our Boutique
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About