import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api' // Tu puente con el backend
import {
    Flame, Lock, Cloud, Handshake, Palette,
    ChevronRight, X, Clock, Layers, Building2,
    Star, Zap, Award, CheckCircle2, ArrowRight,
    Sparkles, Brain, Filter, Search, Grid, List,
    Cpu, Briefcase, Pen, Globe, Target, Shuffle,
} from 'lucide-react'

const TABS = ['Misiones Principales', 'Misiones Secundarias', 'Explorar catálogo']

// Mapa de iconos para asignar dinámicamente según la categoría de la DB
const ICON_MAP = {
    'Tecnología': Cpu,
    'Negocios': Briefcase,
    'Diseño': Pen,
    'Marketing': Flame,
    'Ciberseguridad': Target,
    'Cloud': Cloud,
};

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
    const CategoryIcon = mission.categoryIcon || Target
    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: `0 12px 36px ${mission.color}25` }}
            onClick={() => onSelect(mission)}
            style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: `2px solid ${mission.color}`, borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column' }}>
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
                <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '4px', background: `${mission.color}14`, border: `1px solid ${mission.color}33`, borderRadius: '5px', padding: '2px 8px' }}>
                    <CategoryIcon size={9} color={mission.color} strokeWidth={2.5} />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', fontWeight: 700, color: mission.color, letterSpacing: '0.06em' }}>{mission.category.toUpperCase()}</span>
                </div>
            </div>
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
    const [viewMode, setViewMode] = useState('grid')

    // ── LÓGICA DE DATOS REALES ──────────────────────────
    const [dbMissions, setDbMissions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMissions = async () => {
            try {
                // El interceptor de api.js maneja el Token automáticamente
                const response = await api.get('/api/v1/simulaciones')

                // Formateamos los datos que vienen del backend para que encajen en tu diseño
                const formatted = response.data.map(m => ({
                    ...m,
                    Icon: ICON_MAP[m.category] || Target,
                    categoryIcon: ICON_MAP[m.category] || Target,
                    glow: `${m.color}44`,
                    unlocked: true, // Esto podría validarse contra el nivel del usuario real
                    requiredLevel: 1,
                    // Aseguramos que modules, skills y rewards no vengan nulos
                    modules: m.modules || [],
                    skills: m.skills || ['Habilidad General'],
                    xp: m.xp || '+100 XP',
                    badge: m.badge || 'Insignia Aurum'
                }))

                setDbMissions(formatted)
            } catch (err) {
                console.error("Error cargando misiones del campus:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchMissions()
    }, [])

    const handleCardClick = (mission, idx) => {
        setCenterCard(idx)
        if (mission.unlocked) setSelectedMission(mission)
    }

    const handleCatalogInteract = () => {
        setAiActive(true)
        setTimeout(() => setAiActive(false), 3000)
    }

    const catalogMissions = dbMissions.filter(m => {
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
                {/* CAROUSEL DINÁMICO */}
                {activeTab < 2 && (
                    <motion.div key="missions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', padding: '10px 0 40px', flexWrap: 'wrap' }}>
                            {loading ? (
                                <p style={{ color: '#444', fontFamily: 'monospace' }}>ESCANEANDO RED DE SIMULACIONES...</p>
                            ) : dbMissions.length > 0 ? (
                                dbMissions.slice(0, 3).map((mission, idx) => {
                                    const isCenter = idx === centerCard
                                    return (
                                        <motion.div key={mission.id} onClick={() => handleCardClick(mission, idx)}
                                            animate={{ scale: isCenter ? 1.05 : 0.92, y: isCenter ? -8 : 0, opacity: isCenter ? 1 : 0.65 }}
                                            whileHover={{ scale: isCenter ? 1.07 : 0.96 }}
                                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                            style={{ width: '300px', flexShrink: 0, background: '#1c1c1c', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', border: `1px solid ${isCenter ? mission.color + '66' : '#2a2a2a'}`, borderTop: `2px solid ${mission.color}`, boxShadow: isCenter ? `0 0 24px ${mission.glow}, 0 20px 48px rgba(0,0,0,0.6)` : '0 8px 24px rgba(0,0,0,0.5)' }}>
                                            <div style={{ height: '130px', background: `linear-gradient(135deg, ${mission.color}18 0%, rgba(0,0,0,0.5) 100%)`, backgroundImage: 'linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '8px', position: 'relative', borderBottom: `1px solid ${mission.color}33` }}>
                                                <div style={{ position: 'absolute', width: '90px', height: '90px', borderRadius: '50%', background: `radial-gradient(circle, ${mission.glow} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                                                <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${mission.color}14`, border: `1.5px solid ${mission.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
                                                    <mission.Icon size={26} color={mission.color} strokeWidth={1.8} />
                                                </div>
                                            </div>
                                            <div style={{ padding: '16px' }}>
                                                <h3 style={{ fontSize: '0.8rem', marginBottom: '5px', lineHeight: 1.35, fontFamily: 'Inter', fontWeight: 700, color: isCenter ? mission.color : '#e0e0e0' }}>{mission.title}</h3>
                                                <p style={{ color: '#666', fontSize: '0.77rem', marginBottom: '12px', lineHeight: 1.5 }}>{mission.subtitle}</p>
                                                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' }}>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)', borderRadius: '5px', padding: '3px 9px', fontFamily: 'Inter', fontSize: '0.63rem', fontWeight: 700, color: '#00E5FF' }}><Zap size={10} strokeWidth={2.5} /> {mission.xp}</span>
                                                </div>
                                                <motion.button style={{ width: '100%', padding: '11px', borderRadius: '8px', background: isCenter ? '#FF4500' : '#1c1c1c', color: isCenter ? '#fff' : '#666', border: isCenter ? 'none' : '1px solid #333', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.7rem', cursor: 'pointer', textTransform: 'uppercase' }}
                                                    whileHover={isCenter ? { background: '#cc3700' } : {}} whileTap={{ scale: 0.97 }}
                                                    onClick={e => { e.stopPropagation(); if (isCenter) setSelectedMission(mission) }}>
                                                    {isCenter ? 'VER DETALLES' : 'SELECCIONAR'}
                                                </motion.button>
                                            </div>
                                        </motion.div>
                                    )
                                })
                            ) : (
                                <p style={{ color: '#555' }}>No hay misiones disponibles actualmente.</p>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* CATÁLOGO DINÁMICO */}
                {activeTab === 2 && (
                    <motion.div key="catalog" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '18px', flexWrap: 'wrap' }}>
                            <AIBadge active={aiActive} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '7px 13px', flex: 1, maxWidth: '600px' }}>
                                <Search size={13} color="#555" />
                                <input value={search} onChange={e => { setSearch(e.target.value); handleCatalogInteract() }} placeholder="Buscar en el catálogo..." style={{ background: 'transparent', border: 'none', outline: 'none', fontFamily: 'Inter', fontSize: '0.78rem', color: '#e0e0e0', flex: 1 }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
                            {catalogMissions.map(m => (
                                <CatalogCard key={m.id} mission={m} onSelect={ms => { setSelectedMission(ms); handleCatalogInteract() }} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DETALLE MODAL (Conectado a onStartMission) */}
            <AnimatePresence>
                {selectedMission && (
                    <>
                        <motion.div key="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedMission(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 100 }} />
                        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 101, pointerEvents: 'none' }}>
                            <motion.div initial={{ scale: 0.88, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.88, opacity: 0, y: 20 }}
                                style={{ width: 'min(720px, 94vw)', maxHeight: '86vh', background: '#181818', border: `1px solid ${selectedMission.color}44`, borderTop: `2px solid ${selectedMission.color}`, borderRadius: '16px', display: 'flex', flexDirection: 'column', overflow: 'hidden', pointerEvents: 'all' }}>

                                <div style={{ padding: '20px 26px 16px', borderBottom: `1px solid ${selectedMission.color}22`, background: '#1c1c1c' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '13px' }}>
                                            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${selectedMission.color}14`, border: `1.5px solid ${selectedMission.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <selectedMission.Icon size={24} color={selectedMission.color} />
                                            </div>
                                            <div>
                                                <span style={{ fontSize: '0.6rem', color: selectedMission.color, fontWeight: 700 }}>{selectedMission.category.toUpperCase()}</span>
                                                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#f5f5f5' }}>{selectedMission.title}</h2>
                                            </div>
                                        </div>
                                        <button onClick={() => setSelectedMission(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}><X size={20} /></button>
                                    </div>
                                </div>

                                <div style={{ overflowY: 'auto', flex: 1, padding: '22px 26px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px' }}>
                                        <div>
                                            <SectionTitle icon={ChevronRight} label="Descripción" color={selectedMission.color} />
                                            <p style={{ fontSize: '0.82rem', color: '#bbb', lineHeight: 1.7 }}>{selectedMission.description}</p>

                                            <div style={{ marginTop: '20px' }}>
                                                <SectionTitle icon={Star} label="Habilidades" color={selectedMission.color} />
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                    {selectedMission.skills.map(s => <div key={s} style={{ fontSize: '0.7rem', color: selectedMission.color, background: `${selectedMission.color}14`, padding: '4px 10px', borderRadius: '5px' }}>{s}</div>)}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <SectionTitle icon={Layers} label="Hoja de ruta" color={selectedMission.color} />
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                                                {selectedMission.modules.map((mod, i) => (
                                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#222', borderRadius: '7px', padding: '10px' }}>
                                                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: selectedMission.color }}>{i + 1}</span>
                                                        <p style={{ fontSize: '0.8rem', color: '#e0e0e0', flex: 1 }}>{mod.title}</p>
                                                        <span style={{ fontSize: '0.65rem', color: '#555' }}>{mod.duration}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ padding: '16px 26px', background: '#1c1c1c', borderTop: `1px solid ${selectedMission.color}22`, display: 'flex', gap: '14px' }}>
                                    <motion.button style={{ flex: 1, padding: '13px', borderRadius: '9px', background: '#FF4500', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}
                                        whileHover={{ background: '#cc3700' }} whileTap={{ scale: 0.97 }}
                                        onClick={() => { onStartMission(selectedMission); setSelectedMission(null); }}>
                                        INICIAR MISIÓN
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