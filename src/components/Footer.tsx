import { Link } from 'react-router-dom'
import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi'

const Footer = () => {
  const socialLinks = [
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiFacebook, href: '#', label: 'Facebook' },
    { icon: FiYoutube, href: '#', label: 'Youtube' },
  ]

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-bold tracking-widest">
              <span className="text-gold">NUVIA</span>
              <span className="text-white">PERFUME</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed">
              Crafting extraordinary fragrances that capture the essence of luxury 
              and sophistication since 2009.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-white/50 hover:text-gold transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-6">Shop</h4>
            <ul className="space-y-3">
              {[
                { name: 'All Products', path: '/collection' },
                { name: 'New Arrivals', path: '/collection' },
                { name: 'Best Sellers', path: '/collection' },
                { name: 'Gift Sets', path: '/collection' },
                { name: 'Packaging', path: '/packaging' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-white/50 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-white font-semibold mb-6">About</h4>
            <ul className="space-y-3">
              {[
                { name: 'Our Story', path: '/about' },
                { name: 'Craftsmanship', path: '/packaging' },
                { name: 'Sustainability', path: '/about' },
                { name: 'Journal', path: '/journal' },
                { name: 'Careers', path: '/about' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-white/50 hover:text-gold transition-colors text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-3 text-white/50 text-sm">
              <li>contact@nuviaperfume.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Luxury Lane</li>
              <li>New York, NY 10001</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/30 text-sm">© 2024 NUVIA PERFUME. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/30 hover:text-gold text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-white/30 hover:text-gold text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer