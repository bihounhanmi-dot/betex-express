import React, { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, X } from 'lucide-react'
import { OUAGADOUGOU_DISTRICTS } from '../data/shipping'

const initialForm = {
  name: '',
  whatsapp: '',
  pickupLocation: '',
  deliveryLocation: '',
}

const inputClass = 'w-full rounded-xl border border-gris-border bg-white px-4 py-3.5 text-sm text-noir outline-none transition placeholder:text-noir/35 focus:border-rouge focus:ring-2 focus:ring-rouge/10'

function Field({ id, label, children }) {
  return (
    <label htmlFor={id} className="block text-sm font-semibold text-noir">
      <span className="mb-2 block">{label}</span>
      {children}
    </label>
  )
}

export default function ShipmentFlow({ isOpen, defaults = {}, onClose, onCreated }) {
  const [form, setForm] = useState(initialForm)
  const [createdShipment, setCreatedShipment] = useState(null)

  useEffect(() => {
    if (!isOpen) return
    setForm({
      ...initialForm,
      pickupLocation: defaults.pickupLocation || defaults.origin || '',
      deliveryLocation: defaults.deliveryLocation || defaults.destination || '',
    })
    setCreatedShipment(null)
  }, [isOpen, defaults])

  useEffect(() => {
    if (!isOpen) return undefined
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const submitRequest = (event) => {
    event.preventDefault()
    const now = new Date().toISOString()
    const savedRequest = onCreated({
      ...form,
      status: 'PENDING',
      priceProposed: null,
      agreedPrice: null,
      priceHistory: [],
      statusHistory: [{ status: 'PENDING', at: now }],
      createdAt: now,
      isDemo: true,
    })
    setCreatedShipment(savedRequest)
  }

  const whatsappText = createdShipment
    ? `Bonjour Betex Express, voici ma demande de livraison ${createdShipment.id}.\nNom : ${createdShipment.name}\nWhatsApp : ${createdShipment.whatsapp}\nLieu de récupération : ${createdShipment.pickupLocation}\nLieu de livraison : ${createdShipment.deliveryLocation}\nMerci de me contacter pour convenir du tarif.`
    : ''

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-noir/70 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section role="dialog" aria-modal="true" aria-labelledby="shipment-title" className="relative max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl sm:p-8">
        <button onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4 rounded-full p-2 text-noir/60 transition hover:bg-gris hover:text-noir">
          <X className="h-5 w-5" />
        </button>

        {createdShipment ? (
          <div className="mx-auto max-w-lg py-7 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700"><CheckCircle2 className="h-8 w-8" /></span>
            <p className="mt-5 text-xs font-bold uppercase tracking-widest text-rouge">Betex Express</p>
            <h2 id="shipment-title" className="mt-2 text-3xl font-black">Votre demande est bien enregistrée !</h2>
            <p className="mt-4 text-sm leading-6 text-noir/70">Pour transmettre votre demande à Betex Express, ouvrez WhatsApp et appuyez sur Envoyer. Betex Express examinera votre trajet et vous contactera afin de convenir du tarif de la livraison.</p>
            <div className="mt-6 rounded-2xl bg-gris p-5 text-left">
              <p className="text-xs font-semibold text-noir/55">Numéro de demande</p>
              <p className="mt-1 font-mono text-lg font-bold text-rouge">{createdShipment.id}</p>
              <dl className="mt-4 grid gap-3 border-t border-noir/10 pt-4 text-sm sm:grid-cols-2">
                <div><dt className="text-xs text-noir/50">Nom</dt><dd className="mt-1 font-semibold">{createdShipment.name}</dd></div>
                <div><dt className="text-xs text-noir/50">WhatsApp</dt><dd className="mt-1 font-semibold">{createdShipment.whatsapp}</dd></div>
                <div><dt className="text-xs text-noir/50">Lieu de récupération</dt><dd className="mt-1 font-semibold">{createdShipment.pickupLocation}</dd></div>
                <div><dt className="text-xs text-noir/50">Lieu de livraison</dt><dd className="mt-1 font-semibold">{createdShipment.deliveryLocation}</dd></div>
              </dl>
            </div>
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-left text-xs leading-5 text-amber-900">Sans backend, la demande reste en mémoire dans cette page et n’est pas envoyée automatiquement. Le bouton WhatsApp prépare le message avec vos quatre informations.</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`https://wa.me/22666553737?text=${encodeURIComponent(whatsappText)}`} target="_blank" rel="noreferrer" className="btn-primary-red px-5 py-3 text-sm">Envoyer la demande à Betex sur WhatsApp</a>
              <button onClick={onClose} className="btn-outline px-5 py-3 text-sm">Fermer</button>
            </div>
          </div>
        ) : (
          <>
            <div className="pr-10">
              <p className="text-xs font-bold uppercase tracking-widest text-rouge">Livraison à Ouagadougou</p>
              <h2 id="shipment-title" className="mt-2 text-2xl font-black sm:text-3xl">Demander une livraison</h2>
              <p className="mt-2 text-sm text-noir/60">Quatre informations suffisent. Betex Express vous contacte pour convenir du tarif.</p>
            </div>
            <form onSubmit={submitRequest} className="mt-6 space-y-4">
              <Field id="request-name" label="Votre nom">
                <input id="request-name" name="name" autoComplete="name" required maxLength={120} value={form.name} onChange={(event) => update('name', event.target.value)} className={inputClass} placeholder="Votre nom" />
              </Field>
              <Field id="request-whatsapp" label="Votre numéro WhatsApp">
                <input id="request-whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required maxLength={40} value={form.whatsapp} onChange={(event) => update('whatsapp', event.target.value)} className={inputClass} placeholder="+226 …" />
              </Field>
              <Field id="pickup-location" label="Où devons-nous récupérer votre colis ?">
                <input id="pickup-location" name="pickupLocation" type="text" list="ouagadougou-place-suggestions" autoComplete="street-address" required maxLength={240} value={form.pickupLocation} onChange={(event) => update('pickupLocation', event.target.value)} className={inputClass} placeholder="Quartier, adresse ou point de repère" />
              </Field>
              <Field id="delivery-location" label="Où devons-nous livrer votre colis ?">
                <input id="delivery-location" name="deliveryLocation" type="text" list="ouagadougou-place-suggestions" required maxLength={240} value={form.deliveryLocation} onChange={(event) => update('deliveryLocation', event.target.value)} className={inputClass} placeholder="Quartier, adresse ou point de repère" />
              </Field>
              <datalist id="ouagadougou-place-suggestions">
                {OUAGADOUGOU_DISTRICTS.map((place) => <option key={place} value={place} />)}
              </datalist>
              <button type="submit" className="btn-primary-red mt-2 w-full gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wide">
                DEMANDER MA LIVRAISON <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-center text-xs leading-5 text-noir/50">Le tarif est convenu directement avec Betex Express. Aucun prix n’est calculé sur ce site.</p>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
