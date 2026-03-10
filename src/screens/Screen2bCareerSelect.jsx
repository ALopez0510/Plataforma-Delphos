import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    CheckCircle2, ArrowRight, RotateCcw, Sparkles,
    Cloud, Handshake, Palette, Cpu, BarChart2, Globe,
    Megaphone, ShieldCheck, Lightbulb, FlaskConical, Brain,
    Heart, Stethoscope, Pill, Activity, Eye, Smile,
    Scale, BookOpen, Building, Landmark, Leaf, Zap,
    Camera, Music, PenTool, Code2, Database, Wifi,
    TrendingUp, DollarSign, Users, Truck, Plane, Home,
    Microscope, Atom, Dna, X,
} from 'lucide-react'

// ── Full career catalog ───────────────────────────────────────────────────────
const CAREERS = [
    // Tecnología
    { id: 'cloud', label: 'Cloud & DevOps', icon: Cloud, color: '#00E5FF', cat: 'Tecnología', affinity: [2, 1, 2] },
    { id: 'software', label: 'Desarrollo de Software', icon: Code2, color: '#00E5FF', cat: 'Tecnología', affinity: [2, 0, 2] },
    { id: 'data', label: 'Data Analytics', icon: BarChart2, color: '#A78BFA', cat: 'Tecnología', affinity: [2, 1, 2] },
    { id: 'ai', label: 'Inteligencia Artificial', icon: Brain, color: '#34D399', cat: 'Tecnología', affinity: [2, 0, 2] },
    { id: 'cybersec', label: 'Ciberseguridad', icon: ShieldCheck, color: '#00E5FF', cat: 'Tecnología', affinity: [2, 1, 1] },
    { id: 'databases', label: 'Bases de Datos', icon: Database, color: '#A78BFA', cat: 'Tecnología', affinity: [2, 0, 1] },
    { id: 'iot', label: 'IoT & Redes', icon: Wifi, color: '#34D399', cat: 'Tecnología', affinity: [2, 0, 2] },
    { id: 'research', label: 'Investigación & I+D', icon: FlaskConical, color: '#34D399', cat: 'Tecnología', affinity: [1, 1, 2] },
    // Negocios
    { id: 'product', label: 'Product Management', icon: Lightbulb, color: '#FFA726', cat: 'Negocios', affinity: [1, 2, 2] },
    { id: 'biz', label: 'Consultoría de Negocios', icon: Handshake, color: '#FF4500', cat: 'Negocios', affinity: [0, 2, 1] },
    { id: 'finance', label: 'Finanzas Corporativas', icon: DollarSign, color: '#FFA726', cat: 'Negocios', affinity: [2, 1, 0] },
    { id: 'marketing', label: 'Growth & Marketing', icon: Megaphone, color: '#FF4500', cat: 'Negocios', affinity: [1, 2, 1] },
    { id: 'intl', label: 'Negocios Internacionales', icon: Globe, color: '#A78BFA', cat: 'Negocios', affinity: [0, 2, 0] },
    { id: 'hr', label: 'Recursos Humanos', icon: Users, color: '#FF4500', cat: 'Negocios', affinity: [0, 2, 1] },
    { id: 'logistics', label: 'Logística & Supply Chain', icon: Truck, color: '#FFA726', cat: 'Negocios', affinity: [1, 1, 1] },
    { id: 'ecommerce', label: 'E-commerce & Retail', icon: TrendingUp, color: '#FF4500', cat: 'Negocios', affinity: [1, 2, 1] },
    { id: 'banking', label: 'Banca & Inversiones', icon: Landmark, color: '#A78BFA', cat: 'Negocios', affinity: [2, 1, 0] },
    { id: 'startup', label: 'Emprendimiento', icon: Zap, color: '#FFA726', cat: 'Negocios', affinity: [1, 2, 2] },
    // Diseño & Creatividad
    { id: 'ux', label: 'UX / Product Design', icon: Palette, color: '#FFA726', cat: 'Diseño', affinity: [0, 1, 2] },
    { id: 'graphic', label: 'Diseño Gráfico', icon: PenTool, color: '#A78BFA', cat: 'Diseño', affinity: [0, 0, 2] },
    { id: 'architecture', label: 'Arquitectura', icon: Building, color: '#FFA726', cat: 'Diseño', affinity: [1, 1, 2] },
    { id: 'interior', label: 'Diseño de Interiores', icon: Home, color: '#FF4500', cat: 'Diseño', affinity: [0, 1, 2] },
    { id: 'photo', label: 'Fotografía & Audiovisual', icon: Camera, color: '#A78BFA', cat: 'Diseño', affinity: [0, 0, 2] },
    { id: 'music', label: 'Producción Musical', icon: Music, color: '#34D399', cat: 'Diseño', affinity: [0, 0, 2] },
    // Salud
    { id: 'medicine', label: 'Medicina', icon: Stethoscope, color: '#34D399', cat: 'Salud', affinity: [2, 1, 1] },
    { id: 'nursing', label: 'Enfermería', icon: Heart, color: '#FF4500', cat: 'Salud', affinity: [0, 2, 1] },
    { id: 'pharmacy', label: 'Farmacia', icon: Pill, color: '#A78BFA', cat: 'Salud', affinity: [2, 1, 1] },
    { id: 'psychology', label: 'Psicología', icon: Smile, color: '#FFA726', cat: 'Salud', affinity: [0, 2, 1] },
    { id: 'nutrition', label: 'Nutrición & Dietética', icon: Leaf, color: '#34D399', cat: 'Salud', affinity: [1, 1, 1] },
    { id: 'physio', label: 'Fisioterapia', icon: Activity, color: '#00E5FF', cat: 'Salud', affinity: [0, 2, 1] },
    { id: 'optometry', label: 'Optometría', icon: Eye, color: '#A78BFA', cat: 'Salud', affinity: [2, 1, 1] },
    { id: 'biomedical', label: 'Ingeniería Biomédica', icon: Dna, color: '#34D399', cat: 'Salud', affinity: [2, 1, 2] },
    { id: 'publichealth', label: 'Salud Pública', icon: Heart, color: '#FF4500', cat: 'Salud', affinity: [0, 2, 1] },
    // Ciencias
    { id: 'bio', label: 'Biología', icon: Microscope, color: '#34D399', cat: 'Ciencias', affinity: [2, 0, 1] },
    { id: 'chem', label: 'Química', icon: FlaskConical, color: '#A78BFA', cat: 'Ciencias', affinity: [2, 0, 2] },
    { id: 'physics', label: 'Física', icon: Atom, color: '#00E5FF', cat: 'Ciencias', affinity: [2, 0, 2] },
    { id: 'env', label: 'Ciencias Ambientales', icon: Leaf, color: '#34D399', cat: 'Ciencias', affinity: [1, 1, 2] },
    { id: 'astro', label: 'Astronomía', icon: Sparkles, color: '#A78BFA', cat: 'Ciencias', affinity: [2, 0, 2] },
    // Ingeniería
    { id: 'civil', label: 'Ingeniería Civil', icon: Building, color: '#FFA726', cat: 'Ingeniería', affinity: [2, 1, 1] },
    { id: 'electro', label: 'Ing. Electrónica', icon: Cpu, color: '#00E5FF', cat: 'Ingeniería', affinity: [2, 0, 2] },
    { id: 'mech', label: 'Ing. Mecánica', icon: Zap, color: '#FF4500', cat: 'Ingeniería', affinity: [2, 0, 1] },
    { id: 'aero', label: 'Ing. Aeronáutica', icon: Plane, color: '#A78BFA', cat: 'Ingeniería', affinity: [2, 0, 2] },
    { id: 'industrial', label: 'Ing. Industrial', icon: TrendingUp, color: '#FFA726', cat: 'Ingeniería', affinity: [2, 1, 1] },
    { id: 'energy', label: 'Ing. de Energía', icon: Zap, color: '#34D399', cat: 'Ingeniería', affinity: [2, 0, 2] },
    // Sociales & Humanidades
    { id: 'law', label: 'Derecho', icon: Scale, color: '#FFA726', cat: 'Social', affinity: [1, 2, 1] },
    { id: 'journalism', label: 'Periodismo & Comunicación', icon: Megaphone, color: '#FF4500', cat: 'Social', affinity: [0, 2, 1] },
    { id: 'education', label: 'Educación & Pedagogía', icon: BookOpen, color: '#34D399', cat: 'Social', affinity: [0, 2, 1] },
    { id: 'polisci', label: 'Ciencias Políticas', icon: Globe, color: '#A78BFA', cat: 'Social', affinity: [0, 2, 1] },
    { id: 'socialwork', label: 'Trabajo Social', icon: Heart, color: '#FF4500', cat: 'Social', affinity: [0, 2, 0] },
    { id: 'tourism', label: 'Turismo & Hotelería', icon: Plane, color: '#FFA726', cat: 'Social', affinity: [0, 2, 1] },
]

