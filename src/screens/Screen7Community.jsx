import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Hash, Users, MessageSquare, ThumbsUp, Pin,
    Plus, Search, ChevronRight, Zap, Trophy,
    TrendingUp, Cpu, Briefcase, Palette, BookOpen,
    Sword, X, Send, Volume2,
} from 'lucide-react'

// ── Data ────────────────────────────────────────────────

const SERVERS = [
    {
        id: 'tech', label: 'Tecnología', color: '#00E5FF', Icon: Cpu,
        channels: [
            { id: 'general-tech', name: 'general', icon: Hash, pinned: false, unread: 3 },
            { id: 'cloud-aws', name: 'cloud-y-aws', icon: Hash, pinned: false, unread: 7 },
            { id: 'dev-tools', name: 'herramientas-dev', icon: Hash, pinned: false, unread: 0 },
            { id: 'announcements-tech', name: 'anuncios', icon: Volume2, pinned: true, unread: 1 },
        ],
    },
    {
        id: 'biz', label: 'Negocios', color: '#FF4500', Icon: Briefcase,
        channels: [
            { id: 'general-biz', name: 'general', icon: Hash, pinned: false, unread: 5 },
            { id: 'sales', name: 'ventas-y-negociacion', icon: Hash, pinned: false, unread: 0 },
            { id: 'consulting', name: 'consultoria', icon: Hash, pinned: false, unread: 2 },
        ],
    },
    {
        id: 'design', label: 'Diseño', color: '#FFA726', Icon: Palette,
        channels: [
            { id: 'general-des', name: 'general', icon: Hash, pinned: false, unread: 0 },
            { id: 'branding', name: 'branding', icon: Hash, pinned: false, unread: 4 },
            { id: 'ux-ui', name: 'ux-ui', icon: Hash, pinned: false, unread: 1 },
        ],
    },
    {
        id: 'resources', label: 'Recursos', color: '#A78BFA', Icon: BookOpen,
        channels: [
            { id: 'templates', name: 'plantillas', icon: Hash, pinned: false, unread: 0 },
            { id: 'readings', name: 'lecturas-recomendadas', icon: Hash, pinned: false, unread: 2 },
        ],
    },
    {
        id: 'debates', label: 'Debates', color: '#34D399', Icon: Sword,
        channels: [
            { id: 'sim-reviews', name: 'reviews-de-simulaciones', icon: Hash, pinned: false, unread: 8 },
            { id: 'hot-takes', name: 'hot-takes', icon: Hash, pinned: false, unread: 3 },
        ],
    },
]

const makeThreads = (channelId) => {
    const MAP = {
        'general-tech': [
            { id: 1, author: 'María P.', initials: 'MP', color: '#00E5FF', time: 'hace 2 min', title: '¿Alguien terminó el despliegue AWS?', body: 'Completé el módulo 4 con 100% en costos. ¿Hay alguien en el 5 ya?', likes: 12, replies: 8, pinned: false },
            { id: 2, author: 'Carlos R.', initials: 'CR', color: '#FF4500', time: 'hace 18 min', title: 'Tips para la instancia EC2', body: 'Recuerden usar t3.micro para las pruebas iniciales, ahorra mucho del presupuesto de la simulación.', likes: 24, replies: 15, pinned: true },
            { id: 3, author: 'Diego M.', initials: 'DM', color: '#FFA726', time: 'hace 1 h', title: 'Error en el balanceo de carga', body: 'Me aparece timeout en el ALB, ¿alguien lo resolvió ya?', likes: 5, replies: 22, pinned: false },
        ],
        'cloud-aws': [
            { id: 4, author: 'Sandra V.', initials: 'SV', color: '#A78BFA', time: 'hace 5 min', title: 'Guía rápida IAM roles', body: 'Hice un resumen de los roles necesarios para la simulación. Lo comparto acá.', likes: 44, replies: 6, pinned: true },
            { id: 5, author: 'Luis T.', initials: 'LT', color: '#34D399', time: 'hace 2 h', title: 'S3 policies: mi experiencia', body: 'Tardé 40 min en la política correcta. Acá mi solución.', likes: 18, replies: 11, pinned: false },
        ],
        'general-biz': [
            { id: 6, author: 'Ana G.', initials: 'AG', color: '#FF4500', time: 'hace 10 min', title: 'Estrategia para el cliente difícil', body: 'En el módulo de negociación hay un cliente que siempre rechaza la primera oferta. La clave es esperar.', likes: 31, replies: 19, pinned: false },
        ],
        'sim-reviews': [
            { id: 7, author: 'María P.', initials: 'MP', color: '#00E5FF', time: 'hace 30 min', title: 'Review: Despliegue en la Nube ⭐⭐⭐⭐⭐', body: 'La mejor simulación hasta ahora. Los escenarios de fallo son muy realistas y el feedback de la IA impresiona.', likes: 67, replies: 34, pinned: true },
            { id: 8, author: 'Carlos R.', initials: 'CR', color: '#FFA726', time: 'hace 3 h', title: 'Review: Negociación VIP ⭐⭐⭐⭐', body: 'Muy buena, aunque siento que el cliente podría ser más impredecible. La progresión de módulos está perfecta.', likes: 29, replies: 17, pinned: false },
        ],
    }
    return MAP[channelId] || [
        { id: 99, author: 'Sistema', initials: 'DAO', color: '#FF4500', time: 'ahora', title: 'Canal recién creado', body: 'Sé el primero en publicar algo aquí.', likes: 0, replies: 0, pinned: false },
    ]
}

