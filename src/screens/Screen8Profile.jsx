import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Lock, Clock, Zap, Trophy, Flame, Star,
    Cloud, Handshake, Palette, Cpu, BarChart2,
    User2, Calendar, Hash, Layers, LogOut,
} from 'lucide-react'

// ── Skill tree nodes ──────────────────────────────────────────────────────────
const NODES = [
    { id: 'root', label: 'Inicio', x: 220, y: 20, locked: false, parents: [], color: '#FF4500', Icon: Zap },
    { id: 'cloud', label: 'Cloud\nBasics', x: 90, y: 100, locked: true, parents: ['root'], color: '#00E5FF', Icon: Cloud },
    { id: 'aws', label: 'AWS\nCore', x: 50, y: 185, locked: true, parents: ['cloud'], color: '#00E5FF', Icon: Cloud },
    { id: 'devops', label: 'DevOps', x: 110, y: 265, locked: true, parents: ['aws'], color: '#00E5FF', Icon: Cpu },
    { id: 'security', label: 'SecOps', x: 60, y: 345, locked: true, parents: ['devops'], color: '#34D399', Icon: Lock },
    { id: 'data', label: 'Data\nBasics', x: 185, y: 100, locked: true, parents: ['root'], color: '#A78BFA', Icon: BarChart2 },
    { id: 'analysis', label: 'Data\nAnalysis', x: 165, y: 185, locked: true, parents: ['data'], color: '#A78BFA', Icon: BarChart2 },
    { id: 'ml', label: 'Machine\nLearning', x: 180, y: 275, locked: true, parents: ['analysis'], color: '#A78BFA', Icon: Star },
    { id: 'biz', label: 'Business\nBasics', x: 290, y: 100, locked: true, parents: ['root'], color: '#FF4500', Icon: Handshake },
    { id: 'nego', label: 'Nego-\nciación', x: 310, y: 185, locked: true, parents: ['biz'], color: '#FF4500', Icon: Handshake },
    { id: 'consult', label: 'Consul-\ntoría', x: 285, y: 275, locked: true, parents: ['nego'], color: '#FF4500', Icon: Trophy },
    { id: 'exec', label: 'Ejecutivo', x: 300, y: 355, locked: true, parents: ['consult'], color: '#FFA726', Icon: Trophy },
    { id: 'design', label: 'Design\nBasics', x: 380, y: 105, locked: true, parents: ['root'], color: '#FFA726', Icon: Palette },
    { id: 'brand', label: 'Branding', x: 400, y: 195, locked: true, parents: ['design'], color: '#FFA726', Icon: Palette },
    { id: 'ux', label: 'UX / UI', x: 385, y: 285, locked: true, parents: ['brand'], color: '#FFA726', Icon: Star },
]
const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

const BADGES = [
    { label: 'AWS', color: '#00E5FF', Icon: Cloud },
    { label: 'Diseño', color: '#FFA726', Icon: Palette },
    { label: 'Datos', color: '#A78BFA', Icon: BarChart2 },
    { label: 'Ventas', color: '#FF4500', Icon: Handshake },
    { label: 'Líder', color: '#FFA726', Icon: Trophy },
    { label: 'DevOps', color: '#34D399', Icon: Cpu },
]

const STATS = [
    { label: 'Horas Invertidas', value: '0', color: '#00E5FF', Icon: Clock },
    { label: 'Misiones Completadas', value: '0', color: '#FF4500', Icon: Flame },
    { label: 'Nivel Actual', value: '0', color: '#FFA726', Icon: Trophy },
]

const AREAS = [
    { label: 'Tecnología', pct: 0, color: '#00E5FF' },
    { label: 'Negocios', pct: 0, color: '#FF4500' },
    { label: 'Diseño', pct: 0, color: '#FFA726' },
    { label: 'Datos', pct: 0, color: '#A78BFA' },
]

