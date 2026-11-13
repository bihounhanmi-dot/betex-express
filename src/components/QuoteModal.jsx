import React, { useState } from 'react'
import { X, CheckCircle, Calculator, Send, MapPin, Phone, User, Package, MessageSquare } from 'lucide-react'

export default function QuoteModal({ isOpen, onClose, defaultTier }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickupLocation: 'Ouaga 2000',
    deliveryLocation: 'Koulouba',
    packageType: 'Colis Standard (< 5kg)',
    tier: defaultTier || 'Rayon Proximité (1 000 F)',
    notes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [ticketId, setTicketId] = useState('')

  if (!isOpen) return null

  const neighborhoods = [
    'Ouaga 2000',
    'Koulouba',
    "Patte d'Oie",
    'Zone du Bois',
    'Cissin',
    'Pissy',
    'Somgandé',
    'Tampouy',
    'Gounghin',
    'Dassasgho',
    'Wemtenga',
    'Aéroport Thomas Sankara',
    'Karpala',
    'Saaba',
    'Kossodo',
  ]

  const packageTypes = [
    'Pli / Document confidentiel',
    'Colis Standard (< 5kg)',
    'Colis Volumineux (5 à 20kg)',
    'E-commerce avec Encaissment Cash on Delivery',
    'Matériel Fragile & Urgent',
  ]

  // Approximate distance pricing check
  const isFar = 
    (formData.pickupLocation === 'Ouaga 2000' && (formData.deliveryLocation === 'Somgandé' || formData.deliveryLocation === 'Tampouy' || formData.deliveryLocation === 'Saaba' || formData.deliveryLocation === 'Kossodo')) ||
    (formData.pickupLocation === 'Somgandé' && formData.deliveryLocation === 'Ouaga 2000') ||
    (formData.pickupLocation === 'Tampouy' && formData.deliveryLocation === 'Karpala')

  const estimatedPrice = isFar ? '1 500 FCFA' : '1 000 FCFA'
  const estimatedRadius = isFar ? 'Rayon 7 à 15 km' : 'Rayon 0 à 7 km'

  const handleSubmit = (e) => {
    e.preventDefault()
    const generatedId = `BX-${Math.floor(100000 + Math.random() * 900000)}`
    setTicketId(generatedId)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-noir/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-[2.5rem] border border-bordeaux/20 shadow-2xl p-6 sm:p-10 max-h-[92vh] overflow-y-auto text-noir">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-blanc-soft hover:bg-bordeaux/10 transition-colors cursor-pointer text-noir/70 hover:text-bordeaux"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Header with Official Logo */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white border-2 border-bordeaux p-1 shrink-0 shadow-md">
                <img src="/logo.jpg" alt="Betex Express" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span className="px-3 py-0.5 rounded-full bg-bordeaux/10 text-bordeaux text-xs font-mono font-bold uppercase tracking-wider">
                  Devis & Réservation Directe
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-noir tracking-tight mt-1">
                  Commander une Course
                </h3>
                <p className="text-xs text-noir/70 mt-0.5">
                  1 000 F (0 à 7 km) • 1 500 F (7 à 15 km)
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-bordeaux font-bold mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-bordeaux-vivid" />
                    Nom ou Entreprise
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Idrissa Traoré"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-blanc-soft border border-bordeaux/20 focus:outline-none focus:border-bordeaux font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-bordeaux font-bold mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-bordeaux-vivid" />
                    Numéro WhatsApp / Tél
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+226 70 00 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-blanc-soft border border-bordeaux/20 focus:outline-none focus:border-bordeaux font-sans text-sm"
                  />
                </div>
              </div>

              {/* Trajet: Départ & Arrivée */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-bordeaux font-bold mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-bordeaux" />
                    Point de Départ (Ouaga)
                  </label>
                  <select
                    value={formData.pickupLocation}
                    onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-blanc-soft border border-bordeaux/20 focus:outline-none focus:border-bordeaux font-sans text-sm"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-bordeaux font-bold mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-bordeaux-vivid" />
                    Destination Finale
                  </label>
                  <select
                    value={formData.deliveryLocation}
                    onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-blanc-soft border border-bordeaux/20 focus:outline-none focus:border-bordeaux font-sans text-sm"
                  >
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Type de Colis & Formule */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-bordeaux font-bold mb-1.5 flex items-center gap-1.5">
                    <Package className="w-3.5 h-3.5 text-bordeaux-vivid" />
                    Nature du Colis
                  </label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-blanc-soft border border-bordeaux/20 focus:outline-none focus:border-bordeaux font-sans text-sm"
                  >
                    {packageTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-bordeaux font-bold mb-1.5">
                    Formule ou Référence
                  </label>
                  <input
                    type="text"
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-blanc-soft border border-bordeaux/20 focus:outline-none focus:border-bordeaux font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-bordeaux font-bold mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-bordeaux" />
                  Précisions / Adresses exactes
                </label>
                <textarea
                  rows="2"
                  placeholder="Ex: Porte 12, demander M. Sawadogo, scellé urgent..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-blanc-soft border border-bordeaux/20 focus:outline-none focus:border-bordeaux font-sans text-sm"
                ></textarea>
              </div>

              {/* Estimation Pill according to user's distance rules */}
              <div className="rounded-2xl bg-bordeaux/5 p-4 border border-bordeaux/15 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-bordeaux font-bold">
                  <Calculator className="w-4 h-4 text-bordeaux-vivid" />
                  <span>Estimation : {formData.pickupLocation} → {formData.deliveryLocation} ({estimatedRadius})</span>
                </div>
                <span className="font-black text-bordeaux-vivid text-base">
                  {estimatedPrice}
                </span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn-magnetic w-full py-4 rounded-full bg-bordeaux text-white font-bold text-sm tracking-wide shadow-bordeaux-glow cursor-pointer group mt-2"
              >
                <span className="slide-layer bg-bordeaux-dark rounded-full"></span>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Valider & Attribuer un Coursier</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-bordeaux/10 text-bordeaux-vivid mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-bordeaux/10 text-bordeaux text-xs font-mono font-bold">
                TICKET : {ticketId}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-noir mt-3">
                Mission Enregistrée !
              </h3>
              <p className="text-sm text-noir/70 max-w-md mx-auto mt-2 leading-relaxed">
                Merci {formData.name}. Le régulateur Betex Express a reçu votre commande pour le trajet{' '}
                <span className="font-bold text-bordeaux">{formData.pickupLocation} → {formData.deliveryLocation}</span> au tarif de{' '}
                <strong className="text-bordeaux-vivid">{estimatedPrice}</strong>.
              </p>
            </div>

            <div className="bg-blanc-soft rounded-2xl p-4 max-w-sm mx-auto text-left font-mono text-xs text-noir/80 space-y-1.5 border border-bordeaux/15">
              <div className="flex justify-between">
                <span className="text-noir/50">Contact:</span>
                <span className="font-bold">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-noir/50">Tarif Distance:</span>
                <span className="font-bold text-bordeaux">{estimatedPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-noir/50">Statut:</span>
                <span className="text-emerald-600 font-bold">Coursier en approche...</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <a
                href={`https://wa.me/22670000000?text=Bonjour%20Betex%20Express,%20j'ai%20généré%20le%20ticket%20${ticketId}%20pour%20une%20course%20${formData.pickupLocation}%20vers%20${formData.deliveryLocation}%20au%20tarif%20de%20${estimatedPrice}.`}
                target="_blank"
                rel="noreferrer"
                className="btn-magnetic px-6 py-3.5 rounded-full bg-bordeaux text-white font-bold text-xs font-mono uppercase tracking-wider cursor-pointer shadow-bordeaux-glow"
              >
                <span>Accélérer sur WhatsApp Direct</span>
              </a>

              <button
                onClick={handleReset}
                className="px-6 py-3.5 rounded-full bg-blanc-soft hover:bg-blanc-muted text-noir font-semibold text-xs font-sans transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
