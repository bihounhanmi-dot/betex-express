import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Philosophy() {
  const containerRef = useRef(null)
  const bgImageRef = useRef(null)
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const line3Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to(bgImageRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Staggered reveal of contrasting statements
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from(line1Ref.current, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        .from(
          line2Ref.current,
          {
            y: 45,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          line3Ref.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="philosophie"
      ref={containerRef}
      className="relative w-full py-32 md:py-48 bg-gradient-to-b from-bordeaux-deep to-noir text-white overflow-hidden"
    >
      {/* Parallax Background Organic Texture */}
      <div className="absolute -top-[20%] left-0 w-full h-[140%] pointer-events-none opacity-15 overflow-hidden">
        <img
          ref={bgImageRef}
          src="https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1920&auto=format&fit=crop"
          alt="Parcours logistique"
          className="w-full h-full object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-bordeaux-deep/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 md:px-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-widest mb-10">
          <Sparkles className="w-3.5 h-3.5 text-bordeaux-light" />
          <span>LE MANIFESTE BETEX EXPRESS</span>
        </div>

        {/* Statement 1: Common Approach (Neutral, Smaller) */}
        <div ref={line1Ref} className="max-w-3xl mb-12">
          <p className="font-mono text-xs sm:text-sm tracking-wider text-white/50 uppercase mb-2">
            Constat de l'industrie
          </p>
          <p className="font-sans text-xl sm:text-2xl md:text-3xl font-medium text-white/70 leading-snug">
            « La plupart des services de coursier se concentrent sur : le marchandage informel, l'attente incertaine et des tarifs fixés à la tête du client. »
          </p>
        </div>

        {/* Divider accent line in vivid bordeaux */}
        <div className="w-24 h-[2px] bg-bordeaux-vivid mb-12 shadow-bordeaux-glow"></div>

        {/* Statement 2: Differentiated Approach (Massive, Dramatic Serif Italic) */}
        <div ref={line2Ref} className="max-w-4xl">
          <p className="font-mono text-xs sm:text-sm tracking-wider text-bordeaux-light uppercase mb-3 font-bold">
            Notre doctrine
          </p>
          <h3 className="font-sans font-bold text-2xl sm:text-4xl md:text-5xl text-white leading-tight">
            Nous nous concentrons sur :{' '}
            <span className="block font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-bordeaux-light font-normal tracking-tight mt-3">
              la transparence au kilomètre
            </span>{' '}
            <span className="text-xl sm:text-3xl md:text-4xl font-normal text-white/90 font-sans mt-2 block">
              et l'infaillibilité mathématique du scellé à chaque carrefour de Ouagadougou.
            </span>
          </h3>
        </div>

        {/* Statement 3: Sub-manifesto details */}
        <div
          ref={line3Ref}
          className="mt-16 pt-10 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-8 text-white/70 font-sans text-sm leading-relaxed"
        >
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
              01. Barème Fixe (1 000F / 1 500F)
            </h4>
            <p>
              Aucun supplément caché. Moins de 7 km : 1 000 FCFA. De 7 à 15 km : 1 500 FCFA. La confiance commence par des règles claires.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
              02. Intégrité Scellée
            </h4>
            <p>
              Pochettes scellées numérotées et code OTP envoyé directement au destinataire. Le coursier ne peut jamais ouvrir votre colis.
            </p>
          </div>
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-2">
              03. Télémétrie Sans Latence
            </h4>
            <p>
              Des coursiers équipés de balises actives pour vous informer à chaque étape par SMS et WhatsApp sans intermédiaire.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
