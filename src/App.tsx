import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchChanged from './components/SearchChanged'
import Mission from './components/Mission'
import Solution from './components/Solution'
import CTA from './components/CTA'
import Footer from './components/Footer'
import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Navbar />
        <Hero />
        <SearchChanged />
        <Mission />
        <Solution />
        <CTA />
        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App