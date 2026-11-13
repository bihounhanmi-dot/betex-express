import React from 'react'
import { ArrowRight, MapPin, PackageCheck, Search } from 'lucide-react'
import ImageCarousel from './ImageCarousel'

export default function Hero({ onOpenShipment }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gris pt-28 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 sm:px-6 md:pb-20 lg:grid-cols-2 lg:px-8">
        <div className="relative z-10 py-4">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-rouge/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-rouge">
            <MapPin className="h-4 w-4" /> Livraison · Ouagadougou
          </p>
          <h1 className="max-w-2xl text-5xl font-black leading-[1.02] tracking-tight text-noir sm:text-6xl lg:text-7xl">
            Vos colis.<br /><span className="text-rouge">Notre mission.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-noir/70">
            Faites livrer vos colis simplement et rapidement avec Betex Express, à Ouagadougou.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={onOpenShipment} className="btn-primary-red gap-2 px-6 py-4 text-sm">
              Demander une livraison <ArrowRight className="h-4 w-4" />
            </button>
            <a href="#suivi" className="btn-outline gap-2 px-6 py-4 text-sm">
              <Search className="h-4 w-4" /> Suivre mon colis
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-noir/10 pt-5 text-sm text-noir/65">
            <span className="inline-flex items-center gap-2"><PackageCheck className="h-4 w-4 text-rouge" /> Particuliers & commerçants</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-rouge" /> Tanguin, Ouagadougou</span>
          </div>
        </div>
        <ImageCarousel onOpenShipment={onOpenShipment} />
      </div>
    </section>
  )
}
