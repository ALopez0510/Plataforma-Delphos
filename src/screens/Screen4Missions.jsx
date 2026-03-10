import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Flame, Lock, Cloud, Handshake, Palette,
    ChevronRight, X, Clock, Layers, Building2,
    Star, Zap, Award, CheckCircle2, ArrowRight,
    Sparkles, Brain, Filter, Search, Grid, List,
    Cpu, Briefcase, Pen, Globe, Target, Shuffle,
} from 'lucide-react'

const TABS = ['Misiones Principales', 'Misiones Secundarias', 'Explorar catálogo']

// Missions (used in both main list and catalog)
const MISSIONS = [
    {
        id: 1, title: 'OPERACIÓN: DESPLIEGUE EN LA NUBE', subtitle: 'Configura e implementa una arquitectura AWS completa.',
        difficulty: 3, xp: '+500 XP', badge: 'Insignia AWS', color: '#00E5FF', glow: 'rgba(0,229,255,0.3)', Icon: Cloud, unlocked: true,
        company: 'Amazon Web Services', companyType: 'Big Tech · Empresa real', estimatedTime: '4h 30 min',
        modules: [
            { title: 'Fundamentos de Cloud Computing', duration: '45 min' },
            { title: 'Configuración de instancias EC2', duration: '60 min' },
            { title: 'Almacenamiento S3 y permisos IAM', duration: '50 min' },
            { title: 'Balanceo de carga y Auto Scaling', duration: '55 min' },
            { title: 'Deployment y revisión final', duration: '60 min' },
        ],
        skills: ['Cloud Computing', 'AWS', 'Infraestructura', 'DevOps', 'Seguridad'],
        level: 'Intermedio', category: 'Tecnología', categoryColor: '#00E5FF', categoryIcon: Cpu,
        description: 'Simula el rol de Cloud Engineer en una empresa real. Tendrás que diseñar, configurar y poner en producción una arquitectura AWS escalable bajo restricciones de tiempo y presupuesto reales.',
    },
    {
        id: 2, title: 'NEGOCIACIÓN CON CLIENTE VIP', subtitle: 'Cierra un trato en un escenario real de alta presión.',
        difficulty: 2, xp: '+300 XP', badge: 'Insignia Ventas', color: '#FF4500', glow: 'rgba(255,69,0,0.3)', Icon: Handshake, unlocked: false, requiredLevel: 5,
        company: 'Deloitte Consulting', companyType: 'Consultoría · Empresa real', estimatedTime: '2h 15 min',
        modules: [
            { title: 'Preparación y análisis del cliente', duration: '30 min' },
            { title: 'Reunión inicial y rapport', duration: '25 min' },
            { title: 'Propuesta de valor y cierre', duration: '40 min' },
            { title: 'Gestión de objeciones', duration: '40 min' },
        ],
        skills: ['Negociación', 'Comunicación', 'Ventas B2B', 'Gestión de clientes'],
        level: 'Básico', category: 'Negocios', categoryColor: '#FF4500', categoryIcon: Briefcase,
        description: 'Enfrenta un escenario de consultoría de alto nivel con un cliente exigente. Tu objetivo es cerrar un contrato de servicios gestionando objeciones y adaptando la propuesta en tiempo real.',
    },
    {
        id: 3, title: 'REDISEÑO DE MARCA CORPORATIVA', subtitle: 'Lidera el rebranding de una empresa real.',
        difficulty: 3, xp: '+450 XP', badge: 'Insignia Diseño', color: '#FFA726', glow: 'rgba(255,167,38,0.3)', Icon: Palette, unlocked: false, requiredLevel: 5,
        company: 'Ogilvy & Mather', companyType: 'Agencia creativa · Empresa real', estimatedTime: '3h 45 min',
        modules: [
            { title: 'Auditoría de marca actual', duration: '40 min' },
            { title: 'Brief creativo y moodboard', duration: '35 min' },
            { title: 'Propuesta visual y tipografía', duration: '55 min' },
            { title: 'Presentación al cliente', duration: '55 min' },
        ],
        skills: ['Branding', 'Diseño UI', 'Estrategia creativa', 'Presentaciones'],
        level: 'Intermedio', category: 'Diseño', categoryColor: '#FFA726', categoryIcon: Pen,
        description: 'Asume el rol de Director Creativo en una agencia internacional y rediseña la identidad visual de una marca real. Coordina el equipo, presenta la estrategia y defiende tus decisiones ante el cliente.',
    },
    // Extra catalog-only entries
    {
        id: 4, title: 'EXPANSIÓN AL MERCADO LATAM', subtitle: 'Estrategia de entrada a nuevos mercados.',
        difficulty: 3, xp: '+520 XP', badge: 'Insignia Global', color: '#A78BFA', glow: 'rgba(167,139,250,0.3)', Icon: Globe, unlocked: false, requiredLevel: 8,
        company: 'Rappi', companyType: 'Startup · Empresa real', estimatedTime: '5h 00 min',
        modules: [
            { title: 'Análisis de mercado regional', duration: '60 min' },
            { title: 'Modelo de go-to-market', duration: '70 min' },
            { title: 'Pitch a inversores', duration: '50 min' },
        ],
        skills: ['Estrategia', 'Marketing', 'Finanzas', 'Expansión'],
        level: 'Avanzado', category: 'Negocios', categoryColor: '#FF4500', categoryIcon: Briefcase,
        description: 'Diseña la estrategia de expansión de una startup tech a tres países de Latinoamérica simultáneamente, gestionando presupuesto y equipos locales.',
    },
    {
        id: 5, title: 'AUDITORÍA DE CIBERSEGURIDAD', subtitle: 'Identifica y cierra vulnerabilidades en infraestructura.',
        difficulty: 4, xp: '+600 XP', badge: 'Insignia SecOps', color: '#34D399', glow: 'rgba(52,211,153,0.3)', Icon: Target, unlocked: false, requiredLevel: 10,
        company: 'CrowdStrike', companyType: 'Ciberseguridad · Empresa real', estimatedTime: '6h 30 min',
        modules: [
            { title: 'Reconocimiento y escaneo de red', duration: '80 min' },
            { title: 'Análisis de vulnerabilidades', duration: '90 min' },
            { title: 'Informe ejecutivo', duration: '60 min' },
        ],
        skills: ['Pentesting', 'Seguridad', 'Redes', 'Documentación'],
        level: 'Avanzado', category: 'Tecnología', categoryColor: '#00E5FF', categoryIcon: Cpu,
        description: 'Asume el rol de analista de ciberseguridad y realiza una auditoría completa de la infraestructura de una empresa Fortune 500 bajo restricción de tiempo.',
    },
    {
        id: 6, title: 'CAMPAÑA DE PERFORMANCE MARKETING', subtitle: 'Optimiza un presupuesto de $50k en anuncios digitales.',
        difficulty: 2, xp: '+350 XP', badge: 'Insignia Growth', color: '#FF4500', glow: 'rgba(255,69,0,0.3)', Icon: Flame, unlocked: false, requiredLevel: 4,
        company: 'Meta Business', companyType: 'Big Tech · Empresa real', estimatedTime: '3h 00 min',
        modules: [
            { title: 'Definición de audiencias', duration: '45 min' },
            { title: 'Creación de anuncios A/B', duration: '50 min' },
            { title: 'Optimización en tiempo real', duration: '55 min' },
        ],
        skills: ['Performance', 'Paid Media', 'Analytics', 'Copywriting'],
        level: 'Básico', category: 'Marketing', categoryColor: '#FFA726', categoryIcon: Flame,
        description: 'Gestiona una campaña de publicidad digital con presupuesto real y optimiza el ROAS en tiempo real con datos del simulador de Meta.',
    },
]

