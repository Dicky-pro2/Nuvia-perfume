import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Collection from './pages/Collection'
import ProductDetails from './pages/ProductDetails'
import Footer from './components/Footer'
import CartProvider from './context/CartContext'
import About from './pages/About'
import Cart from './pages/Cart'
import Journal from './pages/Journal'
import Packaging from './pages/Packaging'
import Account from './pages/Account'
import Checkout from './pages/Checkout'
import JournalArticle from './pages/JournalArticle'

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-black">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/packaging" element={<Packaging />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/journal/:id" element={<JournalArticle />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App