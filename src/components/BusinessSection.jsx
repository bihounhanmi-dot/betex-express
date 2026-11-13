import React from 'react'
import { ArrowRight, Building2 } from 'lucide-react'

export default function BusinessSection({ onOpenWorkspace }) {
  return (
    <section id="entreprises" className="scroll-mt-24 bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-rouge px-6 py-9 text-white sm:px-10 sm:py-12">
          <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold"><Building2 className="h-4 w-4" /> Pour les professionnels</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">Vous vendez en ligne ? Nous livrons pour vous.</h2>
              <p className="mt-3 max-w-xl leading-7 text-white/80">Gagnez du temps et concentrez-vous sur vos ventes. Betex Express s’occupe de vos demandes de livraison.</p>
            </div>
            <button onClick={onOpenWorkspace} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-sm font-bold text-rouge transition hover:-translate-y-0.5">
              Solution pour entreprises <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-6 border-t border-white/20 pt-4 text-xs leading-5 text-white/70">Espace entreprise en démonstration : API, import groupé, paiements et statistiques ne sont pas encore connectés.</p>
        </div>
      </div>
    </section>
  )
}