const CATS = ['Todas', 'Tecnología', 'Negocios', 'Diseño', 'Salud', 'Ciencias', 'Ingeniería', 'Social']

const CAT_COLORS = {
    'Tecnología': '#00E5FF', 'Negocios': '#FF4500', 'Diseño': '#FFA726',
    'Salud': '#34D399', 'Ciencias': '#A78BFA', 'Ingeniería': '#FFA726', 'Social': '#FF4500',
}

function computeScores(answers) {
    return CAREERS.map(c => {
        let score = 0
        answers.forEach((ans, qi) => { score += ans === 0 ? c.affinity[qi] : (2 - c.affinity[qi]) })
        return { ...c, score }
    }).sort((a, b) => b.score - a.score)
}

// ── Compact career pill ───────────────────────────────────────────────────────
function CareerPill({ career, selected, onToggle, rank }) {
    const Icon = career.icon
    return (
        <motion.button
            onClick={() => onToggle(career.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '9px 12px', borderRadius: '10px', cursor: 'pointer',
                background: selected ? `${career.color}12` : '#1a1a1a',
                border: `1px solid ${selected ? career.color : '#252525'}`,
                transition: 'all 0.18s', textAlign: 'left', width: '100%',
                boxShadow: selected ? `0 0 12px ${career.color}20` : 'none',
            }}
        >
            <div style={{ width: '28px', height: '28px', flexShrink: 0, borderRadius: '7px', background: `${career.color}14`, border: `1px solid ${career.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={14} color={career.color} strokeWidth={1.8} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'Inter', fontWeight: selected ? 700 : 500, fontSize: '0.75rem', color: selected ? career.color : '#c0c0c0', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{career.label}</p>
                {rank <= 3 && <p style={{ fontFamily: 'Inter', fontSize: '0.57rem', color: '#FFA726', fontWeight: 600, marginTop: '1px' }}>#{rank} afinidad</p>}
            </div>
            {selected && <CheckCircle2 size={13} color={career.color} strokeWidth={2.5} style={{ flexShrink: 0 }} />}
        </motion.button>
    )
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Screen2bCareerSelect({ oracleAnswers = [], onConfirm, onBackToOracle }) {
    const ranked = useMemo(() => computeScores(oracleAnswers), [oracleAnswers])
    const [selected, setSelected] = useState(new Set())
    const [activecat, setActiveCat] = useState('Todas')
    const [search, setSearch] = useState('')

    const toggle = (id) => setSelected(prev => {
        const next = new Set(prev)
        next.has(id) ? next.delete(id) : next.add(id)
        return next
    })

    const visible = useMemo(() => ranked.filter(c => {
        const inCat = activecat === 'Todas' || c.cat === activecat
        const inSearch = !search || c.label.toLowerCase().includes(search.toLowerCase()) || c.cat.toLowerCase().includes(search.toLowerCase())
        return inCat && inSearch
    }), [ranked, activecat, search])

    const selectedList = ranked.filter(c => selected.has(c.id))

    return (
        <div style={{ height: '100vh', background: '#111111', display: 'flex', flexDirection: 'column', backgroundImage: 'linear-gradient(rgba(0,229,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.018) 1px, transparent 1px)', backgroundSize: '48px 48px' }}>

            {/* ── HEADER */}
            <div style={{ flexShrink: 0, padding: '20px 28px 16px', borderBottom: '1px solid #1e1e1e', background: '#161616' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '4px' }}>
                            <div style={{ width: '3px', height: '16px', background: '#FF4500', borderRadius: '2px' }} />
                            <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', fontWeight: 700, color: '#FF4500', letterSpacing: '0.14em', textTransform: 'uppercase' }}>El Oráculo ha hablado</span>
                        </div>
                        <h1 style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '1.3rem', color: '#f0f0f0', marginBottom: '2px' }}>Elige tus áreas de interés</h1>
                        <p style={{ fontFamily: 'Inter', fontSize: '0.74rem', color: '#555' }}>Selecciona las que más te llamen la atención — sin límite</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <motion.div animate={{ opacity: [0.65, 1, 0.65] }} transition={{ repeat: Infinity, duration: 2.5 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', border: '1px solid rgba(167,139,250,0.2)', background: 'rgba(167,139,250,0.05)', borderRadius: '7px', padding: '6px 12px' }}>
                            <Sparkles size={11} color="#A78BFA" strokeWidth={2} />
                            <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: '#A78BFA', fontWeight: 600 }}>Ordenado por afinidad con el Oráculo</span>
                        </motion.div>
                        <motion.button onClick={onBackToOracle} whileHover={{ background: 'rgba(255,69,0,0.08)' }} whileTap={{ scale: 0.96 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,69,0,0.25)', background: 'transparent', borderRadius: '7px', padding: '6px 12px', fontFamily: 'Inter', fontSize: '0.65rem', fontWeight: 600, color: '#FF4500', cursor: 'pointer' }}>
                            <RotateCcw size={11} strokeWidth={2.5} /> Más preguntas al Oráculo
                        </motion.button>
                    </div>
                </div>

                {/* Category filters + Search */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                    {CATS.map(cat => {
                        const active = activecat === cat
                        const col = cat === 'Todas' ? '#FF4500' : CAT_COLORS[cat]
                        return (
                            <motion.button key={cat} onClick={() => setActiveCat(cat)} whileTap={{ scale: 0.95 }}
                                style={{ padding: '5px 13px', borderRadius: '20px', border: `1px solid ${active ? col : '#252525'}`, background: active ? `${col}14` : 'transparent', color: active ? col : '#555', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.65rem', cursor: 'pointer', transition: 'all 0.18s' }}>
                                {cat}
                            </motion.button>
                        )
                    })}
                    <div style={{ flex: 1, minWidth: '140px', maxWidth: '220px', position: 'relative' }}>
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar carrera..."
                            style={{ width: '100%', background: '#1a1a1a', border: '1px solid #252525', borderRadius: '7px', padding: '5px 30px 5px 11px', fontFamily: 'Inter', fontSize: '0.72rem', color: '#c0c0c0', outline: 'none' }} />
                        {search && (
                            <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#555', display: 'flex' }}>
                                <X size={12} strokeWidth={2} />
                            </button>
                        )}
                    </div>
                    <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: '#444', marginLeft: 'auto' }}>{visible.length} carreras</span>
                </div>
            </div>

            {/* ── BODY */}
            <div style={{ flex: 1, overflow: 'auto', padding: '16px 28px' }}>
                {visible.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px', color: '#444' }}>
                        <p style={{ fontFamily: 'Inter', fontSize: '0.85rem' }}>Sin resultados para "<strong style={{ color: '#666' }}>{search}</strong>"</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                        {visible.map((career, i) => {
                            const rank = ranked.findIndex(c => c.id === career.id) + 1
                            return <CareerPill key={career.id} career={career} selected={selected.has(career.id)} onToggle={toggle} rank={rank} />
                        })}
                    </div>
                )}
            </div>

            {/* ── FOOTER */}
            <div style={{ flexShrink: 0, background: '#161616', borderTop: '1px solid #1e1e1e', padding: '12px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                    {selected.size > 0 ? (
                        <>
                            <CheckCircle2 size={13} color="#00E5FF" strokeWidth={2.5} />
                            <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.75rem', color: '#00E5FF', flexShrink: 0 }}>
                                {selected.size} seleccionada{selected.size !== 1 ? 's' : ''}
                            </span>
                            <div style={{ display: 'flex', gap: '4px', overflow: 'hidden', flex: 1 }}>
                                <AnimatePresence>
                                    {selectedList.slice(0, 4).map(c => (
                                        <motion.span key={c.id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                                            style={{ fontFamily: 'Inter', fontSize: '0.62rem', fontWeight: 600, color: c.color, background: `${c.color}12`, border: `1px solid ${c.color}28`, borderRadius: '5px', padding: '2px 8px', whiteSpace: 'nowrap' }}>
                                            {c.label}
                                        </motion.span>
                                    ))}
                                    {selected.size > 4 && (
                                        <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: '#555', padding: '2px 6px' }}>+{selected.size - 4} más</span>
                                    )}
                                </AnimatePresence>
                            </div>
                        </>
                    ) : (
                        <span style={{ fontFamily: 'Inter', fontSize: '0.74rem', color: '#3a3a3a' }}>Selecciona al menos un área para continuar</span>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                    <motion.button onClick={onBackToOracle} whileHover={{ color: '#aaa' }} whileTap={{ scale: 0.96 }}
                        style={{ padding: '9px 16px', border: '1px solid #252525', background: 'transparent', borderRadius: '7px', fontFamily: 'Inter', fontSize: '0.72rem', fontWeight: 600, color: '#555', cursor: 'pointer' }}>
                        Continuar con el Oráculo
                    </motion.button>
                    <motion.button disabled={selected.size === 0} onClick={() => onConfirm(selectedList)}
                        whileHover={selected.size > 0 ? { background: '#cc3700', boxShadow: '0 4px 18px rgba(255,69,0,0.5)' } : {}} whileTap={{ scale: 0.97 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 20px', border: 'none', borderRadius: '8px', background: selected.size > 0 ? '#FF4500' : '#252525', color: selected.size > 0 ? '#fff' : '#555', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.78rem', cursor: selected.size > 0 ? 'pointer' : 'not-allowed', boxShadow: selected.size > 0 ? '0 4px 16px rgba(255,69,0,0.4)' : 'none', transition: 'all 0.2s' }}>
                        Ir al Campus <ArrowRight size={14} strokeWidth={2.5} />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
