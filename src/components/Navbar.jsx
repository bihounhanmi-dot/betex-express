import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar({ onOpenShipment, onOpenWorkspace }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gris-border py-3'
            : 'bg-white py-4 border-b border-gris-border/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-white p-0.5 border-2 border-rouge shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
              <img
                src="/logo.jpg"
                alt="Logo Betex Express"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black tracking-tight text-xl text-noir leading-none">
                BETEX <span className="text-rouge">EXPRESS</span>
              </span>
              <span className="text-[11px] font-sans font-medium text-gris-text tracking-wide mt-1">
                Livraison à Ouagadougou
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-noir">
            <a href="#hero" className="hover:text-rouge transition-colors">
              Accueil
            </a>
            <a href="#envoyer" className="hover:text-rouge transition-colors">Demander une livraison</a>
            <a href="#tarifs" className="hover:text-rouge transition-colors">Demande de devis</a>
            <a href="#suivi" className="hover:text-rouge transition-colors">Suivre un colis</a>
            <a href="#services" className="hover:text-rouge transition-colors">
              Services
            </a>
            <a href="#entreprises" className="hover:text-rouge transition-colors">Entreprises</a>
            <a href="#contact" className="hover:text-rouge transition-colors">Contact</a>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenWorkspace}
              className="hidden sm:inline-flex text-sm font-semibold text-noir hover:text-rouge"
            >
              Demandes (démo)
            </button>
            <button
              onClick={onOpenShipment}
              className="btn-primary-red px-5 py-2.5 text-xs sm:text-sm tracking-wide cursor-pointer flex items-center gap-1.5"
            >
              <span>Demander une livraison</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-noir hover:bg-gris transition-colors focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl lg:hidden flex flex-col justify-between pt-24 pb-10 px-6 animate-fadeIn">
          <nav className="flex flex-col gap-5 text-lg font-bold text-noir">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gris-border hover:text-rouge"
            >
              Accueil
            </a>
            <a
              href="#tarifs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gris-border hover:text-rouge"
            >
              Demande de devis
            </a>
            <a href="#suivi" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gris-border hover:text-rouge">
              Suivre un colis
            </a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gris-border hover:text-rouge">
              Services
            </a>
            <a href="#entreprises" onClick={() => setMobileMenuOpen(false)} className="py-2 border-b border-gris-border hover:text-rouge">
              Entreprises
            </a>
            <button type="button" onClick={() => { setMobileMenuOpen(false); onOpenWorkspace() }} className="py-2 border-b border-gris-border text-left hover:text-rouge">
              Administration — démo
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-gris-border hover:text-rouge"
            >
              Contact
            </a>
          </nav>

          <div className="space-y-4 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenShipment()
              }}
              className="btn-primary-red w-full py-3.5 text-center text-sm"
            >
              Demander une livraison
            </button>
          </div>
        </div>
      )}
    </>
  )
}
