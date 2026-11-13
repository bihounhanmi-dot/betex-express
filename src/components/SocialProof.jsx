import React from 'react'
import { ShieldCheck, Star, Award, Building2, ShoppingBag, FileText, CheckCircle2 } from 'lucide-react'

export default function SocialProof({ onOpenQuote }) {
  const metrics = [
    { label: 'Courses Réalisées', value: '18 420+', detail: 'À travers tout Ouagadougou' },
    { label: 'Grille Kilométrique', value: '1 000 F', detail: 'Rayon 0 à 7 km (Zone 1)' },
    { label: 'Grand Ouaga', value: '1 500 F', detail: 'Rayon 7 à 15 km (Zone 2)' },
    { label: 'Intégrité Scellée', value: '99.8%', detail: 'Colis sécurisé par code OTP' },
  ]

  const audits = [
    {
      sector: 'Secteur Juridique & Notarial',
      client: 'Cabinet Maître Ouédraogo & Associés',
      location: 'Ouaga 2000',
      icon: FileText,
      quote:
        'Pour l’acheminement de nos actes notariés et dossiers d’appels d’offres, le scellé inviolable et la remise contre signature numérique de Betex Express constituent une garantie indispensable.',
      badge: 'Protocole Confidentiel Validé',
    },
    {
      sector: 'Commerce & Retail Premium',
      client: 'Maison Kaboré Fashion & Lifestyle',
      location: 'Zone du Bois',
      icon: ShoppingBag,
      quote:
        'Le tarif net à 1 000F pour nos clients proches et 1 500F pour les zones plus éloignées nous simplifie la vie. Et le reversement COD Mobile Money sous 24h est irréprochable.',
      badge: 'Reversement COD < 24h',
    },
    {
      sector: 'Médical & Laboratoire',
      client: 'Pharmacie Centrale & Dépôt Régional',
      location: 'Koulouba / Centre-Ville',
      icon: Building2,
      quote:
        'La rapidité d’intervention en moins de 25 minutes et la sacoche isotherme nous permettent de faire transiter des produits sensibles en toute sérénité.',
      badge: 'Norme Isotherme Certifiée',
    },
  ]

  const paymentPartners = [
    { name: 'Orange Money Burkina', type: 'Paiement Instantané & COD' },
    { name: 'Moov Africa Burkina', type: 'Paiement Mobile & Reversement' },
    { name: 'Wave Burkina', type: 'Transfert sans frais' },
    { name: 'Virement Bancaire (Coris, BOA, BICIAB)', type: 'Comptes Entreprises' },
  ]

  return (
    <section className="py-24 md:py-32 bg-white text-noir relative border-t border-bordeaux/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        
        {/* Metric Ticker */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pb-16 border-b border-bordeaux/15">
          {metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-mono text-xs uppercase tracking-wider text-bordeaux font-bold">
                {m.label}
              </span>
              <span className="text-3xl sm:text-4xl md:text-5xl font-black font-sans text-noir tracking-tight mt-1">
                {m.value}
              </span>
              <span className="font-mono text-xs text-noir/60 mt-1">
                {m.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Section Heading */}
        <div className="max-w-3xl mt-16 md:mt-20 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bordeaux/10 border border-bordeaux/20 text-bordeaux text-xs font-mono uppercase tracking-widest mb-4">
            <Award className="w-3.5 h-3.5 text-bordeaux-vivid" />
            <span>AUDITS DE PROTOCOLE & PREUVE DE RIGUEUR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-noir font-sans leading-tight">
            La confiance des entreprises et commerces de la capitale.
          </h2>
          <p className="mt-4 text-noir/70 text-base sm:text-lg font-normal">
            Découvrez pourquoi les professionnels de Ouagadougou choisissent Betex Express pour leurs courses stratégiques et leurs livraisons e-commerce.
          </p>
        </div>

        {/* 3 Audit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {audits.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-blanc-soft rounded-[2.5rem] p-7 md:p-8 border border-bordeaux/15 shadow-sm flex flex-col justify-between hover:shadow-bordeaux-card transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-bordeaux/10 text-bordeaux uppercase">
                      {item.sector}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-bordeaux/10 text-bordeaux flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="font-sans text-noir/80 text-sm leading-relaxed italic mb-6">
                    « {item.quote} »
                  </p>
                </div>

                <div className="pt-5 border-t border-bordeaux/10">
                  <h4 className="font-bold text-noir text-sm font-sans">
                    {item.client}
                  </h4>
                  <div className="flex items-center justify-between mt-1 text-xs font-mono text-noir/60">
                    <span>{item.location}</span>
                    <span className="text-bordeaux font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-bordeaux-vivid" />
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment & Settlement Standards */}
        <div className="rounded-[2.5rem] bg-gradient-to-r from-noir to-noir-muted text-white p-8 sm:p-10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-bordeaux-light font-bold">
              Infrastructure Financière Ouaga
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-sans text-white mt-1">
              Interopérabilité Mobile Money & Encaissement Sécurisé
            </h3>
            <p className="text-sm text-white/70 mt-2 font-normal leading-relaxed">
              Pour les e-commerçants, nous gérons l'encaissement à la livraison (Cash-on-Delivery) et reversons les montants sous 24h par Orange Money, Moov Money, Wave ou virement direct.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono text-xs">
            {paymentPartners.map((p, idx) => (
              <div
                key={idx}
                className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white flex flex-col"
              >
                <span className="font-bold text-white">{p.name}</span>
                <span className="text-[10px] text-white/60 mt-0.5">{p.type}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
