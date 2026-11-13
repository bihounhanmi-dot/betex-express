export const OUAGADOUGOU_DISTRICTS = [
  'Tanguin',
  'Ouaga 2000',
  'Koulouba / Centre-ville',
  "Patte d'Oie",
  'Zone du Bois',
  'Cissin',
  'Somgandé / Kossodo',
  'Pissy',
  'Tampouy',
  'Aéroport Thomas Sankara',
  'Wemtenga',
  'Karpala / Rayongo',
]

export const SHIPMENT_STATUSES = [
  { id: 'PENDING', label: 'Nouvelle demande' },
  { id: 'UNDER_REVIEW', label: 'En cours d’analyse' },
  { id: 'QUOTE_PROPOSED', label: 'Tarif proposé' },
  { id: 'QUOTE_ACCEPTED', label: 'Tarif accepté' },
  { id: 'IN_PROGRESS', label: 'Livraison en cours' },
  { id: 'DELIVERED', label: 'Livrée' },
  { id: 'CANCELLED', label: 'Annulée' },
]

export function formatFCFA(amount) {
  if (amount == null || amount === '') return 'À convenir'
  return `${Number(amount).toLocaleString('fr-FR')} FCFA`
}
