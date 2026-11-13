import React from 'react'
import { Handshake, MapPin, PackageCheck, Zap } from 'lucide-react'

const benefits = [
  { icon: Zap, title: 'Rapide', text: 'Une option pensée pour les besoins urgents, sous réserve de disponibilité.' },
  { icon: MapPin, title: 'Local', text: 'Un service de livraison destiné aux besoins de Ouagadougou.' },
  { icon: PackageCheck, title: 'Simple', text: 'Les informations essentielles réunies dans une demande claire.' },
  { icon: Handshake, title: 'Proche', text: 'Contactez directement Betex Express pour confirmer votre livraison.' },
]

export default function Benefits() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rouge">Pourquoi Betex Express</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Un service local, simple à contacter.</h2>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-gris-border p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rouge/10 text-rouge"><Icon className="h-5 w-5" /></span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-noir/60">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
