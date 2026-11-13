import React, { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Pause, Play } from 'lucide-react'

const slides = [
  {
    src: '/images/betex-carousel/affiche-betex.jpg',
    alt: 'Livreur Betex Express avec un colis à Ouagadougou',
    title: 'Vos colis, notre priorité.',
    description: 'Une équipe de proximité au service de vos livraisons à Ouagadougou.',
    fit: 'cover',
    position: '72% center',
    label: 'Livraison à Ouagadougou',
  },
  {
    src: '/images/betex-carousel/equipier-moto.jpeg',
    alt: 'Livreur Betex Express avec son sac de livraison',
    title: 'Des livreurs sur le terrain.',
    description: 'Un service de livraison de proximité, au quotidien.',
    fit: 'contain',
    label: 'Notre équipe',
  },
  {
    src: '/images/betex-carousel/livreur-portrait.jpeg',
    alt: 'Livreur Betex Express en polo de travail',
    title: 'Une équipe à votre écoute.',
    description: 'Betex Express vous accompagne pour vos colis dans la ville.',
    fit: 'contain',
    label: 'Betex Express',
  },
  {
    src: '/images/betex-carousel/portrait-equipe.jpeg',
    alt: 'Membre de l’équipe Betex Express',
    title: 'Un service de proximité.',
    description: 'Faites-nous part de votre besoin de livraison en quelques instants.',
    fit: 'contain',
    label: 'À votre service',
  },
  {
    src: '/images/betex-carousel/livreur-en-tournee.jpeg',
    alt: 'Livreur Betex Express avec sa moto dans une rue de Ouagadougou',
    title: 'En route dans Ouagadougou.',
    description: 'Votre colis accompagne nos livreurs sur les routes de la ville.',
    fit: 'contain',
    label: 'En tournée',
  },
  {
    src: '/images/betex-carousel/livreur-avec-sac.jpeg',
    alt: 'Livreur Betex Express équipé de son sac de livraison',
    title: 'Prêts pour vos colis.',
    description: 'De la récupération à la livraison, parlons de votre besoin.',
    fit: 'contain',
    label: 'Vos colis, notre mission',
  },
]

const AUTOPLAY_DELAY = 6000

export default function ImageCarousel({ onOpenShipment }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isInteracting, setIsInteracting] = useState(false)
  const touchStartX = useRef(null)
  const activeSlide = slides[activeIndex]

  useEffect(() => {
    if (isPaused || isInteracting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setActiveIndex((index) => (index + 1) % slides.length)
      }
    }, AUTOPLAY_DELAY)

    return () => window.clearInterval(timer)
  }, [activeIndex, isPaused, isInteracting])

  const showPrevious = () => {
    setActiveIndex((index) => (index - 1 + slides.length) % slides.length)
  }

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % slides.length)
  }

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return

    const distance = event.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(distance) > 40) {
      distance > 0 ? showPrevious() : showNext()
    }
    touchStartX.current = null
  }

  return (
    <section
      className="betex-carousel relative mx-auto w-full max-w-xl overflow-hidden rounded-[2rem] border border-noir/10 bg-white shadow-2xl"
      aria-label="Galerie Betex Express"
      aria-roledescription="carrousel"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onFocusCapture={() => setIsInteracting(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsInteracting(false)
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') showPrevious()
        if (event.key === 'ArrowRight') showNext()
      }}
    >
      <div
        className="betex-carousel-media relative aspect-[1/1] overflow-hidden bg-noir"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === activeIndex ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
            aria-hidden={index !== activeIndex}
            role="group"
            aria-roledescription="diapositive"
            aria-label={`${index + 1} sur ${slides.length}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              draggable="false"
              className={`h-full w-full ${slide.fit === 'contain' ? 'object-contain' : 'object-cover'}`}
              style={{ objectPosition: slide.position || 'center' }}
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-noir/35 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/35 bg-noir/55 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white backdrop-blur-sm sm:left-5 sm:top-5 sm:text-xs">
          <MapPin className="h-3.5 w-3.5 text-rouge-light" />
          {activeSlide.label}
        </span>

        <button
          type="button"
          onClick={showPrevious}
          aria-label="Diapositive précédente"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-noir/50 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-rouge focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-4 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={showNext}
          aria-label="Diapositive suivante"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-noir/50 text-white shadow-lg backdrop-blur transition hover:scale-105 hover:bg-rouge focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-4 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 min-h-[7rem] sm:min-h-[6rem]">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-rouge sm:text-xs">
              Betex Express · {String(activeIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </p>
            <h2 className="mt-1.5 text-lg font-extrabold leading-tight text-noir sm:text-xl">
              {activeSlide.title}
            </h2>
            <p className="mt-1 text-xs leading-5 text-noir/65 sm:text-sm">
              {activeSlide.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsPaused((paused) => !paused)
              setIsInteracting(false)
            }}
            aria-label={isPaused ? 'Reprendre le défilement automatique' : 'Mettre le défilement automatique en pause'}
            className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gris-border text-noir transition hover:border-rouge hover:text-rouge focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge"
          >
            {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-gris-border pt-3">
          <div className="flex items-center gap-1.5" role="group" aria-label="Choisir une diapositive">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Afficher la diapositive ${index + 1} : ${slide.title}`}
                aria-current={index === activeIndex ? 'true' : undefined}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge focus-visible:ring-offset-2 ${
                  index === activeIndex ? 'w-6 bg-rouge' : 'w-2.5 bg-noir/20 hover:bg-rouge/50'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={onOpenShipment}
            className="inline-flex shrink-0 items-center gap-1.5 text-xs font-extrabold uppercase tracking-wide text-rouge transition hover:text-rouge-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-rouge sm:text-sm"
          >
            Demander une livraison <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
