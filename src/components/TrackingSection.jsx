import React, { useState } from 'react'
import { Check, Circle, Search, Truck } from 'lucide-react'
import { SHIPMENT_STATUSES } from '../data/shipping'

const DEMO_TRACKING = {
  id: 'BEX-2026-000123',
  status: 'PENDING',
  statusHistory: [{ status: 'PENDING' }],
  pickupLocation: 'Tanguin (exemple)',
  deliveryLocation: 'Ouagadougou (exemple)',
  isDemo: true,
}

const trackingFlow = [
  'PENDING',
  'UNDER_REVIEW',
  'QUOTE_PROPOSED',
  'QUOTE_ACCEPTED',
  'IN_PROGRESS',
  'DELIVERED',
]

const displayStatus = (status) => SHIPMENT_STATUSES.find((item) => item.id === status)?.label || status

export default function TrackingSection({ shipments }) {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [searchedNumber, setSearchedNumber] = useState('')
  const [searched, setSearched] = useState(false)

  const findShipment = (event) => {
    event.preventDefault()
    setSearched(true)
    setSearchedNumber(trackingNumber.trim().toUpperCase())
  }

  const result = searchedNumber === DEMO_TRACKING.id
    ? DEMO_TRACKING
    : shipments.find((shipment) => shipment.id.toUpperCase() === searchedNumber) || null
  const historyIds = new Set((result?.statusHistory || []).map((item) => item.status))
  const activeIndex = trackingFlow.indexOf(result?.status)

  return (
    <section id="suivi" className="scroll-mt-24 bg-noir py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rouge-light">Suivi de colis</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Où en est votre livraison ?</h2>
          <p className="mt-4 leading-7 text-white/65">Saisissez le numéro reçu après une demande pour consulter son statut dans cette session.</p>
          <form onSubmit={findShipment} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="sr-only" htmlFor="tracking-number">Numéro de suivi</label>
            <input id="tracking-number" value={trackingNumber} onChange={(event) => setTrackingNumber(event.target.value)} placeholder="Ex. BEX-2026-000123" className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-rouge-light" />
            <button type="submit" className="btn-primary-red gap-2 px-5 py-3.5 text-sm"><Search className="h-4 w-4" /> Suivre</button>
          </form>
          <button onClick={() => { setTrackingNumber(DEMO_TRACKING.id); setSearchedNumber(DEMO_TRACKING.id); setSearched(true) }} className="mt-3 text-xs font-semibold text-white/55 underline decoration-white/25 underline-offset-4 hover:text-white">
            Voir un exemple de suivi
          </button>
          <p className="mt-5 text-xs leading-5 text-white/45">Le suivi GPS réel nécessite un backend et une intégration avec les opérations de livraison. Cette démonstration n’affiche pas de position en temps réel.</p>
        </div>

        <div className="min-h-64 rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-7">
          {!result && !searched && (
            <div className="flex h-full min-h-52 flex-col items-center justify-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-rouge-light"><Truck className="h-6 w-6" /></span>
              <p className="mt-4 font-semibold">Votre suivi apparaîtra ici</p>
              <p className="mt-1 text-sm text-white/50">Entrez un numéro pour consulter son statut.</p>
            </div>
          )}
          {!result && searched && (
            <div role="status" className="flex h-full min-h-52 flex-col items-center justify-center text-center">
              <p className="font-semibold">Numéro introuvable dans cette démonstration</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/55">Vérifiez le numéro ou contactez Betex Express pour le suivi d’une livraison réelle.</p>
            </div>
          )}
          {result && (
            <div>
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                <div><p className="text-xs text-white/50">Numéro de suivi</p><p className="mt-1 font-mono font-bold text-rouge-light">{result.id}</p></div>
                <span className="rounded-full bg-rouge/15 px-3 py-1.5 text-xs font-bold text-rouge-light">{displayStatus(result.status)}</span>
              </div>
              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <p><span className="block text-xs text-white/45">Lieu de récupération</span><span className="mt-1 block font-medium">{result.pickupLocation}</span></p>
                <p><span className="block text-xs text-white/45">Lieu de livraison</span><span className="mt-1 block font-medium">{result.deliveryLocation}</span></p>
              </div>
              {result.priceProposed != null && (
                <div className="mt-4 rounded-xl bg-white/10 p-3">
                  <p className="text-xs text-white/55">Votre tarif de livraison</p>
                  <p className="mt-1 text-lg font-bold">{Number(result.priceProposed).toLocaleString('fr-FR')} FCFA</p>
                </div>
              )}
              <div className="mt-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/50">Étapes</p>
                <ol className="space-y-2.5">
                  {trackingFlow.map((statusId, index) => {
                    const status = SHIPMENT_STATUSES.find((item) => item.id === statusId)
                    const complete = historyIds.has(statusId)
                    const current = statusId === result.status
                    const reached = index <= activeIndex
                    return (
                      <li key={statusId} className={`flex items-center gap-3 text-sm ${reached ? 'text-white' : 'text-white/35'}`}>
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${complete ? 'bg-rouge text-white' : current ? 'border border-rouge text-rouge-light' : 'border border-white/20'}`}>
                          {complete ? <Check className="h-3 w-3" /> : <Circle className="h-2 w-2" />}
                        </span>
                        <span>{status.label}</span>
                        {current && <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-rouge-light">Statut actuel</span>}
                      </li>
                    )
                  })}
                </ol>
                {result.status === 'CANCELLED' && (
                  <p className="mt-3 rounded-xl bg-rose-500/10 p-3 text-sm font-semibold text-rose-200">{result.customerDecision || displayStatus(result.status)}</p>
                )}
              </div>
              <p className="mt-5 rounded-xl bg-white/5 p-3 text-xs leading-5 text-white/55">{result.isDemo ? 'Données fictives de démonstration — aucun colis réel n’est suivi.' : 'Demande locale à cette session uniquement — statut simulé, sans GPS ni dispatch réel.'}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
