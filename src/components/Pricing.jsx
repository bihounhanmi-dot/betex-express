import React from 'react'
import { ArrowRight, MessageCircle, ScrollText } from 'lucide-react'

export default function Pricing({ onOpenShipment }) {
  return (
    <section id="tarifs" className="scroll-mt-24 bg-gris py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gris-border bg-white p-6 text-center shadow-card-subtle sm:p-10">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rouge/10 text-rouge"><ScrollText className="h-6 w-6" /></span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-rouge">Demande de devis</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Chaque livraison a son tarif personnalisé.</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-noir/65">
            Les tarifs sont définis selon les caractéristiques de chaque livraison. Betex Express étudie les lieux indiqués et vous contacte pour convenir du tarif.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button onClick={onOpenShipment} className="btn-primary-red gap-2 px-6 py-3.5 text-sm">Demander une livraison <ArrowRight className="h-4 w-4" /></button>
            <a href="https://wa.me/22666553737?text=Bonjour%20Betex%20Express%2C%20je%20souhaite%20convenir%20du%20tarif%20d%27une%20livraison." target="_blank" rel="noreferrer" className="btn-outline gap-2 px-6 py-3.5 text-sm"><MessageCircle className="h-4 w-4" /> Contacter Betex Express</a>
          </div>
          <p className="mt-5 text-xs text-noir/50">Aucune grille de prix fixe ni calcul automatique : le montant est proposé manuellement par Betex Express.</p>
        </div>
      </div>
    </section>
  )
}
