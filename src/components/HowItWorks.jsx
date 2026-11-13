import React from 'react'
import { Check, PackagePlus, Route, Search, Truck } from 'lucide-react'

const steps = [
  { number: '01', title: 'Créez votre demande', description: 'Indiquez votre nom, votre WhatsApp et les lieux de récupération et de livraison.', icon: PackagePlus },
  { number: '02', title: 'Confirmez la demande', description: 'Vérifiez le récapitulatif et contactez Betex Express pour la confirmation réelle.', icon: Check },
  { number: '03', title: 'Suivez le statut', description: 'Retrouvez le statut de démonstration ou le suivi réel lorsqu’un service connecté sera disponible.', icon: Search },
  { number: '04', title: 'Recevez le colis', description: 'La remise et la preuve de livraison seront confirmées par le service opérationnel.', icon: Truck },
]

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="scroll-mt-24 border-b border-gris-border bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rouge">Comment ça marche</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">Quatre étapes, un parcours clair.</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-noir/60">Le site est un prototype d’interface : les demandes ne sont pas encore transmises à un système de dispatch réel.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <article key={number} className="rounded-2xl border border-gris-border bg-gris/60 p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-rouge">{number}</span>
                <Icon className="h-5 w-5 text-noir/45" />
              </div>
              <h3 className="mt-5 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-noir/60">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
