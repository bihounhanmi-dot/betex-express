import React, { useState, useEffect } from 'react'
import { Navigation, Radio, MapPin, Compass, Shield, Battery, Thermometer, Gauge, CheckCircle2 } from 'lucide-react'

const OUAGA_NODES = [
  { id: 'n1', name: 'Nœud Ouaga 2000', code: 'NOD-2000', x: 62, y: 78, active: true, couriers: 4, etaAvg: '18 min', zone: 'Rayon 0-7 km' },
  { id: 'n2', name: 'Nœud Koulouba (Centre)', code: 'NOD-KLO', x: 48, y: 46, active: true, couriers: 6, etaAvg: '12 min', zone: 'Rayon 0-7 km' },
  { id: 'n3', name: "Nœud Patte d'Oie", code: 'NOD-PDO', x: 38, y: 68, active: true, couriers: 3, etaAvg: '15 min', zone: 'Rayon 0-7 km' },
  { id: 'n4', name: 'Nœud Zone du Bois', code: 'NOD-ZDB', x: 68, y: 40, active: true, couriers: 5, etaAvg: '14 min', zone: 'Rayon 0-7 km' },
  { id: 'n5', name: 'Nœud Cissin / Pissy', code: 'NOD-CIS', x: 26, y: 58, active: true, couriers: 3, etaAvg: '21 min', zone: 'Rayon 7-15 km' },
  { id: 'n6', name: 'Nœud Somgandé / Kossodo', code: 'NOD-SMG', x: 74, y: 22, active: true, couriers: 2, etaAvg: '24 min', zone: 'Rayon 7-15 km' },
  { id: 'n7', name: 'Nœud Aéroport Int.', code: 'NOD-AER', x: 50, y: 60, active: true, couriers: 4, etaAvg: '10 min', zone: 'Rayon 0-7 km' },
]

