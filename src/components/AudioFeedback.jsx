import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX, Sparkles } from 'lucide-react'

// Web Audio API Synthesizer for subtle mechanical UI tactile clicks
class SoundEngine {
  constructor() {
    this.ctx = null
    this.enabled = false
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (AudioCtx) {
        this.ctx = new AudioCtx()
      }
    }
  }

  playClick() {
    if (!this.enabled || !this.ctx) return
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(800, this.ctx.currentTime)
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04)

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.04)
    } catch (e) {
      // Ignore audio failure silently
    }
  }

  playHover() {
    if (!this.enabled || !this.ctx) return
    try {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume()
      }
      const osc = this.ctx.createOscillator()
      const gain = this.ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, this.ctx.currentTime)

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03)

      osc.connect(gain)
      gain.connect(this.ctx.destination)

      osc.start()
      osc.stop(this.ctx.currentTime + 0.03)
    } catch (e) {
      // Ignore audio failure silently
    }
  }
}

const engine = new SoundEngine()

export default function AudioFeedback() {
  const [soundOn, setSoundOn] = useState(false)

  const toggleSound = () => {
    engine.init()
    const nextState = !soundOn
    engine.enabled = nextState
    setSoundOn(nextState)
    if (nextState) {
      engine.playClick()
    }
  }

  // Bind global hover and click listeners to interactive elements
  useEffect(() => {
    const handleClick = (e) => {
      const target = e.target.closest('button, a, select, input')
      if (target && soundOn) {
        engine.playClick()
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a')
      if (target && soundOn) {
        engine.playHover()
      }
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [soundOn])

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-md border shadow-lg text-xs font-mono transition-all duration-300 cursor-pointer ${
          soundOn
            ? 'bg-bordeaux text-white border-bordeaux shadow-bordeaux-glow'
            : 'bg-white/90 text-noir/70 border-bordeaux/20 hover:text-bordeaux'
        }`}
        title={soundOn ? 'Désactiver les effets sonores tactiles' : 'Activer les micro-sons tactiles'}
      >
        {soundOn ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-white animate-pulse" />
            <span className="hidden sm:inline font-bold">Audio Tactile : ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 opacity-60" />
            <span className="hidden sm:inline">Audio Tactile : OFF</span>
          </>
        )}
      </button>
    </div>
  )
}

