import React, { useState, useEffect } from 'react'
import { 
  Zap, 
  Radio, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  Cpu, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react'

// --- ARTIFACT 1: Mélangeur Diagnostique ---
function DiagnosticShuffler() {
  const initialCards = [
    {
      id: 'BX-801',
      source: 'Ouaga 2000',
      dest: 'Patte d’Oie',
      dist: '4.8 km',
      rate: '1 000 FCFA',
      eta: '22 min',
      status: 'Rayon 0-7 km (Zone 1)',
      tag: 'Tarif 1 000F',
      color: 'border-bordeaux/30 bg-white text-noir',
    },
    {
      id: 'BX-802',
      source: 'Koulouba',
      dest: 'Zone du Bois',
      dist: '6.2 km',
      rate: '1 000 FCFA',
      eta: '28 min',
      status: 'Rayon 0-7 km (Zone 1)',
      tag: 'Tarif 1 000F',
      color: 'border-bordeaux/20 bg-blanc-soft text-noir',
    },
    {
      id: 'BX-803',
      source: 'Ouaga 2000',
      dest: 'Somgandé',
      dist: '13.5 km',
      rate: '1 500 FCFA',
      eta: '38 min',
      status: 'Rayon 7-15 km (Grand Ouaga)',
      tag: 'Tarif 1 500F',
      color: 'border-bordeaux bg-gradient-to-r from-bordeaux to-bordeaux-dark text-white',
    },
  ]

  const [cards, setCards] = useState(initialCards)

  useEffect(() => {
    const timer = setInterval(() => {
      setCards((prev) => {
        const next = [...prev]
        const last = next.pop()
        if (last) next.unshift(last)
        return next
      })
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[270px] flex items-center justify-center overflow-hidden py-4">
      <div className="relative w-full max-w-[340px] h-[210px]">
        {cards.map((item, index) => {
          const translateY = index * 16
          const scale = 1 - index * 0.05
          const opacity = 1 - index * 0.22
          const zIndex = 30 - index * 10
          const isDark = item.color.includes('text-white')

          return (
            <div
              key={item.id}
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                transition: 'all 0.85s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
              className={`absolute inset-x-0 top-0 p-4 rounded-[1.75rem] border ${item.color} shadow-lg backdrop-blur-md transition-all`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-current/15 text-xs font-mono">
                <span className="font-bold flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isDark ? 'bg-white' : 'bg-bordeaux-vivid'} animate-pulse`}></span>
                  {item.id}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-sans font-extrabold ${
                  isDark ? 'bg-white text-bordeaux' : 'bg-bordeaux/10 text-bordeaux'
                }`}>
                  {item.tag}
                </span>
              </div>

              <div className="py-2.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-bordeaux-vivid" />
                    <span>{item.source}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60" />
                  <div className="flex items-center gap-1">
                    <Navigation className="w-3.5 h-3.5 text-bordeaux-vivid" />
                    <span>{item.dest}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-current/15 text-xs">
                <span className="opacity-75 flex items-center gap-1 font-sans text-[11px]">
                  <Clock className="w-3 h-3" />
                  {item.dist} • {item.eta}
                </span>
                <span className="font-mono font-black text-sm">
                  {item.rate}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- ARTIFACT 2: Machine à Écrire Télémétrie ---
function TelemetryTypewriter() {
  const telemetryLogs = [
    '> REQ_INIT: Course assignée au départ de Koulouba.',
    '> DISTANCE: Trajet mesuré à 5.4 km (Tranche 1 000 FCFA).',
    '> GEO_LOCK: Coursier #BX-18 en route via Av. Bassawarga.',
    '> SENSOR: Sacoche isotherme et scellé inviolable nominaux.',
    '> TELEMETRY: ETA estimée 21 min • 0 encombrement détecté.',
    '> DESTINATION: Remise contre code OTP à Ouaga 2000.',
  ]

  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullLine = telemetryLogs[currentLineIndex]
    let timeout

    if (!isDeleting) {
      if (displayText.length < currentFullLine.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullLine.slice(0, displayText.length + 1))
        }, 32)
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true)
        }, 1800)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -2))
        }, 16)
      } else {
        setIsDeleting(false)
        setCurrentLineIndex((prev) => (prev + 1) % telemetryLogs.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentLineIndex])

  return (
    <div className="w-full flex flex-col rounded-[1.75rem] bg-noir text-white p-5 border border-bordeaux/30 shadow-inner font-mono text-xs">
      {/* Telemetry Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bordeaux-vivid opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-bordeaux-vivid"></span>
          </span>
          <span className="text-[11px] font-bold text-white tracking-wider">
            FLUX EN DIRECT • BX-TÉLÉMÉTRIE
          </span>
        </div>
        <span className="text-[10px] text-white/50 uppercase">CANAL SEC-04</span>
      </div>

      {/* Telemetry Output Window */}
      <div className="min-h-[140px] flex flex-col justify-between py-1">
        <div className="space-y-1.5 text-white/70 text-[11px]">
          <p className="opacity-40">&gt; KERNEL_STABLE • LAT 12.3686° LONG -1.5271°</p>
          <p className="opacity-60">&gt; FLOTTE EN SERVICE: 24 COURSIERS EN TRANSIT</p>
          <p className="text-white font-medium leading-relaxed min-h-[40px] text-xs">
            {displayText}
            <span className="inline-block w-2 h-4 ml-1 bg-bordeaux-vivid animate-pulse align-middle"></span>
          </p>
        </div>

        <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-white/60">
          <span>LATENCE: 12ms</span>
          <span className="text-emerald-400 font-bold">100% SCELLÉ</span>
          <span>OUAGADOUGOU CLOUD</span>
        </div>
      </div>
    </div>
  )
}

// --- ARTIFACT 3: Planificateur Protocole Curseur ---
function CursorProtocolScheduler() {
  const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
  const [selectedDayIndex, setSelectedDayIndex] = useState(2) // Default Wednesday
  const [isClicking, setIsClicking] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 30, y: 40 })

  useEffect(() => {
    let interval

    const runSequence = () => {
      setCursorPos({ x: 195, y: 55 })
      setIsClicking(false)
      setIsSaved(false)

      setTimeout(() => {
        setIsClicking(true)
        setSelectedDayIndex(4)

        setTimeout(() => {
          setIsClicking(false)
          setCursorPos({ x: 150, y: 150 })

          setTimeout(() => {
            setIsClicking(true)
            setIsSaved(true)

            setTimeout(() => {
              setIsClicking(false)
              setTimeout(() => {
                setCursorPos({ x: 105, y: 55 })
                setSelectedDayIndex(2)
                setIsSaved(false)
              }, 1200)
            }, 400)
          }, 700)
        }, 350)
      }, 700)
    }

    interval = setInterval(runSequence, 4500)
    runSequence()

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full rounded-[1.75rem] bg-white p-5 border border-bordeaux/15 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-bordeaux/10">
        <span className="text-xs font-mono font-bold text-bordeaux flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-bordeaux-vivid" />
          CALENDRIER D'EXPÉDITION SCELLÉE
        </span>
        <span className="text-[10px] font-mono text-noir/50">PROT-2026</span>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-4 relative z-0">
        {days.map((d, index) => {
          const isSelected = selectedDayIndex === index
          return (
            <div
              key={index}
              style={{
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              className={`flex flex-col items-center justify-center py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                isSelected
                  ? 'bg-bordeaux text-white shadow-bordeaux-glow scale-105'
                  : 'bg-blanc-soft text-noir/70 hover:bg-blanc-muted'
              }`}
            >
              <span className="text-[10px] opacity-75">{d}</span>
              <span className="text-xs mt-0.5">{14 + index}</span>
            </div>
          )
        })}
      </div>

      {/* Time slots preview */}
      <div className="bg-blanc-soft rounded-xl p-2.5 mb-4 text-[11px] font-mono flex items-center justify-between text-noir/80 border border-bordeaux/10">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Créneau Matin : 08h30 - 10h00
        </span>
        <span className="font-bold text-bordeaux">Scellé #889</span>
      </div>

      {/* Save Button */}
      <button
        style={{
          transform: isClicking && cursorPos.y > 100 ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.15s ease',
        }}
        className={`w-full py-2.5 rounded-xl font-sans font-bold text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 ${
          isSaved
            ? 'bg-bordeaux-dark text-white'
            : 'bg-noir text-white hover:bg-bordeaux'
        }`}
      >
        {isSaved ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Créneau Verrouillé & Scellé</span>
          </>
        ) : (
          <span>Sauvegarder le protocole</span>
        )}
      </button>

      {/* Animated SVG Cursor */}
      <div
        className="pointer-events-none absolute z-20 transition-all duration-700 ease-out"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: isClicking ? 'scale(0.85)' : 'scale(1)',
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path
            d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.88c.45 0 .67-.54.35-.85L5.5 3.21z"
            fill="#8B1E2D"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  )
}

// --- MAIN FEATURES SECTION ---
export default function Features({ onOpenQuote }) {
  return (
    <section id="fonctionnalites" className="py-24 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bordeaux/10 text-bordeaux text-xs font-mono uppercase tracking-wider mb-4 border border-bordeaux/20">
            <Layers className="w-3.5 h-3.5 text-bordeaux-vivid" />
            <span>ARTEFACTS OPÉRATIONNELS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-noir leading-tight font-sans">
            Trois instruments de précision pour régir vos courses.
          </h2>
          <p className="mt-4 text-noir/70 text-base sm:text-lg font-normal leading-relaxed">
            Betex Express associe tarification stricte au kilomètre, traçabilité par satellite et scellé physique numéroté pour garantir le zéro défaut.
          </p>
        </div>

        {/* 3 Interactive Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Diagnostic Shuffler */}
          <div className="bg-blanc-soft rounded-[2.5rem] p-7 md:p-8 border border-bordeaux/15 shadow-sm flex flex-col justify-between hover:shadow-bordeaux-card transition-shadow duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-bordeaux">01 / CADENCE & DISTANCE</span>
                <span className="w-8 h-8 rounded-full bg-bordeaux/10 text-bordeaux flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-noir tracking-tight mb-2 font-sans">
                Mélangeur de Délais Éclair
              </h3>
              <p className="text-sm text-noir/70 leading-relaxed mb-6 font-normal">
                Visualisez nos courses actives : 1 000 FCFA dans un rayon de 7 km, 1 500 FCFA de 7 à 15 km dans Ouagadougou.
              </p>
            </div>

            <div className="my-2">
              <DiagnosticShuffler />
            </div>

            <div className="pt-4 border-t border-bordeaux/10 flex items-center justify-between text-xs font-mono text-bordeaux">
              <span>Cadence : &lt; 35 min</span>
              <button
                onClick={onOpenQuote}
                className="text-bordeaux-vivid font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Calculer mon trajet</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Card 2: Telemetry Typewriter */}
          <div className="bg-blanc-soft rounded-[2.5rem] p-7 md:p-8 border border-bordeaux/15 shadow-sm flex flex-col justify-between hover:shadow-bordeaux-card transition-shadow duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-bordeaux">02 / FIABILITÉ TÉLÉMÉTRIQUE</span>
                <span className="w-8 h-8 rounded-full bg-bordeaux/10 text-bordeaux flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-noir tracking-tight mb-2 font-sans">
                Télémétrie en Direct
              </h3>
              <p className="text-sm text-noir/70 leading-relaxed mb-6 font-normal">
                Suivi télémétrique continu par capteur embarqué. Zéro perte, zéro zone d'ombre à travers toute la capitale.
              </p>
            </div>

            <div className="my-2">
              <TelemetryTypewriter />
            </div>

            <div className="pt-4 border-t border-bordeaux/10 flex items-center justify-between text-xs font-mono text-bordeaux">
              <span>Précision GPS : 1.2 m</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Signal 100% stable
              </span>
            </div>
          </div>

          {/* Card 3: Cursor Protocol Scheduler */}
          <div className="bg-blanc-soft rounded-[2.5rem] p-7 md:p-8 border border-bordeaux/15 shadow-sm flex flex-col justify-between hover:shadow-bordeaux-card transition-shadow duration-500">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-bordeaux">03 / SCELLÉ INVIOLABLE</span>
                <span className="w-8 h-8 rounded-full bg-bordeaux/10 text-bordeaux flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-noir tracking-tight mb-2 font-sans">
                Planificateur Scellé
              </h3>
              <p className="text-sm text-noir/70 leading-relaxed mb-6 font-normal">
                Verrouillez vos livraisons programmées sous scellé numéroté avec remise certifiée contre signature.
              </p>
            </div>

            <div className="my-2">
              <CursorProtocolScheduler />
            </div>

            <div className="pt-4 border-t border-bordeaux/10 flex items-center justify-between text-xs font-mono text-bordeaux">
              <span>Code OTP Unique</span>
              <button
                onClick={onOpenQuote}
                className="text-bordeaux-vivid font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Programmer un envoi</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
