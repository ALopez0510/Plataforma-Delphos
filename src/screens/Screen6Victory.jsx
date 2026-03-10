import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Lightbulb, Trophy, Zap, Award } from 'lucide-react'
import ReactConfetti from 'react-confetti'

export default function Screen6Victory({ onNext }) {
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })
    const [confettiDone, setConfettiDone] = useState(false)
    const [glitch, setGlitch] = useState(false)

    useEffect(() => {
        const handle = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        window.addEventListener('resize', handle)
        const t = setTimeout(() => setConfettiDone(true), 5000)
        const g = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 180) }, 3800)
        return () => { window.removeEventListener('resize', handle); clearTimeout(t); clearInterval(g) }
    }, [])

    return (
        <div style={{
            minHeight: '100vh', background: '#111111',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px', position: 'relative', overflow: 'hidden',
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
        }}>
            {/* Radial glows */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,69,0,0.06) 0%, rgba(0,229,255,0.03) 50%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Floating particles */}
            {Array.from({ length: 18 }).map((_, i) => (
                <motion.div key={i}
                    animate={{ y: [0, -28, 0], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2 + (i % 4), repeat: Infinity, delay: i * 0.25 }}
                    style={{
                        position: 'absolute',
                        width: (i % 3 === 0 ? 4 : 2) + 'px', height: (i % 3 === 0 ? 4 : 2) + 'px',
                        borderRadius: '50%',
                        background: i % 2 === 0 ? '#FF4500' : '#00E5FF',
                        boxShadow: i % 2 === 0 ? '0 0 4px #FF4500' : '0 0 4px #00E5FF',
                        top: (15 + (i * 4.5)) + '%', left: (5 + (i * 5.2)) + '%',
                    }}
                />
            ))}

            {!confettiDone && (
                <div className="confetti-overlay">
                    <ReactConfetti width={windowSize.width} height={windowSize.height}
                        numberOfPieces={220} recycle={false}
                        colors={['#FF4500', '#00E5FF', '#FFA726', '#FF6B35', '#ffffff']}
                    />
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                style={{
                    maxWidth: '540px', width: '100%', padding: '44px 40px',
                    background: '#1c1c1c',
                    border: '1px solid #2a2a2a',
                    borderTop: '2px solid #FF4500',
                    borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px',
                    borderTopRightRadius: '2px', borderTopLeftRadius: '2px',
                    boxShadow: '0 0 40px rgba(255,69,0,0.08), 0 24px 64px rgba(0,0,0,0.7)',
                    position: 'relative', borderRadius: '12px',
                }}
            >
                {/* Corner lines */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '2px', background: '#00E5FF', borderRadius: '0 0 0 2px' }} />
                <div style={{ position: 'absolute', top: 0, right: 0, width: '2px', height: '80px', background: '#00E5FF' }} />

                {/* Trophy icon */}
                <div style={{ textAlign: 'center', marginBottom: '14px' }}>
                    <motion.div animate={{ rotate: [0, -8, 8, -5, 0] }} transition={{ duration: 1.2, delay: 0.4 }}
                        style={{
                            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                            width: '72px', height: '72px', borderRadius: '18px',
                            background: 'rgba(255,69,0,0.1)', border: '1.5px solid rgba(255,69,0,0.3)',
                            boxShadow: '0 0 20px rgba(255,69,0,0.2)',
                        }}
                    >
                        <Trophy size={36} color="#FF4500" strokeWidth={1.8} />
                    </motion.div>
                </div>

                {/* Glitch title */}
                <div style={{ textAlign: 'center', marginBottom: '6px', position: 'relative' }}>
                    <h1 style={{
                        fontSize: '1.8rem', fontFamily: 'Inter', fontWeight: 900,
                        color: '#FF4500',
                        textShadow: '0 0 18px rgba(255,69,0,0.5)',
                        letterSpacing: '0.08em', position: 'relative'
                    }}>
                        MÓDULO COMPLETADO
                        {glitch && (
                            <>
                                <span style={{ position: 'absolute', inset: 0, color: '#00E5FF', clipPath: 'inset(30% 0 50% 0)', transform: 'translate(-3px, 0)' }}>MÓDULO COMPLETADO</span>
                                <span style={{ position: 'absolute', inset: 0, color: '#FFA726', clipPath: 'inset(70% 0 0% 0)', transform: 'translate(3px, 0)' }}>MÓDULO COMPLETADO</span>
                            </>
                        )}
                    </h1>
                </div>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '28px', fontSize: '0.82rem', fontFamily: 'Inter', letterSpacing: '0.05em' }}>
                    &gt; Has demostrado tu habilidad. Recompensas desbloqueadas:
                </p>

                {/* Loot widgets */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '22px' }}>
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}
                        style={{
                            background: 'rgba(255,69,0,0.07)', border: '1px solid rgba(255,69,0,0.25)',
                            borderTop: '2px solid #FF4500',
                            borderRadius: '10px', padding: '20px', textAlign: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,69,0,0.1)', border: '1px solid rgba(255,69,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Zap size={20} color="#FF4500" strokeWidth={2} />
                            </div>
                        </div>
                        <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1.5rem', color: '#FF4500' }}>+150 XP</span>
                        <p style={{ fontSize: '0.68rem', color: '#666', marginTop: '4px', fontFamily: 'Inter' }}>PUNTOS DE EXPERIENCIA</p>
                    </motion.div>
                    <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                        style={{
                            background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.22)',
                            borderTop: '2px solid #00E5FF',
                            borderRadius: '10px', padding: '20px', textAlign: 'center',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Award size={20} color="#00E5FF" strokeWidth={2} />
                            </div>
                        </div>
                        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.9rem', color: '#00E5FF' }}>PRIMEROS PASOS</span>
                        <p style={{ fontSize: '0.68rem', color: '#666', marginTop: '4px', fontFamily: 'Inter' }}>LOGRO DESBLOQUEADO</p>
                    </motion.div>
                </div>

                {/* Feedback */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                        style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.18)', borderLeft: '3px solid #00E5FF', borderRadius: '8px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                    >
                        <div style={{ width: '32px', height: '32px', flexShrink: 0, background: 'rgba(0,229,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,229,255,0.25)' }}>
                            <CheckCircle size={16} color="#00E5FF" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.72rem', color: '#00E5FF', marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>EJECUCIÓN ÓPTIMA</p>
                            <p style={{ fontSize: '0.8rem', color: '#e0e0e0', lineHeight: '1.5', fontFamily: 'Inter' }}>Tu lógica fue impecable. La estructura del contrato fue clara y profesional.</p>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                        style={{ background: 'rgba(255,167,38,0.06)', border: '1px solid rgba(255,167,38,0.22)', borderLeft: '3px solid #FFA726', borderRadius: '8px', padding: '14px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}
                    >
                        <div style={{ width: '32px', height: '32px', flexShrink: 0, background: 'rgba(255,167,38,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,167,38,0.25)' }}>
                            <Lightbulb size={16} color="#FFA726" strokeWidth={2.5} />
                        </div>
                        <div>
                            <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.72rem', color: '#FFA726', marginBottom: '4px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>ÁREA DE MEJORA</p>
                            <p style={{ fontSize: '0.8rem', color: '#e0e0e0', lineHeight: '1.5', fontFamily: 'Inter' }}>Intenta estructurar mejor el documento con secciones más definidas.</p>
                        </div>
                    </motion.div>
                </div>

                <motion.button
                    style={{ width: '100%', padding: '16px', borderRadius: '10px', background: '#FF4500', color: '#fff', border: 'none', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase', boxShadow: '0 4px 20px rgba(255,69,0,0.4)' }}
                    whileHover={{ background: '#cc3700', boxShadow: '0 6px 28px rgba(255,69,0,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onNext}
                >⚡ CONTINUAR AVENTURA</motion.button>
            </motion.div>
        </div>
    )
}
