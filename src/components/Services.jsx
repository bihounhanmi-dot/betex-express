import React from 'react'
import { ArrowUpRight, Bike, Building2, FileText, Package, ShoppingBag, Timer } from 'lucide-react'

const services = [
  { icon: Package, title: 'Livraison de colis', description: 'Un parcours de demande simple pour vos envois.' },
  { icon: Bike, title: 'Livraison urgente', description: 'Une option prioritaire à confirmer selon disponibilité.' },
  { icon: Building2, title: 'Livraison pour entreprises', description: 'Un point de départ pour les besoins professionnels.' },
  { icon: ShoppingBag, title: 'Livraison e-commerce', description: 'Des demandes de livraison pour vos commandes.' },
  { icon: FileText, title: 'Documents', description: 'Faites une demande pour vos documents et petits plis.' },
  { icon: Timer, title: 'Livraison programmée', description: 'Indiquez un créneau souhaité à confirmer.' },
]

export default function Services({ onOpenShipment }) {
  return (
    <section id="services" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-rouge">Nos services</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Une demande adaptée à votre envoi.</h2>
          <p className="mt-4 leading-7 text-noir/65">Les prestations et disponibilités sont à confirmer auprès de Betex Express.</p>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <article key={title} className="group rounded-2xl border border-gris-border bg-white p-5 transition hover:-translate-y-1 hover:border-rouge/30 hover:shadow-card-hover">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rouge/10 text-rouge transition group-hover:bg-rouge group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-noir/60">{description}</p>
              <button onClick={onOpenShipment} className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-rouge">
                Faire une demande <ArrowUpRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
