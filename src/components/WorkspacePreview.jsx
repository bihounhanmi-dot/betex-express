import React, { useState } from 'react'
import { Building2, CircleUserRound, Package, Plus, Shield } from 'lucide-react'
import { SHIPMENT_STATUSES, formatFCFA } from '../data/shipping'

const roles = [
  { id: 'client', label: 'Client', icon: CircleUserRound },
  { id: 'entreprise', label: 'Entreprise', icon: Building2 },
  { id: 'admin', label: 'Administration', icon: Shield },
]

const statusLabels = Object.fromEntries(SHIPMENT_STATUSES.map((status) => [status.id, status.label]))

function statusStyle(status) {
  if (status === 'DELIVERED' || status === 'QUOTE_ACCEPTED') return 'bg-emerald-50 text-emerald-800'
  if (status === 'CANCELLED') return 'bg-rose-50 text-rose-800'
  if (status === 'QUOTE_PROPOSED' || status === 'UNDER_REVIEW') return 'bg-amber-50 text-amber-900'
  if (status === 'IN_PROGRESS') return 'bg-rouge/10 text-rouge'
  return 'bg-gris text-noir/65'
}

function formatDate(value) {
  return new Date(value).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
}

function RequestCard({ shipment, showQuoteActions, onQuoteRefused, onAgreementChange }) {
  const [agreementInput, setAgreementInput] = useState('')

  return (
    <article className="rounded-2xl border border-gris-border p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gris-border pb-3">
        <div>
          <span className="font-mono text-sm font-bold text-rouge">{shipment.id}</span>
          <span className="ml-2 text-xs text-noir/50">{formatDate(shipment.createdAt)}</span>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyle(shipment.status)}`}>{statusLabels[shipment.status]}</span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div><dt className="text-xs text-noir/50">Nom</dt><dd className="mt-1 font-semibold">{shipment.name}</dd></div>
        <div><dt className="text-xs text-noir/50">WhatsApp</dt><dd className="mt-1 font-semibold"><a href={`https://wa.me/${shipment.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-rouge hover:underline">{shipment.whatsapp}</a></dd></div>
        <div><dt className="text-xs text-noir/50">Lieu de récupération</dt><dd className="mt-1 font-semibold">{shipment.pickupLocation}</dd></div>
        <div><dt className="text-xs text-noir/50">Lieu de livraison</dt><dd className="mt-1 font-semibold">{shipment.deliveryLocation}</dd></div>
      </dl>

      {shipment.priceProposed != null && (
        <div className="mt-4 rounded-xl border border-rouge/15 bg-rouge/5 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-rouge">{shipment.status === 'QUOTE_ACCEPTED' ? 'Tarif convenu' : 'Votre tarif de livraison'}</p>
          <p className="mt-1 text-2xl font-black">{formatFCFA(shipment.priceProposed)}</p>
          {showQuoteActions && shipment.status === 'QUOTE_PROPOSED' && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => onAgreementChange(shipment.id, shipment.priceProposed)} className="rounded-full bg-emerald-700 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-800">Accepter le tarif</button>
              <button onClick={() => onQuoteRefused(shipment.id)} className="rounded-full border border-rose-200 px-4 py-2.5 text-xs font-bold text-rose-800 hover:bg-rose-50">Refuser</button>
            </div>
          )}
          {shipment.status === 'QUOTE_ACCEPTED' && <p className="mt-2 text-xs font-semibold text-emerald-800">Tarif accepté. Betex Express confirmera la suite de la livraison.</p>}
        </div>
      )}
      {shipment.customerDecision && <p className="mt-3 text-xs font-semibold text-rose-800">{shipment.customerDecision}</p>}
      {!shipment.priceProposed && <p className="mt-3 text-xs text-noir/55">Le tarif sera convenu directement avec Betex Express.</p>}
    </article>
  )
}