const ACTIVE_MEMBERS = [
    { name: 'María P.', initials: 'MP', color: '#00E5FF', status: 'En simulación AWS' },
    { name: 'Carlos R.', initials: 'CR', color: '#FF4500', status: 'Revisando feedback' },
    { name: 'Ana G.', initials: 'AG', color: '#FFA726', status: 'Leyendo recursos' },
    { name: 'Diego M.', initials: 'DM', color: '#A78BFA', status: 'En misión activa' },
    { name: 'Sandra V.', initials: 'SV', color: '#34D399', status: 'Online' },
]

// ── Components ───────────────────────────────────────────

function ThreadCard({ thread, color, onClick }) {
    const [liked, setLiked] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            whileHover={{ boxShadow: `0 0 18px ${color}20`, x: 2 }}
            onClick={onClick}
            style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderLeft: `3px solid ${thread.pinned ? color : '#2a2a2a'}`, borderRadius: '10px', padding: '16px 18px', cursor: 'pointer', transition: 'all 0.2s' }}
        >
            {thread.pinned && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                    <Pin size={10} color={color} strokeWidth={2.5} />
                    <span style={{ fontFamily: 'Inter', fontSize: '0.58rem', fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Fijado</span>
                </div>
            )}
            <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', flexShrink: 0, borderRadius: '9px', background: `${thread.color}18`, border: `1.5px solid ${thread.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontWeight: 800, fontSize: '0.68rem', color: thread.color }}>{thread.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <h4 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.85rem', color: '#f0f0f0', lineHeight: 1.3 }}>{thread.title}</h4>
                        <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: '#555', flexShrink: 0, marginLeft: '12px' }}>{thread.time}</span>
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: '#888', lineHeight: 1.5, marginBottom: '12px' }}>{thread.body}</p>
                    <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                        <motion.button
                            onClick={e => { e.stopPropagation(); setLiked(!liked) }}
                            whileTap={{ scale: 1.3 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '5px', border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'Inter', fontSize: '0.72rem', fontWeight: 600, color: liked ? '#FF4500' : '#555', transition: 'all 0.2s', padding: 0 }}
                        >
                            <ThumbsUp size={12} fill={liked ? 'currentColor' : 'none'} strokeWidth={2} /> {thread.likes + (liked ? 1 : 0)}
                        </motion.button>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Inter', fontSize: '0.72rem', color: '#555' }}>
                            <MessageSquare size={12} strokeWidth={2} /> {thread.replies} respuestas
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default function Screen7Community({ onNavigate }) {
    const [activeServer, setActiveServer] = useState(SERVERS[0])
    const [activeChannel, setActiveChannel] = useState(SERVERS[0].channels[0])
    const [showNewThread, setShowNewThread] = useState(false)
    const [draft, setDraft] = useState('')
    const [draftTitle, setDraftTitle] = useState('')
    const [threads, setThreads] = useState({})
    const [search, setSearch] = useState('')

    const getThreads = (channelId) => threads[channelId] || makeThreads(channelId)

    const handleSwitchServer = (server) => {
        setActiveServer(server)
        setActiveChannel(server.channels[0])
    }

    const handlePost = () => {
        if (!draftTitle.trim()) return
        const newThread = {
            id: Date.now(), author: 'Tú', initials: 'TÚ', color: '#00E5FF', time: 'ahora mismo',
            title: draftTitle.trim(), body: draft.trim() || '(sin cuerpo)', likes: 0, replies: 0, pinned: false,
        }
        setThreads(prev => ({ ...prev, [activeChannel.id]: [newThread, ...getThreads(activeChannel.id)] }))
        setDraftTitle(''); setDraft(''); setShowNewThread(false)
    }

    const displayed = getThreads(activeChannel.id).filter(t =>
        !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.body.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div style={{ height: '100vh', background: '#111111', display: 'flex', overflow: 'hidden' }}>

            {/* ── SERVERS RAIL (far left, icon-only) */}
            <div style={{ width: '64px', flexShrink: 0, background: '#0e0e0e', borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: '8px', overflowY: 'auto' }}>
                {SERVERS.map(server => {
                    const Icon = server.Icon
                    const isActive = activeServer.id === server.id
                    return (
                        <div key={server.id} style={{ position: 'relative' }}>
                            {/* Unread dot */}
                            {server.channels.some(c => c.unread > 0) && !isActive && (
                                <div style={{ position: 'absolute', left: -2, top: '50%', transform: 'translateY(-50%)', width: '4px', height: '16px', background: '#e0e0e0', borderRadius: '0 3px 3px 0' }} />
                            )}
                            <motion.button
                                onClick={() => handleSwitchServer(server)}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                                title={server.label}
                                style={{ width: '44px', height: '44px', borderRadius: isActive ? '12px' : '22px', background: isActive ? `${server.color}20` : '#1c1c1c', border: `1.5px solid ${isActive ? server.color : '#2a2a2a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.25s', boxShadow: isActive ? `0 0 14px ${server.color}40` : 'none' }}
                            >
                                <Icon size={20} color={isActive ? server.color : '#555'} strokeWidth={1.8} />
                            </motion.button>
                        </div>
                    )
                })}
                <div style={{ width: '32px', height: '1px', background: '#2a2a2a', margin: '4px 0' }} />
                {/* Add server placeholder */}
                <motion.button whileHover={{ scale: 1.1, background: 'rgba(0,229,255,0.08)' }} whileTap={{ scale: 0.95 }}
                    style={{ width: '44px', height: '44px', borderRadius: '22px', background: '#1c1c1c', border: '1.5px dashed #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <Plus size={18} color="#444" strokeWidth={2} />
                </motion.button>
            </div>

            {/* ── CHANNELS SIDEBAR */}
            <div style={{ width: '200px', flexShrink: 0, background: '#161616', borderRight: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Server header */}
                <div style={{ padding: '16px 14px', borderBottom: '1px solid #2a2a2a', background: '#1a1a1a', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: `${activeServer.color}18`, border: `1.5px solid ${activeServer.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <activeServer.Icon size={16} color={activeServer.color} strokeWidth={2} />
                        </div>
                        <div>
                            <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '0.8rem', color: '#f5f5f5' }}>{activeServer.label}</h3>
                            <span style={{ fontSize: '0.58rem', color: '#555', fontFamily: 'Inter' }}>{activeServer.channels.length} canales</span>
                        </div>
                    </div>
                </div>

                {/* Channel list */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
                    <p style={{ fontSize: '0.58rem', fontFamily: 'Inter', fontWeight: 700, color: '#444', textTransform: 'uppercase', letterSpacing: '0.12em', paddingLeft: '6px', marginBottom: '6px' }}>Canales</p>
                    {activeServer.channels.map(channel => {
                        const Icon = channel.icon
                        const isActive = activeChannel.id === channel.id
                        return (
                            <motion.button key={channel.id} onClick={() => setActiveChannel(channel)}
                                whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}
                                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 9px', borderRadius: '6px', border: 'none', background: isActive ? `${activeServer.color}14` : 'transparent', color: isActive ? '#f0f0f0' : '#666', cursor: 'pointer', fontFamily: 'Inter', fontSize: '0.78rem', fontWeight: isActive ? 600 : 400, transition: 'all 0.15s', marginBottom: '2px', position: 'relative' }}>
                                <Icon size={14} strokeWidth={isActive ? 2.5 : 2} color={isActive ? activeServer.color : '#555'} />
                                <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{channel.name}</span>
                                {channel.unread > 0 && !isActive && (
                                    <span style={{ minWidth: '18px', height: '18px', borderRadius: '9px', background: '#FF4500', fontFamily: 'Inter', fontSize: '0.58rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{channel.unread}</span>
                                )}
                            </motion.button>
                        )
                    })}
                </div>
            </div>

            {/* ── THREADS FEED (center) */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
                {/* Thread header */}
                <div style={{ padding: '14px 22px', borderBottom: '1px solid #2a2a2a', background: '#181818', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        <Hash size={18} color={activeServer.color} strokeWidth={2.5} />
                        <h2 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '0.95rem', color: '#f5f5f5' }}>{activeChannel.name}</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flex: 1, maxWidth: '340px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1c1c1c', border: '1px solid #2a2a2a', borderRadius: '7px', padding: '7px 12px', flex: 1 }}>
                            <Search size={13} color="#555" strokeWidth={2} />
                            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar en el canal..."
                                style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1, fontFamily: 'Inter', fontSize: '0.75rem', color: '#e0e0e0' }} />
                        </div>
                        <motion.button onClick={() => setShowNewThread(true)}
                            whileHover={{ background: '#cc3700', scale: 1.02 }} whileTap={{ scale: 0.97 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FF4500', border: 'none', borderRadius: '7px', padding: '8px 14px', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.72rem', color: '#fff', cursor: 'pointer', letterSpacing: '0.04em', boxShadow: '0 3px 12px rgba(255,69,0,0.35)', whiteSpace: 'nowrap' }}>
                            <Plus size={13} strokeWidth={2.5} /> Nuevo hilo
                        </motion.button>
                    </div>
                </div>

                {/* Thread list */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
                    <AnimatePresence initial={false}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {displayed.map((thread, i) => (
                                <ThreadCard key={thread.id} thread={thread} color={activeServer.color} onClick={() => { }} />
                            ))}
                        </div>
                    </AnimatePresence>
                </div>
            </main>

            {/* ── RIGHT PANEL */}
            <aside style={{ width: '236px', flexShrink: 0, background: '#161616', borderLeft: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                {/* Active members */}
                <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid #2a2a2a', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                        <Users size={13} color="#00E5FF" strokeWidth={2.5} />
                        <h4 style={{ fontFamily: 'Inter', fontSize: '0.65rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Activos ahora — {ACTIVE_MEMBERS.length}</h4>
                    </div>
                    {ACTIVE_MEMBERS.map((m, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '9px' }}>
                            <div style={{ position: 'relative', flexShrink: 0 }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: `${m.color}18`, border: `1px solid ${m.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.6rem', color: m.color }}>{m.initials}</div>
                                <div style={{ position: 'absolute', bottom: -1, right: -1, width: '9px', height: '9px', borderRadius: '50%', background: '#34D399', border: '2px solid #161616' }} />
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.74rem', color: '#ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</p>
                                <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.status}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trending topics */}
                <div style={{ padding: '14px', flex: 1, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                        <TrendingUp size={13} color="#FF4500" strokeWidth={2.5} />
                        <h4 style={{ fontFamily: 'Inter', fontSize: '0.65rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Trending esta semana</h4>
                    </div>
                    {['#DespliegueAWS', '#NegociaciónVIP', '#BrandingDay', '#CloudFirst', '#TeamLeader'].map((tag, i) => (
                        <motion.div key={i} whileHover={{ x: 3 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 4px', borderBottom: i < 4 ? '1px solid #1e1e1e' : 'none', cursor: 'pointer', transition: 'all 0.15s' }}>
                            <Hash size={11} color="#444" strokeWidth={2} />
                            <span style={{ fontFamily: 'Inter', fontSize: '0.76rem', color: '#00E5FF', fontWeight: 500 }}>{tag.replace('#', '')}</span>
                        </motion.div>
                    ))}

                    {/* Leaderboard quickview */}
                    <div style={{ marginTop: '18px', background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: '2px solid #FFA726', borderRadius: '9px', padding: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                            <Trophy size={12} color="#FFA726" strokeWidth={2.5} />
                            <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', fontWeight: 700, color: '#FFA726', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Top esta semana</span>
                        </div>
                        {[{ n: 'María P.', xp: '12,450 XP', c: '#FFA726', i: 'MP' }, { n: 'Carlos R.', xp: '9,820 XP', c: '#e0e0e0', i: 'CR' }, { n: 'Laura M.', xp: '8,100 XP', c: '#FF6B35', i: 'LM' }].map((u, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '7px' }}>
                                <span style={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '0.72rem', color: u.c, minWidth: '16px' }}>#{i + 1}</span>
                                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#222', border: `1px solid ${u.c}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.55rem', color: u.c, flexShrink: 0 }}>{u.i}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.7rem', color: '#ddd' }}>{u.n}</p>
                                    <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: u.c }}>{u.xp}</p>
                                </div>
                                {i === 0 && <Zap size={11} color="#FFA726" strokeWidth={2} />}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* ── NEW THREAD MODAL */}
            <AnimatePresence>
                {showNewThread && (
                    <>
                        <motion.div key="nt-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => { setShowNewThread(false); setDraft(''); setDraftTitle('') }}
                            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', zIndex: 100 }} />
                        <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 101, pointerEvents: 'none' }}>
                            <motion.div key="nt-modal" initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: 'spring', damping: 26, stiffness: 300 }}
                                style={{ width: 'min(560px, 94vw)', background: '#181818', border: `1px solid ${activeServer.color}44`, borderTop: `2px solid ${activeServer.color}`, borderRadius: '16px', boxShadow: `0 0 60px rgba(0,0,0,0.9), 0 0 30px ${activeServer.color}15`, overflow: 'hidden', pointerEvents: 'all' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 22px', borderBottom: '1px solid #2a2a2a', background: '#1c1c1c' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Hash size={15} color={activeServer.color} strokeWidth={2.5} />
                                        <h3 style={{ fontFamily: 'Inter', fontWeight: 800, fontSize: '0.88rem', color: '#f5f5f5' }}>Nuevo hilo en #{activeChannel.name}</h3>
                                    </div>
                                    <button onClick={() => { setShowNewThread(false); setDraft(''); setDraftTitle('') }}
                                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #2a2a2a', borderRadius: '7px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', color: '#666' }}>
                                        <X size={14} strokeWidth={2.5} />
                                    </button>
                                </div>
                                <div style={{ padding: '18px 22px' }}>
                                    <input value={draftTitle} onChange={e => setDraftTitle(e.target.value)} placeholder="Título del hilo..."
                                        style={{ width: '100%', background: '#222', border: '1px solid #333', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.88rem', color: '#f5f5f5', outline: 'none', marginBottom: '10px', boxSizing: 'border-box' }} />
                                    <textarea value={draft} onChange={e => setDraft(e.target.value)} placeholder="Explica tu pregunta, comparte un recurso, abre un debate..." rows={5}
                                        style={{ width: '100%', background: '#222', border: '1px solid #333', borderRadius: '8px', padding: '10px 14px', fontFamily: 'Inter', fontSize: '0.84rem', color: '#e0e0e0', outline: 'none', resize: 'none', lineHeight: 1.6, boxSizing: 'border-box' }} />
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '14px', gap: '10px' }}>
                                        <button onClick={() => { setShowNewThread(false); setDraft(''); setDraftTitle('') }}
                                            style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #333', background: 'transparent', color: '#666', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer' }}>Cancelar</button>
                                        <motion.button onClick={handlePost} disabled={!draftTitle.trim()}
                                            whileHover={draftTitle.trim() ? { background: '#cc3700' } : {}} whileTap={draftTitle.trim() ? { scale: 0.97 } : {}}
                                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 20px', borderRadius: '8px', border: 'none', background: draftTitle.trim() ? '#FF4500' : '#2a2a2a', color: draftTitle.trim() ? '#fff' : '#555', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.78rem', cursor: draftTitle.trim() ? 'pointer' : 'not-allowed', boxShadow: draftTitle.trim() ? '0 3px 14px rgba(255,69,0,0.4)' : 'none', transition: 'all 0.2s' }}>
                                            <Send size={13} strokeWidth={2.5} /> Publicar hilo
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}
