import React, { useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import RouteCalculator from './components/RouteCalculator'
import Pricing from './components/Pricing'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Benefits from './components/Benefits'
import TrackingSection from './components/TrackingSection'
import WorkspacePreview from './components/WorkspacePreview'
import BusinessSection from './components/BusinessSection'
import Footer from './components/Footer'
import ShipmentFlow from './components/ShipmentFlow'

export default function App() {
  const [isShipmentOpen, setIsShipmentOpen] = useState(false)
  const [shipmentDefaults, setShipmentDefaults] = useState({})
  const [shipments, setShipments] = useState([])
  const [workspaceRole, setWorkspaceRole] = useState('client')
  const requestSequence = useRef(0)

  const handleOpenShipment = (defaults = {}) => {
    setShipmentDefaults(defaults && typeof defaults === 'object' ? defaults : {})
    setIsShipmentOpen(true)
  }

  const handleCreateShipment = (shipment) => {
    requestSequence.current += 1
    const request = {
      ...shipment,
      id: `BEX-${new Date().getFullYear()}-${String(requestSequence.current).padStart(4, '0')}`,
    }
    setShipments((current) => [request, ...current])
    return request
  }

  const handleStatusChange = (shipmentId, status) => {
    const now = new Date().toISOString()
    setShipments((current) =>
      current.map((shipment) =>
        shipment.id === shipmentId
          ? {
              ...shipment,
              status,
              statusHistory: [...shipment.statusHistory, { status, at: now }],
            }
          : shipment,
      ),
    )
  }

  const handleQuoteRefused = (shipmentId) => {
    const now = new Date().toISOString()
    setShipments((current) =>
      current.map((shipment) =>
        shipment.id === shipmentId
          ? {
              ...shipment,
              status: 'CANCELLED',
              customerDecision: 'Tarif refusé par le client',
              statusHistory: [...shipment.statusHistory, { status: 'CANCELLED', at: now }],
            }
          : shipment,
      ),
    )
  }

  const handlePriceProposed = (shipmentId, price) => {
    const now = new Date().toISOString()
    setShipments((current) =>
      current.map((shipment) =>
        shipment.id === shipmentId
          ? {
              ...shipment,
              priceProposed: price,
              customerDecision: null,
              priceHistory: [...shipment.priceHistory, { amount: price, at: now }],
              status: 'QUOTE_PROPOSED',
              statusHistory: [...shipment.statusHistory, { status: 'QUOTE_PROPOSED', at: now }],
            }
          : shipment,
      ),
    )
  }

  const handleAgreementChange = (shipmentId, price) => {
    const now = new Date().toISOString()
    setShipments((current) =>
      current.map((shipment) =>
        shipment.id === shipmentId
          ? {
              ...shipment,
              agreedPrice: price,
              status: 'QUOTE_ACCEPTED',
              statusHistory: [...shipment.statusHistory, { status: 'QUOTE_ACCEPTED', at: now }],
            }
          : shipment,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-white text-noir selection:bg-rouge selection:text-white">
      <Navbar
        onOpenShipment={() => handleOpenShipment()}
        onOpenWorkspace={() => {
          setWorkspaceRole('admin')
          document.getElementById('espaces')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />
      <main>
        <Hero onOpenShipment={() => handleOpenShipment()} />
        <HowItWorks />
        <RouteCalculator onOpenShipment={handleOpenShipment} />
        <Services onOpenShipment={() => handleOpenShipment()} />
        <Benefits />
        <Pricing onOpenShipment={() => handleOpenShipment()} />
        <BusinessSection
          onOpenWorkspace={() => {
            setWorkspaceRole('entreprise')
            document.getElementById('espaces')?.scrollIntoView({ behavior: 'smooth' })
          }}
        />
        <TrackingSection shipments={shipments} />
        <WorkspacePreview
          shipments={shipments}
          activeRole={workspaceRole}
          onRoleChange={setWorkspaceRole}
          onStatusChange={handleStatusChange}
          onQuoteRefused={handleQuoteRefused}
          onPriceProposed={handlePriceProposed}
          onAgreementChange={handleAgreementChange}
          onOpenShipment={() => handleOpenShipment()}
        />
      </main>
      <Footer onOpenShipment={() => handleOpenShipment()} />
      <ShipmentFlow
        isOpen={isShipmentOpen}
        defaults={shipmentDefaults}
        onClose={() => setIsShipmentOpen(false)}
        onCreated={handleCreateShipment}
      />
    </div>
  )
}