function AdminRequest({ shipment, onPriceProposed, onStatusChange }) {
  const [priceInput, setPriceInput] = useState('')
  const [error, setError] = useState('')
  const canPropose = ['UNDER_REVIEW', 'QUOTE_PROPOSED'].includes(shipment.status)
    || (shipment.status === 'CANCELLED' && shipment.customerDecision === 'Tarif refusé par le client')

  const propose = () => {
    const amount = Number(priceInput)
    if (!Number.isSafeInteger(amount) || amount <= 0) {
      setError('Saisissez un montant entier valide en FCFA.')
      return
    }
    onPriceProposed(shipment.id, amount)
    setPriceInput('')
    setError('')
  }

  return (
    <article className="rounded-2xl border border-gris-border p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gris-border pb-3">
        <div><span className="font-mono text-sm font-bold text-rouge">{shipment.id}</span><span className="ml-2 text-xs text-noir/50">{formatDate(shipment.createdAt)}</span></div>
        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${statusStyle(shipment.status)}`}>{statusLabels[shipment.status]}</span>
      </div>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div><dt className="text-xs text-noir/50">Nom</dt><dd className="mt-1 font-semibold">{shipment.name}</dd></div>
        <div><dt className="text-xs text-noir/50">WhatsApp</dt><dd className="mt-1 font-semibold"><a href={`https://wa.me/${shipment.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-rouge hover:underline">{shipment.whatsapp}</a></dd></div>
        <div><dt className="text-xs text-noir/50">Lieu de récupération</dt><dd className="mt-1 font-semibold">{shipment.pickupLocation}</dd></div>
        <div><dt className="text-xs text-noir/50">Lieu de livraison</dt><dd className="mt-1 font-semibold">{shipment.deliveryLocation}</dd></div>
      </dl>
      {shipment.customerDecision && <p className="mt-3 text-xs font-semibold text-rose-800">{shipment.customerDecision}</p>}

      {shipment.status === 'PENDING' && <button onClick={() => onStatusChange(shipment.id, 'UNDER_REVIEW')} className="btn-primary-red mt-4 px-5 py-2.5 text-sm">Commencer l’analyse</button>}
      {canPropose && (
        <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-gris p-4 sm:flex-row sm:items-end">
          <label className="flex-1 text-sm font-semibold">Tarif proposé manuellement (FCFA)
            <input type="number" min="1" step="1" value={priceInput} onChange={(event) => { setPriceInput(event.target.value); setError('') }} placeholder="Saisir le montant convenu" className="mt-1.5 w-full rounded-xl border border-gris-border bg-white px-3.5 py-3 text-sm font-normal outline-none focus:border-rouge focus:ring-2 focus:ring-rouge/10" />
          </label>
          <button onClick={propose} className="btn-primary-red px-5 py-3 text-sm">{shipment.priceHistory.length ? 'Reproposer le tarif' : 'Proposer le tarif'}</button>
        </div>
      )}
      {error && <p role="alert" className="mt-2 text-xs font-semibold text-rose-700">{error}</p>}
      {shipment.priceHistory.length > 0 && <p className="mt-3 text-xs text-noir/55">Dernière proposition : <strong>{formatFCFA(shipment.priceProposed)}</strong> · {formatDate(shipment.priceHistory[shipment.priceHistory.length - 1].at)}</p>}
      {shipment.status === 'QUOTE_ACCEPTED' && <button onClick={() => onStatusChange(shipment.id, 'IN_PROGRESS')} className="btn-primary-red mt-4 px-5 py-2.5 text-sm">Marquer la livraison en cours</button>}
      {shipment.status === 'IN_PROGRESS' && <button onClick={() => onStatusChange(shipment.id, 'DELIVERED')} className="btn-primary-red mt-4 px-5 py-2.5 text-sm">Marquer comme livrée</button>}
      {!['DELIVERED', 'CANCELLED'].includes(shipment.status) && <button onClick={() => onStatusChange(shipment.id, 'CANCELLED')} className="ml-2 mt-4 rounded-full px-4 py-2.5 text-xs font-semibold text-noir/50 hover:bg-rose-50 hover:text-rose-800">Annuler</button>}
    </article>
  )
}