export default function RadarMap({ onOpenQuote }) {
  const [selectedNode, setSelectedNode] = useState(OUAGA_NODES[0])
  const [activeCourier, setActiveCourier] = useState({
    id: 'BX-402',
    courierName: 'Ibrahim S.',
    route: 'Koulouba → Ouaga 2000',
    distance: '5.8 km',
    rate: '1 000 FCFA',
    speed: '44 km/h',
    battery: '94%',
    temp: '22.8°C',
    sealStatus: 'Intègre & Verrouillé',
    progress: 68,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCourier((prev) => ({
        ...prev,
        speed: `${Math.floor(38 + Math.random() * 12)} km/h`,
        temp: `${(22.4 + Math.random() * 0.8).toFixed(1)}°C`,
        progress: prev.progress >= 95 ? 15 : prev.progress + 4,
      }))
    }, 2800)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="radar" className="py-24 md:py-32 bg-noir text-white relative overflow-hidden">
      {/* Background radar concentric circles */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full border border-bordeaux-light/30 animate-[spin_60s_linear_infinite]" />
        <div className="w-[500px] h-[500px] rounded-full border border-bordeaux/20 absolute" />
        <div className="w-[300px] h-[300px] rounded-full border border-bordeaux/20 absolute" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-mono uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5 text-bordeaux-vivid" />
              <span>RADAR LOGISTIQUE DE OUAGADOUGOU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Cartographie Télémétrique en Direct
            </h2>
            <p className="mt-3 text-white/70 text-base sm:text-lg max-w-2xl font-normal">
              Suivi en temps réel de notre flotte de coursiers déployés sur les 7 nœuds majeurs de Ouagadougou.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-white/70">
            <span className="w-2.5 h-2.5 rounded-full bg-bordeaux-vivid animate-pulse"></span>
            <span>7 NŒUDS ACTIFS • COUVERTURE 100% OUAGA</span>
          </div>
        </div>

        {/* Interactive Radar Grid Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Radar Map Canvas (8 cols) */}
          <div className="lg:col-span-8 bg-noir-muted rounded-[2.5rem] border border-white/10 p-6 sm:p-8 relative min-h-[440px] flex flex-col justify-between overflow-hidden shadow-2xl">

            {/* Top coordinate bar */}
            <div className="flex items-center justify-between text-xs font-mono text-white/60 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white">
                <Radio className="w-4 h-4 text-bordeaux-vivid" />
                <span className="font-bold">SECTEUR METROPOLITAIN OUAGA</span>
              </div>
              <span>GPS: 12.3686° N, 1.5271° W</span>
            </div>

            {/* Radar Map Area with Nodes */}
            <div className="relative w-full h-[320px] sm:h-[380px] my-4 rounded-2xl bg-noir/70 border border-white/5 overflow-hidden">

              {/* Grid lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#FFFFFF_1px,transparent_1px)] [background-size:28px_28px] opacity-15"></div>

              {/* Connecting Vector Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <line x1="48%" y1="46%" x2="62%" y2="78%" stroke="#8B1E2D" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                <line x1="48%" y1="46%" x2="38%" y2="68%" stroke="#C4151C" strokeWidth="1.5" opacity="0.5" />
                <line x1="48%" y1="46%" x2="68%" y2="40%" stroke="#8B1E2D" strokeWidth="1.5" opacity="0.6" />
                <line x1="48%" y1="46%" x2="26%" y2="58%" stroke="#8B1E2D" strokeWidth="1.5" opacity="0.4" />
                <line x1="68%" y1="40%" x2="74%" y2="22%" stroke="#C4151C" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                <line x1="50%" y1="60%" x2="62%" y2="78%" stroke="#8B1E2D" strokeWidth="2" opacity="0.6" />
              </svg>

              {/* Map Nodes */}
              {OUAGA_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none transition-transform duration-300 hover:scale-110 z-20"
                  >
                    <div className="relative flex items-center justify-center">
                      {isSelected && (
                        <span className="absolute w-8 h-8 rounded-full bg-bordeaux-vivid/40 animate-ping"></span>
                      )}
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border transition-all ${isSelected
                            ? 'bg-bordeaux-vivid text-white border-white shadow-bordeaux-glow scale-110'
                            : 'bg-bordeaux text-white border-white/20 group-hover:border-bordeaux-vivid'
                          }`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Node Label Tooltip */}
                    <span
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded text-[10px] font-mono whitespace-nowrap transition-all ${isSelected
                          ? 'bg-bordeaux-vivid text-white font-bold shadow'
                          : 'bg-noir/85 text-white/70 backdrop-blur-sm'
                        }`}
                    >
                      {node.name}
                    </span>
                  </button>
                )
              })}

              {/* Animated Courier Vector Indicator */}
              <div
                className="absolute transition-all duration-1000 ease-out z-30 pointer-events-none"
                style={{
                  left: `${48 + (62 - 48) * (activeCourier.progress / 100)}%`,
                  top: `${46 + (78 - 46) * (activeCourier.progress / 100)}%`,
                }}
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-5 h-5 rounded-full bg-bordeaux-vivid/50 animate-ping absolute"></span>
                  <div className="px-2 py-1 rounded-full bg-bordeaux-vivid text-white font-mono font-black text-[9px] shadow-lg flex items-center gap-1">
                    <Navigation className="w-2.5 h-2.5" />
                    <span>{activeCourier.id}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Status Ticker */}
            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-white/60 pt-3 border-t border-white/10 gap-2">
              <span>NŒUD SÉLECTIONNÉ : <strong className="text-white">{selectedNode.name}</strong></span>
              <span className="text-bordeaux-light font-bold">Zone : {selectedNode.zone} • Délai : {selectedNode.etaAvg}</span>
            </div>

          </div>

          {/* Telemetry Sidebar Card (4 cols) */}
          <div className="lg:col-span-4 bg-gradient-to-b from-bordeaux to-bordeaux-dark text-white rounded-[2.5rem] border border-white/15 p-7 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/15 text-xs font-mono">
                <span className="text-white/80 uppercase">TÉLÉMÉTRIE MISSION</span>
                <span className="px-2.5 py-0.5 rounded-full bg-white text-bordeaux font-black text-[10px]">
                  EN TRANSIT
                </span>
              </div>

              {/* Courier Identity */}
              <div className="py-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-white">
                    {activeCourier.id}
                  </span>
                  <span className="text-xs font-mono text-white/80">
                    {activeCourier.courierName}
                  </span>
                </div>
                <div className="text-sm font-sans font-semibold text-white/95 mt-1 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>{activeCourier.route}</span>
                </div>
                <div className="flex items-center gap-2 mt-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-white font-bold">
                    {activeCourier.distance}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white text-bordeaux font-black">
                    {activeCourier.rate}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-mono text-white/80 mb-1.5">
                  <span>Progression du trajet</span>
                  <span className="font-bold text-white">{activeCourier.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-700"
                    style={{ width: `${activeCourier.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Metric grid */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/85">
                    <Gauge className="w-4 h-4 text-white" />
                    <span>Vitesse moyenne</span>
                  </div>
                  <span className="font-bold text-white">{activeCourier.speed}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/85">
                    <Thermometer className="w-4 h-4 text-white" />
                    <span>Température sacoche</span>
                  </div>
                  <span className="font-bold text-white">{activeCourier.temp}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/85">
                    <Battery className="w-4 h-4 text-emerald-400" />
                    <span>Autonomie balise</span>
                  </div>
                  <span className="font-bold text-emerald-300">{activeCourier.battery}</span>
                </div>

                <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/85">
                    <Shield className="w-4 h-4 text-white" />
                    <span>État du scellé</span>
                  </div>
                  <span className="font-bold text-white text-[11px]">{activeCourier.sealStatus}</span>
                </div>
              </div>

            </div>

            {/* CTA in sidebar */}
            <div className="pt-6 border-t border-white/15 mt-6">
              <button
                onClick={() => onOpenQuote('Assignation Coursier Télémétrique')}
                className="btn-magnetic w-full py-3.5 rounded-full bg-white text-bordeaux font-bold text-xs uppercase tracking-wider shadow-md hover:bg-blanc-soft cursor-pointer group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Associer un coursier à mon colis</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