const CATEGORIES = ['Todos', 'Tecnología', 'Negocios', 'Diseño', 'Marketing']
const DIFFICULTY_LABELS = { 1: 'Básico', 2: 'Básico', 3: 'Intermedio', 4: 'Avanzado' }

// AI indicator badge
function AIBadge({ active }) {
    return (
        <motion.div
            animate={{ opacity: active ? [0.7, 1, 0.7] : 1 }}
            transition={{ repeat: active ? Infinity : 0, duration: 2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '7px', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '8px', padding: '6px 14px' }}>
            <Brain size={13} color="#A78BFA" strokeWidth={2} />
            <span style={{ fontFamily: 'Inter', fontSize: '0.7rem', fontWeight: 600, color: '#A78BFA' }}>
                {active ? 'IA actualizando preferencias...' : 'Catálogo inteligente'}
            </span>
            {active && (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}>
                    <Sparkles size={11} color="#A78BFA" strokeWidth={2} />
                </motion.div>
            )}
        </motion.div>
    )
}

// Catalog card (grid view)
function CatalogCard({ mission, onSelect }) {
    const CategoryIcon = mission.categoryIcon
    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: `0 12px 36px ${mission.color}25` }}
            onClick={() => onSelect(mission)}
            style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: `2px solid ${mission.color}`, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column' }}>
            {/* Card image area */}
            <div style={{ height: '90px', background: `linear-gradient(135deg, ${mission.color}14 0%, #111 100%)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${mission.color}22` }}>
                <div style={{ position: 'absolute', width: '70px', height: '70px', borderRadius: '50%', background: `radial-gradient(circle, ${mission.glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: `${mission.color}14`, border: `1.5px solid ${mission.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                    <mission.Icon size={22} color={mission.color} strokeWidth={1.8} />
                </div>
                {!mission.unlocked && (
                    <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(4px)', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                        <Lock size={16} color="#666" strokeWidth={2} />
                        <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', fontWeight: 600, color: '#666' }}>Niv. {mission.requiredLevel}</span>
                    </div>
                )}
                <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '4px', background: `${mission.categoryColor}14`, border: `1px solid ${mission.categoryColor}33`, borderRadius: '5px', padding: '2px 8px' }}>
                    <CategoryIcon size={9} color={mission.categoryColor} strokeWidth={2.5} />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', fontWeight: 700, color: mission.categoryColor, letterSpacing: '0.06em' }}>{mission.category.toUpperCase()}</span>
                </div>
            </div>
            {/* Card body */}
            <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.78rem', color: '#e0e0e0', lineHeight: 1.35, letterSpacing: '0.02em' }}>{mission.title}</h3>
                <p style={{ fontFamily: 'Inter', fontSize: '0.73rem', color: '#666', lineHeight: 1.45, flex: 1 }}>{mission.subtitle}</p>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: 'auto' }}>
                    {Array.from({ length: 4 }).map((_, f) => (
                        <Flame key={f} size={11} color={f < mission.difficulty ? '#FF4500' : '#2a2a2a'} fill={f < mission.difficulty ? '#FF4500' : 'none'} strokeWidth={2} />
                    ))}
                    <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: '#555', marginLeft: '4px' }}>{DIFFICULTY_LABELS[mission.difficulty]}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={10} color="#555" strokeWidth={2} />
                        <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: '#555' }}>{mission.estimatedTime}</span>
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', fontWeight: 700, color: '#00E5FF' }}>{mission.xp}</span>
                </div>
            </div>
        </motion.div>
    )
}

