import React, { useState } from 'react'
import { ArrowRight, MapPin } from 'lucide-react'
import { OUAGADOUGOU_DISTRICTS } from '../data/shipping'

export default function RouteCalculator({ onOpenShipment }) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')

  return (
    <section id="envoyer" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rouge">Créer une livraison</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Demandez votre livraison en quelques secondes.</h2>
            <p className="mt-4 max-w-xl leading-7 text-noir/65">
              Indiquez simplement votre nom, votre WhatsApp et les deux lieux. Betex Express vous contacte pour convenir du tarif.
            </p>
          </div>
          <div className="rounded-3xl border border-gris-border bg-gris/70 p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold">
                <span className="mb-2 flex items-center gap-2"><MapPin className="h-4 w-4 text-rouge" /> Lieu de récupération</span>
                <input type="text" list="route-place-suggestions" value={origin} onChange={(event) => setOrigin(event.target.value)} placeholder="Quartier, adresse ou repère" className="w-full rounded-xl border border-gris-border bg-white px-3 py-3 text-sm focus:border-rouge focus:outline-none" />
              </label>
              <label className="text-sm font-semibold">
                <span className="mb-2 flex items-center gap-2"><MapPin className="h-4 w-4 text-rouge" /> Lieu de livraison</span>
                <input type="text" list="route-place-suggestions" value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Quartier, adresse ou repère" className="w-full rounded-xl border border-gris-border bg-white px-3 py-3 text-sm focus:border-rouge focus:outline-none" />
              </label>
              <datalist id="route-place-suggestions">{OUAGADOUGOU_DISTRICTS.map((place) => <option key={place} value={place} />)}</datalist>
            </div>
            <div className="mt-5 flex flex-col gap-5 rounded-2xl bg-noir p-5 text-white sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/65"><MapPin className="h-4 w-4 text-rouge-light" /> Votre trajet</p>
                <p className="mt-2 text-sm">{origin || 'Lieu de récupération'} <span className="px-1 text-white/40">→</span> {destination || 'Lieu de livraison'}</p>
              </div>
              <div className="max-w-xs rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold sm:text-right">
                Chaque demande reçoit une proposition tarifaire personnalisée.
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-noir/55">Les tarifs sont définis selon les caractéristiques de chaque livraison.</p>
              <button
                onClick={() => onOpenShipment({ pickupLocation: origin, deliveryLocation: destination })}
                className="btn-primary-red shrink-0 gap-2 px-5 py-3 text-sm"
              >
                Demander un devis <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