export default function WorkspacePreview({
  shipments,
  activeRole,
  onRoleChange,
  onStatusChange,
  onQuoteRefused,
  onPriceProposed,
  onAgreementChange,
  onOpenShipment,
}) {
  const isAdmin = activeRole === 'admin'
  const completed = shipments.filter((shipment) => shipment.status === 'DELIVERED').length
  const cancelled = shipments.filter((shipment) => shipment.status === 'CANCELLED').length
  const inProgress = shipments.filter((shipment) => !['DELIVERED', 'CANCELLED'].includes(shipment.status)).length
  const requestCards = shipments.map((shipment) => (
    <RequestCard
      key={shipment.id}
      shipment={shipment}
      showQuoteActions={!isAdmin}
      onQuoteRefused={onQuoteRefused}
      onAgreementChange={onAgreementChange}
    />
  ))

  return (
    <section id="espaces" className="scroll-mt-24 bg-gris py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-rouge">Suivi des demandes</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Demandes de livraison</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-noir/60">Prototype local sans serveur. Les demandes de test ne sont accessibles que dans cette page et disparaissent au rechargement. Évitez les données personnelles réelles.</p>
        </div>

        <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Vue des demandes">
          {roles.map(({ id, label, icon: Icon }) => (
            <button key={id} role="tab" aria-selected={activeRole === id} onClick={() => onRoleChange(id)} className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${activeRole === id ? 'bg-noir text-white' : 'border border-gris-border bg-white text-noir/65 hover:border-noir/25'}`}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-3xl border border-gris-border bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-3 border-b border-gris-border pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-rouge">{isAdmin ? 'Administration — démonstration' : activeRole === 'entreprise' ? 'Espace entreprise' : 'Espace client'}</p>
              <h3 className="mt-1 text-xl font-black">{isAdmin ? 'Demandes reçues' : activeRole === 'entreprise' ? 'Demandes de livraison' : 'Vos demandes'}</h3>
            </div>
            {!isAdmin && <button onClick={onOpenShipment} className="btn-primary-red gap-2 px-4 py-2.5 text-sm"><Plus className="h-4 w-4" /> Demander une livraison</button>}
          </div>

          {isAdmin && <p className="my-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">Démo sans authentification : les demandes et tarifs proposés sont temporaires et visibles dans ce navigateur seulement. Un serveur sécurisé est nécessaire avant une utilisation réelle.</p>}
          {!isAdmin && (
            <>
              <div className="grid gap-3 py-5 sm:grid-cols-3">
                <div className="rounded-2xl bg-gris p-4"><p className="text-xs text-noir/55">Demandes en cours</p><p className="mt-1 text-2xl font-black">{inProgress}</p></div>
                <div className="rounded-2xl bg-gris p-4"><p className="text-xs text-noir/55">Livrées</p><p className="mt-1 text-2xl font-black">{completed}</p></div>
                <div className="rounded-2xl bg-gris p-4"><p className="text-xs text-noir/55">Annulées</p><p className="mt-1 text-2xl font-black">{cancelled}</p></div>
              </div>
              {activeRole === 'entreprise' && <p className="mb-4 rounded-2xl border border-rouge/15 bg-rouge/5 p-4 text-sm leading-6 text-noir/65">Cet aperçu d’entreprise utilise le même formulaire simplifié. La gestion multi-commandes nécessitera un backend.</p>}
            </>
          )}

          {shipments.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-gris-border py-10 text-center">
              <Package className="h-8 w-8 text-noir/25" />
              <p className="mt-3 font-semibold">Aucune demande dans cette session</p>
              <p className="mt-1 text-sm text-noir/55">{isAdmin ? 'Les demandes créées sur cette page apparaîtront ici.' : 'Demandez une livraison pour consulter son statut ici.'}</p>
              {!isAdmin && <button onClick={onOpenShipment} className="mt-4 text-sm font-bold text-rouge">Demander ma livraison</button>}
            </div>
          ) : isAdmin ? (
            <div className="space-y-4">{shipments.map((shipment) => <AdminRequest key={shipment.id} shipment={shipment} onPriceProposed={onPriceProposed} onStatusChange={onStatusChange} />)}</div>
          ) : (
            <div className="space-y-3">{requestCards}</div>
          )}
        </div>
      </div>
    </section>
  )
}
