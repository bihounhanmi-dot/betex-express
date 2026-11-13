import React, { useState } from 'react'
import { ChevronDown, HelpCircle, ArrowUpRight, MessageCircle } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: 'Comment s’applique le barème kilométrique (1 000F / 1 500F) ?',
    a: 'Notre barème est strict et transparent : pour toute course dans un rayon de 0 à 7 km (courses intra-quartier ou quartiers limitrophes), le tarif est de 1 000 FCFA. Pour une traversée urbaine de 7 à 15 km (ex: Ouaga 2000 vers Somgandé ou Tampouy), le tarif est de 1 500 FCFA. Au-delà de 15 km, un forfait kilométrique léger s’applique.',
  },
  {
    q: 'Comment fonctionne le scellé de sécurité inviolable ?',
    a: 'Dès l’enlèvement, votre pli ou colis est placé dans une pochette étanche fermée par un scellé numéroté à usage unique. Le coursier ne peut ouvrir le colis. À l’arrivée, un code OTP confidentiel est envoyé par SMS/WhatsApp au destinataire pour autoriser l’ouverture.',
  },
  {
    q: 'Quels moyens de règlement acceptez-vous à Ouagadougou ?',
    a: 'Nous acceptons Orange Money, Moov Money, Wave, les règlements en espèces à la livraison (Cash-On-Delivery), ainsi que le virement bancaire pour les entreprises titulaires d’un compte flotte mensuel.',
  },
  {
    q: 'Comment fonctionne le service Cash-On-Delivery (COD) pour les e-commerçants ?',
    a: 'Notre coursier encaisse le montant exact de votre marchandise auprès du client final (en espèces ou par Mobile Money). Les fonds collectés sont automatiquement reversés sur votre compte Mobile Money ou bancaire sous 24h avec un bordereau de réconciliation détaillé.',
  },
  {
    q: 'Prenez-vous en charge les documents bancaires et confidentiels ?',
    a: 'Oui. C’est l’une de nos spécialités. Nos coursiers sont formés au transport d’actes notariés, de chéquiers, de passeports et de dossiers d’appels d’offres. Chaque course fait l’objet d’un horodatage GPS certifié et d’une décharge numérique avec valeur juridique.',
  },
  {
    q: 'Quelle est la garantie en cas d’imprévu ou de retard ?',
    a: 'Chaque expédition bénéficie d’une assurance de base couvrant jusqu’à 500 000 FCFA (extensible à 5 000 000 FCFA pour les contrats entreprise). Si un retard dépasse 30 minutes au-delà de l’ETA annoncée sans cas de force majeure, la course vous est intégralement remboursée.',
  },
]

export default function Faq({ onOpenQuote }) {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx)
  }

  return (
    <section id="faq" className="py-24 md:py-32 bg-blanc-soft relative border-t border-bordeaux/10">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bordeaux/10 border border-bordeaux/20 text-bordeaux text-xs font-mono uppercase tracking-widest mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-bordeaux-vivid" />
            <span>BASE DE CONNAISSANCES & CONDITIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-noir font-sans leading-tight">
            Questions Fréquentes & Protocoles.
          </h2>
          <p className="mt-4 text-noir/70 text-base sm:text-lg">
            Tout ce que vous devez savoir sur nos tarifs au kilomètre (1 000F / 1 500F), les scellés et les règlements à Ouagadougou.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx
            return (
              <div
                key={idx}
                className={`rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-bordeaux/30 shadow-bordeaux-card'
                    : 'bg-white/80 border-bordeaux/15 hover:border-bordeaux/30'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                >
                  <span className="font-sans font-bold text-base sm:text-lg text-noir">
                    {item.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-bordeaux text-white rotate-180'
                        : 'bg-bordeaux/10 text-bordeaux'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 animate-fadeIn">
                    <p className="font-sans text-sm sm:text-base text-noir/75 leading-relaxed border-t border-bordeaux/10 pt-4">
                      {item.a}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-[2rem] bg-gradient-to-r from-bordeaux to-bordeaux-dark text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-bordeaux-glow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-base font-sans text-white">
                Besoin d'une clarification sur une adresse ou un volume ?
              </h4>
              <p className="text-white/80 text-sm">
                Nos régulateurs de dispatching vous répondent instantanément sur WhatsApp.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/22670000000?text=Bonjour%20Betex%20Express,%20j'ai%20une%20question%20sur%20vos%20tarifs%20au%20km%20ou%20une%20livraison%20à%20Ouagadougou."
            target="_blank"
            rel="noreferrer"
            className="btn-magnetic px-6 py-3.5 rounded-full bg-white text-bordeaux font-bold text-xs uppercase tracking-wider shadow-md hover:bg-blanc-soft cursor-pointer shrink-0"
          >
            <span>Échanger sur WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  )
}
