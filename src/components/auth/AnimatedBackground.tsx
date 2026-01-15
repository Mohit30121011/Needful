'use client'

import { useEffect, useRef } from 'react'

// Premium Light Mode Animated Background with Geometric Shapes
export function AnimatedBackgroundLight() {
    return (
        <div className="fixed inset-0 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

            {/* Animated gradient blobs - large and subtle */}
            <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-orange-100/50 to-amber-50/30 blur-3xl animate-[blob_25s_ease-in-out_infinite]" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
            <div className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-br from-orange-200/30 to-rose-50/20 blur-3xl animate-[blob_30s_ease-in-out_infinite_2s]" style={{ borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }} />

            {/* Decorative geometric shapes instead of circles */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Floating squares with rotation */}
                <rect x="10%" y="15%" width="12" height="12" fill="none" stroke="rgba(255,82,0,0.15)" strokeWidth="2" className="animate-[float_8s_ease-in-out_infinite]" rx="2">
                    <animateTransform attributeName="transform" type="rotate" values="0 60 90; 360 60 90" dur="20s" repeatCount="indefinite" />
                </rect>
                <rect x="85%" y="20%" width="16" height="16" fill="none" stroke="rgba(255,140,0,0.12)" strokeWidth="2" className="animate-[float_10s_ease-in-out_infinite_1s]" rx="3">
                    <animateTransform attributeName="transform" type="rotate" values="360 800 120; 0 800 120" dur="25s" repeatCount="indefinite" />
                </rect>
                <rect x="75%" y="70%" width="10" height="10" fill="rgba(255,82,0,0.08)" className="animate-[float_7s_ease-in-out_infinite_2s]" rx="2">
                    <animateTransform attributeName="transform" type="rotate" values="0 700 400; 360 700 400" dur="15s" repeatCount="indefinite" />
                </rect>

                {/* Floating triangles */}
                <polygon points="120,80 140,120 100,120" fill="none" stroke="rgba(255,82,0,0.1)" strokeWidth="1.5" className="animate-[float_9s_ease-in-out_infinite_0.5s]" />
                <polygon points="820,380 850,440 790,440" fill="rgba(255,140,0,0.06)" className="animate-[float_11s_ease-in-out_infinite_3s]" />

                {/* Plus signs */}
                <g className="animate-[float_6s_ease-in-out_infinite_1s]" opacity="0.12">
                    <line x1="5%" y1="60%" x2="5%" y2="66%" stroke="#FF5200" strokeWidth="2" strokeLinecap="round" />
                    <line x1="2%" y1="63%" x2="8%" y2="63%" stroke="#FF5200" strokeWidth="2" strokeLinecap="round" />
                </g>
                <g className="animate-[float_8s_ease-in-out_infinite_2s]" opacity="0.1">
                    <line x1="92%" y1="45%" x2="92%" y2="51%" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
                    <line x1="89%" y1="48%" x2="95%" y2="48%" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" />
                </g>

                {/* Dots pattern */}
                <circle cx="15%" cy="85%" r="3" fill="rgba(255,82,0,0.15)" className="animate-[float_7s_ease-in-out_infinite]" />
                <circle cx="88%" cy="12%" r="2.5" fill="rgba(255,140,0,0.12)" className="animate-[float_9s_ease-in-out_infinite_1s]" />
                <circle cx="25%" cy="35%" r="2" fill="rgba(255,82,0,0.1)" className="animate-[float_6s_ease-in-out_infinite_2s]" />
            </svg>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,82,0,0.5) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}
            />

            {/* Very subtle horizontal lines */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,82,0,0.3) 80px, rgba(255,82,0,0.3) 81px)'
                }}
            />
        </div>
    )
}

// Canvas-based particle system - more subtle
export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number
        const particles: Array<{
            x: number; y: number; size: number;
            speedX: number; speedY: number; opacity: number;
            hue: number
        }> = []

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createParticle = () => {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.3 + 0.1,
                hue: Math.random() * 30 + 20
            }
        }

        const init = () => {
            for (let i = 0; i < 30; i++) {
                particles.push(createParticle())
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            particles.forEach(particle => {
                particle.x += particle.speedX
                particle.y += particle.speedY

                if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
                if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size
                )
                gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`)
                gradient.addColorStop(1, 'transparent')

                ctx.beginPath()
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        resize()
        init()
        animate()

        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 1 }}
        />
    )
}

// Dark mode version
export function AnimatedBackgroundCSS() {
    return (
        <div className="fixed inset-0 bg-[#0a0a0a] overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,82,0,0.5) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,82,0,0.5) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px'
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>
    )
}
