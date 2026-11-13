import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2, ShieldCheck, Activity, Cpu } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Protocol({ onOpenQuote }) {
  const containerRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stacking animation pinned with scale down, blur, and opacity fade
      gsap.to(card1Ref.current, {
        scale: 0.9,
        filter: 'blur(20px)',
        opacity: 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card2Ref.current,
          start: 'top 80%',
          end: 'top 15%',
          scrub: true,
        },
      })

      gsap.to(card2Ref.current, {
        scale: 0.9,
        filter: 'blur(20px)',
        opacity: 0.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: card3Ref.current,
          start: 'top 80%',
          end: 'top 15%',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="protocole" ref={containerRef} className="relative bg-blanc-soft py-24 md:py-32 border-t border-bordeaux/10">
      {/* Intro section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 mb-16 md:mb-24">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bordeaux/10 border border-bordeaux/20 text-bordeaux text-xs font-mono uppercase tracking-widest mb-4">
          <Activity className="w-3.5 h-3.5 text-bordeaux-vivid" />
          <span>LE CYCLE DE MISSION BETEX EXPRESS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-noir font-sans max-w-2xl leading-tight">
          Protocole en trois temps : l'archive empilée.
        </h2>
        <p className="mt-4 text-noir/70 text-base sm:text-lg max-w-xl font-normal">
          De la première prise en charge à la signature finale, découvrez la rigueur opératoire d'une course Betex Express.
        </p>
      </div>

      {/* Stacked Cards Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 space-y-12 md:space-y-24">
        
        {/* CARD 01: Rotating geometric pattern */}
        <div
          ref={card1Ref}
          className="sticky top-24 min-h-[520px] md:min-h-[580px] rounded-[3rem] bg-gradient-to-br from-bordeaux to-bordeaux-dark text-white p-8 sm:p-12 md:p-16 border border-white/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden transition-all duration-300"
        >
          {/* Card Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full z-10">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono uppercase tracking-widest mb-6">
                Étape 01 // Phase Alpha
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight leading-tight mb-4">
                Collecte & Scellement Biométrique
              </h3>
              <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal mb-8">
                Prise en charge à votre adresse en moins de 15 minutes. Mise sous pochette hermétique sécurisée et émission d'un scellé numéroté infalsifiable.
              </p>
            </div>

            <div className="pt-6 border-t border-white/20 flex items-center gap-6 font-mono text-xs text-white/80">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                Scan code-barres 2D
              </span>
              <span>Temps d'enlèvement : ~ 4 min</span>
            </div>
          </div>

          {/* Card Right: Canvas / SVG Animation 1 (Rotating Geometric Rings & Orbitals) */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[260px] sm:min-h-[320px]">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Slow Rotating Ring */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full animate-[spin_30s_linear_infinite]"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  opacity="0.4"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="75"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                  strokeDasharray="12 18"
                  opacity="0.8"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="55"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>

              {/* Counter Rotating Inner Helix Elements */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite_reverse]"
              >
                <circle
                  cx="100"
                  cy="100"
                  r="35"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />
                <circle cx="100" cy="25" r="4" fill="#FFFFFF" />
                <circle cx="100" cy="175" r="4" fill="#FFFFFF" />
                <circle cx="25" cy="100" r="3" fill="#FFFFFF" />
                <circle cx="175" cy="100" r="3" fill="#FFFFFF" />
              </svg>

              {/* Center Core Badge */}
              <div className="absolute flex flex-col items-center justify-center w-24 h-24 rounded-full bg-bordeaux-deep border-2 border-white shadow-xl text-white">
                <Cpu className="w-6 h-6 text-white mb-1" />
                <span className="font-mono text-[9px] uppercase tracking-wider font-bold">Scellé #01</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 02: Horizontal scanning laser line moving over point matrix */}
        <div
          ref={card2Ref}
          className="sticky top-28 min-h-[520px] md:min-h-[580px] rounded-[3rem] bg-noir text-white p-8 sm:p-12 md:p-16 border border-white/15 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden transition-all duration-300"
        >
          {/* Card Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full z-10">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-bordeaux/40 text-bordeaux-light text-xs font-mono uppercase tracking-widest mb-6 border border-bordeaux/30">
                Étape 02 // Phase Flux
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight leading-tight mb-4">
                Routage Algorithmique Ouaga-Grid
              </h3>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed font-normal mb-8">
                Algorithme calculant l'itinéraire optimal selon la fluidité des ronds-points stratégiques (Échangeur de l'Est, Rond-Point des Nations Unies, Avenue Babanguida).
              </p>
            </div>

            <div className="pt-6 border-t border-white/20 flex items-center gap-6 font-mono text-xs text-white/70">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-bordeaux-vivid animate-pulse"></span>
                Télémétrie Active
              </span>
              <span>Rayon : 0-7 km (1000F) ou 7-15 km (1500F)</span>
            </div>
          </div>

          {/* Card Right: Canvas / SVG Animation 2 (Laser Line Sweeping over Grid) */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[260px] sm:min-h-[320px]">
            <div className="relative w-full max-w-[340px] h-[240px] rounded-2xl bg-noir-muted border border-white/10 p-5 overflow-hidden shadow-inner">
              {/* Matrix Grid Points */}
              <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-20"></div>

              {/* Waypoints */}
              <div className="absolute top-1/4 left-1/4 flex items-center gap-1.5 text-[10px] font-mono text-bordeaux-vivid">
                <span className="w-2 h-2 rounded-full bg-bordeaux-vivid animate-ping"></span>
                <span>WP-OUAGA-01</span>
              </div>
              <div className="absolute bottom-1/3 right-1/4 flex items-center gap-1.5 text-[10px] font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span>DEST-KLO-09</span>
              </div>

              {/* Sweeping Laser Line in vivid bordeaux */}
              <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-bordeaux-vivid to-transparent shadow-[0_0_15px_#C4151C] animate-laser"></div>

              {/* Telemetry Footer */}
              <div className="absolute bottom-3 inset-x-5 flex justify-between text-[9px] font-mono text-white/50 uppercase border-t border-white/10 pt-2">
                <span>Routage: Av. Bassawarga</span>
                <span>Vitesse: 46 km/h</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 03: Pulsing ECG Waveform */}
        <div
          ref={card3Ref}
          className="sticky top-32 min-h-[520px] md:min-h-[580px] rounded-[3rem] bg-white text-noir p-8 sm:p-12 md:p-16 border border-bordeaux/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden transition-all duration-300"
        >
          {/* Card Left Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-between h-full z-10">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-bordeaux/10 text-bordeaux text-xs font-mono uppercase tracking-widest mb-6 border border-bordeaux/20 font-bold">
                Étape 03 // Phase Oméga
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-sans tracking-tight leading-tight mb-4">
                Remise Certifiée & Signature Tactile
              </h3>
              <p className="text-noir/70 text-base sm:text-lg leading-relaxed font-normal mb-8">
                Déverrouillage par code OTP transmis uniquement au destinataire. Signature électronique horodatée et archivage infalsifiable avec rapport instantané.
              </p>
            </div>

            <div className="pt-6 border-t border-bordeaux/15 flex items-center gap-6 font-mono text-xs text-bordeaux">
              <span className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 text-bordeaux-vivid" />
                Preuve d'émargement légale
              </span>
              <button
                onClick={onOpenQuote}
                className="text-bordeaux-vivid font-black hover:underline cursor-pointer"
              >
                Tester le protocole →
              </button>
            </div>
          </div>

          {/* Card Right: Canvas / SVG Animation 3 (ECG Waveform Stroke Dashoffset) */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[260px] sm:min-h-[320px]">
            <div className="relative w-full max-w-[360px] h-[220px] rounded-2xl bg-bordeaux text-white p-6 flex flex-col justify-between shadow-bordeaux-glow border border-bordeaux-light/30">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  PULSE INTÉGRITÉ SCELLÉ : 100%
                </span>
                <span className="text-[10px] text-white/70">ECG-SENSORS</span>
              </div>

              {/* Pulsing ECG SVG line in crisp white */}
              <div className="w-full py-4 overflow-hidden">
                <svg
                  viewBox="0 0 500 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-20"
                >
                  <path
                    d="M0 50 L120 50 L140 20 L160 80 L180 50 L220 50 L235 5 L255 95 L275 35 L290 65 L305 50 L500 50"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-ecg"
                  />
                </svg>
              </div>

              <div className="flex items-center justify-between font-mono text-[10px] text-white/70 border-t border-white/20 pt-2">
                <span>VALIDATION OTP: ACQUIS</span>
                <span>HORODATAGE: {new Date().toISOString().slice(0, 10)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
