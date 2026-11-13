import React from 'react'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer({ onOpenShipment }) {
  return (
    <footer id="contact" className="scroll-mt-24 rounded-t-[2rem] bg-noir px-4 pb-8 pt-12 text-white sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr]">
          <div>
            <a href="#hero" className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-1">
                <img src="/logo.jpg" alt="Logo Betex Express" className="h-full w-full rounded-full object-contain" />
              </span>
              <span><strong className="block text-lg font-black">BETEX <span className="text-rouge-light">EXPRESS</span></strong><span className="text-xs text-white/55">Livraison à Ouagadougou</span></span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">Une plateforme de démonstration pour les demandes de livraison à Ouagadougou.</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/65"><span className="h-2 w-2 rounded-full bg-amber-400" /> Prototype — opérations non connectées</span>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/45">Navigation</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              <li><a href="#services" className="hover:text-white">Services</a></li>
              <li><a href="#tarifs" className="hover:text-white">Demande de devis</a></li>
              <li><a href="#suivi" className="hover:text-white">Suivi</a></li>
              <li><a href="#entreprises" className="hover:text-white">Entreprises</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/45">Contact officiel</h3>
            <ul className="mt-4 space-y-4 text-sm text-white/75">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-rouge-light" /><span>Tanguin, Ouagadougou</span></li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-rouge-light" /><span><a href="tel:+22666553737" className="block hover:text-white">+226 66 55 37 37</a><a href="tel:+22660001203" className="mt-1 block hover:text-white">+226 60 00 12 03</a></span></li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-rouge-light" /><a href="mailto:betexexpress.bf@gmail.com" className="break-all hover:text-white">betexexpress.bf@gmail.com</a></li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href="https://wa.me/22666553737?text=Bonjour%20Betex%20Express%2C%20je%20souhaite%20des%20informations%20sur%20une%20livraison." target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-rouge px-4 py-2.5 text-xs font-bold hover:bg-rouge-hover">WhatsApp <ArrowUpRight className="h-3.5 w-3.5" /></a>
              <button onClick={onOpenShipment} className="rounded-full border border-white/20 px-4 py-2.5 text-xs font-bold hover:bg-white/10">Demander une livraison</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-5 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Betex Express — Tous droits réservés.</p>
          <p>Site prototype — les demandes ne sont pas transmises à un serveur.</p>
        </div>
      </div>
    </footer>
  )
}