function SectionTitle({ icon: Icon, label, color }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '12px' }}>
            <Icon size={13} color={color} strokeWidth={2.5} />
            <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.65rem', color, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</span>
        </div>
    )
}

export default function Screen4Missions({ onStartMission, onNavigate }) {
    const [activeTab, setActiveTab] = useState(0)
    const [centerCard, setCenterCard] = useState(0)
    const [selectedMission, setSelectedMission] = useState(null)
    const [catFilter, setCatFilter] = useState('Todos')
    const [search, setSearch] = useState('')
    const [aiActive, setAiActive] = useState(false)
    const [viewMode, setViewMode] = useState('grid') // grid | list

    const handleCardClick = (mission, idx) => {
        setCenterCard(idx)
        if (mission.unlocked) setSelectedMission(mission)
    }

    const handleCatalogInteract = () => {
        setAiActive(true)
        setTimeout(() => setAiActive(false), 3000)
    }

    const catalogMissions = MISSIONS.filter(m => {
        const matchCat = catFilter === 'Todos' || m.category === catFilter
        const matchSearch = !search || m.title.toLowerCase().includes(search.toLowerCase()) || m.subtitle.toLowerCase().includes(search.toLowerCase())
        return matchCat && matchSearch
    })

    return (
        <div style={{
            minHeight: '100vh', background: '#111111',
            padding: '28px 24px 100px 24px', position: 'relative',
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.02) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <span style={{ fontSize: '0.65rem', fontFamily: 'Inter', color: '#FF4500', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>// Tablón de operaciones</span>
                <h1 style={{ fontSize: '1.8rem', fontFamily: 'Inter', fontWeight: 900 }}>MISIONES ACTIVAS</h1>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                {TABS.map((tab, i) => (
                    <motion.button key={i} onClick={() => setActiveTab(i)}
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        style={{ padding: '8px 18px', borderRadius: '8px', background: activeTab === i ? '#FF4500' : '#1c1c1c', color: activeTab === i ? '#fff' : '#666', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.65rem', cursor: 'pointer', letterSpacing: '0.07em', textTransform: 'uppercase', border: activeTab === i ? 'none' : '1px solid #2a2a2a', boxShadow: activeTab === i ? '0 4px 16px rgba(255,69,0,0.35)' : 'none', transition: 'all 0.25s ease', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {i === 2 && <Brain size={12} strokeWidth={2.5} />}{tab}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* ── MISSIONS CAROUSEL (tabs 0 & 1) */}
                {activeTab < 2 && (
                    <motion.div key="missions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px 0 40px', flexWrap: 'wrap' }}>
                            {MISSIONS.slice(0, 3).map((mission, idx) => {
                                const isCenter = idx === centerCard
                                return (
                                    <motion.div key={mission.id} onClick={() => handleCardClick(mission, idx)}
                                        animate={{ scale: isCenter ? 1.05 : 0.92, y: isCenter ? -8 : 0, opacity: isCenter ? 1 : 0.65 }}
                                        whileHover={{ scale: isCenter ? 1.07 : 0.96 }}
                                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                        style={{ width: '300px', flexShrink: 0, background: '#1c1c1c', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', border: `1px solid ${isCenter ? mission.color + '66' : '#2a2a2a'}`, borderTop: `2px solid ${mission.color}`, boxShadow: isCenter ? `0 0 24px ${mission.glow}, 0 20px 48px rgba(0,0,0,0.6)` : '0 8px 24px rgba(0,0,0,0.5)' }}>
                                        {/* Card top */}
                                        <div style={{ height: '130px', background: `linear-gradient(135deg, ${mission.color}18 0%, rgba(0,0,0,0.5) 100%)`, backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', position: 'relative', borderBottom: `1px solid ${mission.color}33` }}>
                                            <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '50%', background: `radial-gradient(circle, ${mission.glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                                            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${mission.color}14`, border: `1.5px solid ${mission.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                                                <mission.Icon size={26} color={mission.color} strokeWidth={1.8} />
                                            </div>
                                            {!mission.unlocked && (
                                                <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(6px)', background: 'rgba(0,0,0,0.65)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                                    <Lock size={28} color="#666" strokeWidth={2} />
                                                    <span style={{ color: '#666', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.66rem', letterSpacing: '0.07em' }}>REQUIERE NIVEL {mission.requiredLevel}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Card body */}
                                        <div style={{ padding: '16px' }}>
                                            <h3 style={{ fontSize: '0.8rem', marginBottom: '5px', lineHeight: 1.35, fontFamily: 'Inter', fontWeight: 700, color: isCenter ? mission.color : '#e0e0e0' }}>{mission.title}</h3>
                                            <p style={{ color: '#666', fontSize: '0.77rem', marginBottom: '12px', lineHeight: 1.5, fontFamily: 'Inter' }}>{mission.subtitle}</p>
                                            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.63rem', color: '#666', fontFamily: 'Inter', fontWeight: 600, marginRight: '4px' }}>DIFICULTAD:</span>
                                                {Array.from({ length: 3 }).map((_, f) => <Flame key={f} size={13} color={f < mission.difficulty ? '#FF4500' : '#333'} fill={f < mission.difficulty ? '#FF4500' : 'none'} strokeWidth={2} />)}
                                            </div>
                                            <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', borderRadius: '5px', padding: '3px 9px', fontFamily: 'Inter', fontSize: '0.63rem', fontWeight: 700, color: '#00E5FF' }}><Zap size={10} strokeWidth={2.5} /> {mission.xp}</span>
                                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(255,167,38,0.1)', border: '1px solid rgba(255,167,38,0.3)', borderRadius: '5px', padding: '3px 9px', fontFamily: 'Inter', fontSize: '0.63rem', fontWeight: 700, color: '#FFA726' }}><Award size={10} strokeWidth={2.5} /> {mission.badge}</span>
                                            </div>
                                            {mission.unlocked ? (
                                                <motion.button style={{ width: '100%', padding: '11px', borderRadius: '8px', background: isCenter ? '#FF4500' : '#1c1c1c', color: isCenter ? '#fff' : '#666', border: isCenter ? 'none' : '1px solid #333', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer', letterSpacing: '0.09em', textTransform: 'uppercase', boxShadow: isCenter ? '0 4px 14px rgba(255,69,0,0.35)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                                                    whileHover={isCenter ? { background: '#cc3700' } : {}} whileTap={{ scale: 0.97 }}
                                                    onClick={e => { e.stopPropagation(); if (isCenter) setSelectedMission(mission) }}>
                                                    <ChevronRight size={13} strokeWidth={2.5} />{isCenter ? 'VER DETALLES' : 'SELECCIONAR'}
                                                </motion.button>
                                            ) : (
                                                <button style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px dashed #333', background: 'transparent', color: '#555', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.66rem', cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                                    <Lock size={11} /> NIVEL {mission.requiredLevel} REQUERIDO
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </motion.div>
                )}

                {/* ── CATALOG TAB */}
                {activeTab === 2 && (
                    <motion.div key="catalog" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                        {/* AI indicator + filters */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
                            <AIBadge active={aiActive} />

                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1, maxWidth: '600px' }}>
                                {/* Search */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '7px 13px', flex: 1 }}>
                                    <Search size={13} color="#555" strokeWidth={2} />
                                    <input value={search} onChange={e => { setSearch(e.target.value); handleCatalogInteract() }} placeholder="Buscar simulaciones..."
                                        style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Inter', fontSize: '0.78rem', color: '#e0e0e0', flex: 1 }} />
                                </div>
                                {/* View toggle */}
                                <div style={{ display: 'flex', background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '8px', overflow: 'hidden' }}>
                                    {[{ v: 'grid', Icon: Grid }, { v: 'list', Icon: List }].map(({ v, Icon }) => (
                                        <motion.button key={v} onClick={() => setViewMode(v)} whileTap={{ scale: 0.9 }}
                                            style={{ padding: '7px 10px', border: 'none', background: viewMode === v ? 'rgba(255,69,0,0.15)' : 'transparent', color: viewMode === v ? '#FF4500' : '#555', cursor: 'pointer', transition: 'all 0.2s' }}>
                                            <Icon size={14} strokeWidth={2} />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Surprise me */}
                            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={handleCatalogInteract}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.3)', borderRadius: '8px', padding: '7px 14px', fontFamily: 'Inter', fontSize: '0.72rem', fontWeight: 600, color: '#A78BFA', cursor: 'pointer' }}>
                                <Shuffle size={13} strokeWidth={2.5} /> Sugerir algo
                            </motion.button>
                        </div>

                        {/* Category pills */}
                        <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
                            <Filter size={14} color="#555" strokeWidth={2} />
                            {CATEGORIES.map(cat => (
                                <motion.button key={cat} onClick={() => { setCatFilter(cat); handleCatalogInteract() }}
                                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                    style={{ padding: '5px 14px', borderRadius: '20px', border: `1px solid ${catFilter === cat ? '#FF4500' : '#2a2a2a'}`, background: catFilter === cat ? 'rgba(255,69,0,0.12)' : 'transparent', color: catFilter === cat ? '#FF4500' : '#666', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.68rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                                    {cat}
                                </motion.button>
                            ))}
                        </div>

                        {/* Results count */}
                        <p style={{ fontFamily: 'Inter', fontSize: '0.72rem', color: '#555', marginBottom: '16px' }}>
                            {catalogMissions.length} simulaciones disponibles
                        </p>

                        {/* Grid / List */}
                        {viewMode === 'grid' ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
                                {catalogMissions.map(m => (
                                    <CatalogCard key={m.id} mission={m} onSelect={ms => { setSelectedMission(ms); handleCatalogInteract() }} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {catalogMissions.map(m => {
                                    const CatIcon = m.categoryIcon
                                    return (
                                        <motion.div key={m.id} whileHover={{ x: 3, boxShadow: `0 0 16px ${m.color}20` }} onClick={() => { setSelectedMission(m); handleCatalogInteract() }}
                                            style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderLeft: `3px solid ${m.color}`, borderRadius: '10px', padding: '14px 18px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '14px', transition: 'all 0.2s' }}>
                                            <div style={{ width: '40px', height: '40px', flexShrink: 0, borderRadius: '10px', background: `${m.color}14`, border: `1px solid ${m.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <m.Icon size={20} color={m.color} strokeWidth={1.8} />
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'Inter', fontSize: '0.58rem', fontWeight: 700, color: m.categoryColor }}>
                                                        <CatIcon size={9} strokeWidth={2.5} /> {m.category}
                                                    </span>
                                                    {!m.unlocked && <Lock size={10} color="#555" strokeWidth={2} />}
                                                </div>
                                                <h4 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.82rem', color: '#e0e0e0', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.title}</h4>
                                                <p style={{ fontFamily: 'Inter', fontSize: '0.72rem', color: '#666' }}>{m.subtitle}</p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={11} color="#555" strokeWidth={2} /><span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: '#555' }}>{m.estimatedTime}</span></div>
                                                <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', fontWeight: 700, color: '#00E5FF' }}>{m.xp}</span>
                                                <ChevronRight size={14} color="#444" strokeWidth={2} />
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── MISSION DETAIL MODAL */}
            <AnimatePresence>
                {selectedMission && (
                    <>
                        <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedMission(null)}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 100 }} />
                        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 101, pointerEvents: 'none' }}>
                            <motion.div key="modal" initial={{ scale: 0.88, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.88, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                                style={{ width: 'min(720px, 94vw)', maxHeight: '86vh', background: '#181818', border: `1px solid ${selectedMission.color}44`, borderTop: `2px solid ${selectedMission.color}`, borderRadius: '16px', boxShadow: `0 0 60px rgba(0,0,0,0.9), 0 0 40px ${selectedMission.glow}`, display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'all' }}>
                                {/* Header */}
                                <div style={{ padding: '20px 26px 16px', borderBottom: `1px solid ${selectedMission.color}22`, background: '#1c1c1c', flexShrink: 0 }}>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '14px', marginBottom: '14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', flexShrink: 0, background: `${selectedMission.color}14`, border: `1.5px solid ${selectedMission.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <selectedMission.Icon size={24} color={selectedMission.color} strokeWidth={1.8} />
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.6rem', fontFamily: 'Inter', color: selectedMission.color, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 700 }}>{selectedMission.category}</span>
                                                <h2 style={{ fontSize: '1rem', fontFamily: 'Inter', fontWeight: 800, color: '#f5f5f5', lineHeight: 1.3 }}>{selectedMission.title}</h2>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedMission(null)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #2a2a2a', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', flexShrink: 0, color: '#666' }}>
                                            <X size={15} strokeWidth={2.5} />
                                        </button>
                                    </div>
                                    <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
                                        {[{ icon: Clock, label: selectedMission.estimatedTime, color: '#00E5FF' }, { icon: Layers, label: `${selectedMission.modules.length} módulos`, color: '#FFA726' }, { icon: Star, label: selectedMission.level, color: '#FF4500' }].map(({ icon: Icon, label, color }) => (
                                            <div key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: `${color}0f`, border: `1px solid ${color}33`, borderRadius: '6px', padding: '3px 10px', fontFamily: 'Inter', fontSize: '0.68rem', fontWeight: 600, color }}>
                                                <Icon size={11} strokeWidth={2.5} />{label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Body */}
                                <div style={{ overflowY: 'auto', flex: 1, padding: '22px 26px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px 28px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                            <div><SectionTitle icon={ChevronRight} label="Descripción" color={selectedMission.color} /><p style={{ fontSize: '0.82rem', fontFamily: 'Inter', color: '#bbb', lineHeight: 1.7 }}>{selectedMission.description}</p></div>
                                            <div>
                                                <SectionTitle icon={Building2} label="Empresa simulada" color={selectedMission.color} />
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#222', border: '1px solid #2a2a2a', borderRadius: '9px', padding: '12px 14px' }}>
                                                    <div style={{ width: '38px', height: '38px', borderRadius: '9px', flexShrink: 0, background: `${selectedMission.color}12`, border: `1px solid ${selectedMission.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Building2 size={18} color={selectedMission.color} strokeWidth={1.8} /></div>
                                                    <div><p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.85rem', color: '#f5f5f5' }}>{selectedMission.company}</p><p style={{ fontFamily: 'Inter', fontSize: '0.7rem', color: '#666', marginTop: '2px' }}>{selectedMission.companyType}</p></div>
                                                </div>
                                            </div>
                                            <div>
                                                <SectionTitle icon={Star} label="Habilidades" color={selectedMission.color} />
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {selectedMission.skills.map(skill => (
                                                        <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: `${selectedMission.color}0f`, border: `1px solid ${selectedMission.color}33`, borderRadius: '5px', padding: '3px 10px', fontFamily: 'Inter', fontSize: '0.7rem', fontWeight: 500, color: selectedMission.color }}><CheckCircle2 size={10} strokeWidth={2.5} />{skill}</div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <SectionTitle icon={Award} label="Recompensas" color={selectedMission.color} />
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <div style={{ flex: 1, background: 'rgba(0,229,255,0.06)', border: '1px solid rgba(0,229,255,0.2)', borderTop: '2px solid #00E5FF', borderRadius: '8px', padding: '12px', textAlign: 'center' }}><Zap size={16} color="#00E5FF" strokeWidth={2} style={{ marginBottom: '5px' }} /><p style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1rem', color: '#00E5FF' }}>{selectedMission.xp}</p><p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: '#555', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Experiencia</p></div>
                                                    <div style={{ flex: 1, background: 'rgba(255,167,38,0.06)', border: '1px solid rgba(255,167,38,0.2)', borderTop: '2px solid #FFA726', borderRadius: '8px', padding: '12px', textAlign: 'center' }}><Award size={16} color="#FFA726" strokeWidth={2} style={{ marginBottom: '5px' }} /><p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.84rem', color: '#FFA726' }}>{selectedMission.badge}</p><p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: '#555', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Insignia</p></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <SectionTitle icon={Layers} label={`Módulos (${selectedMission.modules.length})`} color={selectedMission.color} />
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                {selectedMission.modules.map((mod, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#222', border: '1px solid #2a2a2a', borderLeft: `3px solid ${selectedMission.color}`, borderRadius: '7px', padding: '10px 12px' }}>
                                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0, background: `${selectedMission.color}15`, border: `1px solid ${selectedMission.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: selectedMission.color }}>{i + 1}</div>
                                                        <p style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '0.8rem', color: '#e0e0e0', flex: 1, lineHeight: 1.4 }}>{mod.title}</p>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}><Clock size={10} color="#555" strokeWidth={2} /><span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: '#555' }}>{mod.duration}</span></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Footer */}
                                <div style={{ padding: '16px 26px', background: '#1c1c1c', borderTop: `1px solid ${selectedMission.color}22`, flexShrink: 0, display: 'flex', alignItems: 'center', gap: '14px' }}>
                                    <button onClick={() => setSelectedMission(null)} style={{ padding: '11px 18px', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#666', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.76rem', cursor: 'pointer' }}>Volver</button>
                                    <motion.button style={{ flex: 1, padding: '13px', borderRadius: '9px', background: '#FF4500', color: '#fff', border: 'none', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.08em', textTransform: 'uppercase', boxShadow: '0 4px 18px rgba(255,69,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                        whileHover={{ background: '#cc3700', boxShadow: '0 6px 26px rgba(255,69,0,0.55)' }} whileTap={{ scale: 0.97 }}
                                        onClick={() => { setSelectedMission(null); onStartMission(selectedMission) }}>
                                        <ArrowRight size={17} strokeWidth={2.5} /> INICIAR MISIÓN
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