// ── Skill Tree SVG ────────────────────────────────────────────────────────────
function SkillTree() {
    const W = 460, H = 400
    const R = 22
    return (
        <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
            <defs>
                <filter id="aglow2"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            {NODES.flatMap(n => n.parents.map(pid => {
                const p = nodeMap[pid]; if (!p) return null
                return <line key={`${pid}-${n.id}`} x1={p.x} y1={p.y} x2={n.x} y2={n.y} stroke="#252525" strokeWidth="1.5" strokeDasharray="4 3" />
            }))}
            {NODES.map(n => {
                const NIcon = n.Icon; const isRoot = n.id === 'root'
                return (
                    <g key={n.id} transform={`translate(${n.x},${n.y})`}>
                        <circle r={R + 5} fill="none" stroke={n.locked ? '#1e1e1e' : n.color} strokeWidth="1" opacity={n.locked ? 0.35 : 0.5} strokeDasharray={n.locked ? '3 3' : 'none'} />
                        <circle r={R} fill={n.locked ? '#1a1a1a' : `${n.color}1e`} stroke={n.locked ? '#2d2d2d' : n.color} strokeWidth={isRoot ? 2.5 : 1.5} filter={isRoot ? 'url(#aglow2)' : 'none'} />
                        {n.locked
                            ? <Lock x={-9} y={-9} size={18} color="#2e2e2e" strokeWidth={2} />
                            : <NIcon x={-10} y={-10} size={20} color={n.color} strokeWidth={2} />}
                        {n.label.split('\n').map((line, li) => (
                            <text key={li} x="0" y={R + 12 + li * 11} textAnchor="middle" fill={n.locked ? '#2d2d2d' : n.color} fontSize="8.5" fontFamily="Inter" fontWeight={n.locked ? '400' : '700'} letterSpacing="0.02em">{line}</text>
                        ))}
                    </g>
                )
            })}
        </svg>
    )
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Screen8Profile({ onNavigate, onLogout }) {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#111111' }}>

            {/* ── BANNER SECTION (wrapper has no overflow:hidden so avatar is visible) */}
            <div style={{ flexShrink: 0, position: 'relative' }}>
                {/* Decorative banner background */}
                <div style={{ height: '110px', background: 'linear-gradient(135deg, #1a0500 0%, #0d001a 55%, #001a1a 100%)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,69,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,69,0,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                    <div style={{ position: 'absolute', top: -30, left: '18%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,69,0,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: -40, right: '14%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #FF4500, #00E5FF, transparent)' }} />
                    {/* Badge top-right */}
                    <div style={{ position: 'absolute', top: '14px', right: '22px', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,69,0,0.3)', borderRadius: '7px', padding: '5px 13px' }}>
                        <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: '#FF4500', letterSpacing: '0.14em', textTransform: 'uppercase' }}>PASAPORTE PROFESIONAL</span>
                    </div>
                </div>

                {/* Avatar — sits outside the overflow:hidden banner, anchored by negative top margin */}
                <div style={{ position: 'absolute', bottom: -44, left: '30px', zIndex: 10 }}>
                    <motion.div
                        animate={{ boxShadow: ['0 0 0px rgba(255,69,0,0)', '0 0 28px rgba(255,69,0,0.55)', '0 0 0px rgba(255,69,0,0)'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                        style={{ width: '90px', height: '90px', borderRadius: '50%', background: '#1c1c1c', border: '3px solid #FF4500', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User2 size={38} color="#444" strokeWidth={1.5} />
                    </motion.div>
                    <div style={{ position: 'absolute', bottom: 4, right: 4, width: '16px', height: '16px', borderRadius: '50%', background: '#34D399', border: '3px solid #111' }} />
                </div>
            </div>

            {/* ── NAME ROW */}
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', padding: '40px 24px 12px', borderBottom: '1px solid #1e1e1e' }}>
                <div style={{ paddingLeft: '110px' }}>
                    <h1 style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1.45rem', color: '#f5f5f5', letterSpacing: '0.04em', marginBottom: '8px' }}>NOMBRE_USUARIO</h1>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {[
                            { Icon: Hash, label: 'ID: #00001', color: '#00E5FF' },
                            { Icon: Calendar, label: 'Desde Marzo 2026', color: '#FFA726' },
                            { Icon: Flame, label: '0 días de racha', color: '#FF4500' },
                        ].map(({ Icon, label, color }, i) => (
                            <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: `${color}0f`, border: `1px solid ${color}33`, borderRadius: '6px', padding: '4px 11px' }}>
                                <Icon size={11} color={color} strokeWidth={2.5} />
                                <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.68rem', color, letterSpacing: '0.04em' }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Level card + Logout */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div style={{ background: 'rgba(255,69,0,0.07)', border: '1px solid rgba(255,69,0,0.25)', borderTop: '2px solid #FF4500', borderRadius: '10px', padding: '12px 22px', textAlign: 'center', minWidth: '150px' }}>
                        <p style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1.4rem', color: '#FF4500', lineHeight: 1 }}>NIVEL 0</p>
                        <div style={{ background: '#1a1a1a', borderRadius: '9999px', height: '5px', marginTop: '8px', border: '1px solid #2a2a2a', overflow: 'hidden' }}>
                            <div style={{ height: '5px', width: '0%', borderRadius: '9999px', background: 'linear-gradient(90deg, #FF4500, #00E5FF)' }} />
                        </div>
                        <p style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: '#555', marginTop: '6px' }}>0 / 100 XP</p>
                    </div>
                    <motion.button
                        onClick={onLogout}
                        whileHover={{ background: 'rgba(255,69,0,0.12)', color: '#FF4500', borderColor: 'rgba(255,69,0,0.4)' }}
                        whileTap={{ scale: 0.96 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '7px 14px', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.7rem', color: '#555', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.04em' }}
                    >
                        <LogOut size={13} strokeWidth={2} /> Cerrar sesión
                    </motion.button>
                </div>
            </div>

            {/* ── BODY (fills remaining space, scrollable) */}
            <div style={{
                flex: 1, overflow: 'auto', padding: '18px 24px 20px',
                backgroundImage: 'linear-gradient(rgba(0,229,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.015) 1px, transparent 1px)',
                backgroundSize: '48px 48px'
            }}>
                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 220px', gap: '14px', height: '100%', minHeight: 0 }}>

                    {/* ── LEFT: ARCHETYPE + STATS */}
                    <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        <div style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: '2px solid #00E5FF', borderRadius: '12px', padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>// Arquetipo</p>

                            {/* Illustration placeholder */}
                            <div style={{ flex: 1, background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.12)', borderRadius: '10px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                                <User2 size={52} color="#1e1e1e" strokeWidth={1} />
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', backdropFilter: 'blur(2px)' }}>
                                    <Lock size={22} color="#3a3a3a" strokeWidth={1.8} />
                                    <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: '#3a3a3a', textAlign: 'center', lineHeight: 1.4, letterSpacing: '0.06em' }}>COMPLETA TU<br />PRIMERA MISIÓN</span>
                                </div>
                            </div>

                            <div style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.18)', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
                                <Lock size={13} color="#3a3a3a" strokeWidth={2} style={{ display: 'block', margin: '0 auto 5px' }} />
                                <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.7rem', color: '#3a3a3a', letterSpacing: '0.06em' }}>??? DESCONOCIDO</p>
                                <p style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: '#2d2d2d', marginTop: '3px' }}>Descúbrelo al avanzar</p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>// Estadísticas</p>
                            {STATS.map((s, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.07 }}
                                    style={{ background: '#222', border: '1px solid #2a2a2a', borderLeft: `3px solid ${s.color}`, borderRadius: '7px', padding: '9px 12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <s.Icon size={13} color={s.color} strokeWidth={2} />
                                    <div>
                                        <p style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1.05rem', color: s.color, lineHeight: 1 }}>{s.value}</p>
                                        <p style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{s.label}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── CENTER: SKILL TREE */}
                    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}
                        style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.014) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.014) 1px, transparent 1px)', backgroundSize: '26px 26px', pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,69,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                            <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: '#555', textTransform: 'uppercase', letterSpacing: '0.12em' }}>// Árbol de Habilidades</p>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {[['#FF4500', 'Negocios'], ['#00E5FF', 'Tech'], ['#FFA726', 'Diseño'], ['#A78BFA', 'Datos']].map(([c, l]) => (
                                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: c }} />
                                        <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', color: '#555' }}>{l}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                            <SkillTree />
                        </div>

                        <div style={{ marginTop: '10px', background: 'rgba(255,69,0,0.04)', border: '1px dashed rgba(255,69,0,0.18)', borderRadius: '8px', padding: '9px 13px', display: 'flex', alignItems: 'center', gap: '9px', position: 'relative', zIndex: 1, flexShrink: 0 }}>
                            <Lock size={12} color="#FF4500" strokeWidth={2} />
                            <p style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: '#555', lineHeight: 1.4 }}>Las habilidades se desbloquean al completar misiones y módulos</p>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: BADGES + AREAS + STREAK */}
                    <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                        {/* Badge vitrina */}
                        <div style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: '2px solid #FFA726', borderRadius: '12px', padding: '14px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
                                <Trophy size={12} color="#FFA726" strokeWidth={2.5} />
                                <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: '#FFA726', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Vitrina de Insignias</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '7px' }}>
                                {BADGES.map((b, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.06 }}
                                        style={{ aspectRatio: '1', background: '#191919', border: '1px solid #1e1e1e', borderRadius: '9px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', position: 'relative', overflow: 'hidden' }}>
                                        <b.Icon size={18} color={b.color} strokeWidth={1.8} style={{ opacity: 0.25 }} />
                                        <span style={{ fontFamily: 'Inter', fontSize: '0.52rem', fontWeight: 700, color: b.color, opacity: 0.25, letterSpacing: '0.04em' }}>{b.label}</span>
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Lock size={13} color="#2e2e2e" strokeWidth={2} />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: '#3a3a3a', marginTop: '9px', textAlign: 'center' }}>0 / {BADGES.length} insignias</p>
                        </div>

                        {/* Progress by area */}
                        <div style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: '2px solid #00E5FF', borderRadius: '12px', padding: '14px', flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
                                <Layers size={12} color="#00E5FF" strokeWidth={2.5} />
                                <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: '#00E5FF', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Progreso por Área</p>
                            </div>
                            {AREAS.map((a, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontFamily: 'Inter', fontSize: '0.68rem', color: '#666' }}>{a.label}</span>
                                        <span style={{ fontFamily: 'Inter', fontSize: '0.68rem', fontWeight: 700, color: a.color }}>{a.pct}%</span>
                                    </div>
                                    <div style={{ background: '#1a1a1a', borderRadius: '9999px', height: '5px', border: '1px solid #252525', overflow: 'hidden' }}>
                                        <div style={{ height: '5px', width: `${a.pct}%`, borderRadius: '9999px', background: a.color }} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Streak */}
                        <div style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: '2px solid #FF4500', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                            <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ repeat: Infinity, duration: 2.5 }}>
                                <Flame size={24} color="#FF4500" strokeWidth={1.8} style={{ display: 'block', margin: '0 auto 5px' }} />
                            </motion.div>
                            <p style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '1.05rem', color: '#2e2e2e' }}>0 Días</p>
                            <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: '#3a3a3a', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>Sin racha aún</p>
                            <p style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: '#3a3a3a', marginTop: '7px', lineHeight: 1.4 }}>Completa una actividad<br />para empezar tu racha</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
