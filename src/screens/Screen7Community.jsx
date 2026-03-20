import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api' // Tu puente con el backend
import {
    Hash, Users, MessageSquare, ThumbsUp, Pin,
    Plus, Search, ChevronRight, Zap, Trophy,
    TrendingUp, Cpu, Briefcase, Palette, BookOpen,
    Sword, X, Send, Volume2,
} from 'lucide-react'

// Mapeo de iconos para categorías reales
const ICON_MAP = { 'tech': Cpu, 'biz': Briefcase, 'design': Palette, 'resources': BookOpen, 'debates': Sword };

function ThreadCard({ thread, color, onClick }) {
    const [liked, setLiked] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            whileHover={{ boxShadow: `0 0 18px ${color}20`, x: 2 }}
            onClick={onClick}
            style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderLeft: `3px solid ${thread.pinned ? color : '#2a2a2a'}`, borderRadius: '10px', padding: '16px 18px', cursor: 'pointer', transition: 'all 0.2s', marginBottom: '10px' }}
        >
            <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                <div style={{ width: '36px', height: '36px', flexShrink: 0, borderRadius: '9px', background: `${color}18`, border: `1.5px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontWeight: 800, fontSize: '0.68rem', color: color }}>
                    {thread.initials || (thread.author && thread.author.substring(0, 2).toUpperCase())}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <h4 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.85rem', color: '#f0f0f0' }}>{thread.title}</h4>
                        <span style={{ fontFamily: 'Inter', fontSize: '0.62rem', color: '#555' }}>{thread.time}</span>
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: '#888', lineHeight: 1.5 }}>{thread.body}</p>
                </div>
            </div>
        </motion.div>
    )
}

export default function Screen7Community({ onNavigate }) {
    const [activeServer, setActiveServer] = useState(null)
    const [activeChannel, setActiveChannel] = useState(null)
    const [servers, setServers] = useState([])
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    // --- CARGA DE DATOS REALES ---
    useEffect(() => {
        const fetchCommunityData = async () => {
            try {
                // 1. Cargar Ranking (Usuarios de la DB)
                const resUsers = await api.get('/api/v1/users');
                const sorted = resUsers.data.sort((a, b) => b.xp_total - a.xp_total);
                setLeaderboard(sorted);

                // 2. Cargar Servidores (Categorías de la DB)
                const resCats = await api.get('/api/v1/categories');
                if (resCats.data.length > 0) {
                    const formatted = resCats.data.map(cat => ({
                        id: cat.id, label: cat.name, color: cat.color || '#00E5FF',
                        Icon: ICON_MAP[cat.slug] || Cpu,
                        channels: [
                            { id: `gen-${cat.id}`, name: 'general', icon: Hash, unread: 0 },
                            { id: `ann-${cat.id}`, name: 'anuncios', icon: Volume2, unread: 0 }
                        ]
                    }));
                    setServers(formatted);
                    setActiveServer(formatted[0]);
                    setActiveChannel(formatted[0].channels[0]);
                }
            } catch (err) {
                console.error("Modo offline: Backend vacío");
            } finally {
                setLoading(false);
            }
        };
        fetchCommunityData();
    }, []);

    return (
        <div style={{ height: '100vh', background: '#111111', display: 'flex', overflow: 'hidden' }}>

            {/* ── SERVERS RAIL */}
            <div style={{ width: '64px', flexShrink: 0, background: '#0e0e0e', borderRight: '1px solid #1e1e1e', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: '8px' }}>
                {servers.map(server => {
                    const Icon = server.Icon; const isActive = activeServer?.id === server.id;
                    return (
                        <motion.button key={server.id} onClick={() => { setActiveServer(server); setActiveChannel(server.channels[0]); }}
                            whileHover={{ scale: 1.1 }}
                            style={{ width: '44px', height: '44px', borderRadius: isActive ? '12px' : '22px', background: isActive ? `${server.color}20` : '#1c1c1c', border: `1.5px solid ${isActive ? server.color : '#2a2a2a'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s' }}>
                            <Icon size={20} color={isActive ? server.color : '#555'} />
                        </motion.button>
                    )
                })}
                <div style={{ width: '32px', height: '1px', background: '#2a2a2a', margin: '4px 0' }} />
                <motion.button style={{ width: '44px', height: '44px', borderRadius: '22px', background: '#1c1c1c', border: '1.5px dashed #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Plus size={18} color="#444" />
                </motion.button>
            </div>

            {/* ── CHANNELS SIDEBAR */}
            <div style={{ width: '200px', flexShrink: 0, background: '#161616', borderRight: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column' }}>
                <div style={{ padding: '16px 14px', borderBottom: '1px solid #2a2a2a', background: '#1a1a1a' }}>
                    <h3 style={{ fontWeight: 800, fontSize: '0.8rem', color: '#f5f5f5' }}>{activeServer ? activeServer.label : 'CANALES'}</h3>
                </div>
                <div style={{ flex: 1, padding: '12px 8px' }}>
                    {activeServer ? activeServer.channels.map(channel => (
                        <button key={channel.id} onClick={() => setActiveChannel(channel)}
                            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '7px', padding: '8px', borderRadius: '6px', border: 'none', background: activeChannel?.id === channel.id ? `${activeServer.color}14` : 'transparent', color: activeChannel?.id === channel.id ? '#f0f0f0' : '#666', cursor: 'pointer', fontSize: '0.78rem' }}>
                            <channel.icon size={14} color={activeChannel?.id === channel.id ? activeServer.color : '#555'} />
                            {channel.name}
                        </button>
                    )) : (
                        <p style={{ color: '#444', fontSize: '0.7rem', padding: '10px' }}>Sin canales activos</p>
                    )}
                </div>
            </div>

            {/* ── THREADS FEED */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <div style={{ padding: '14px 22px', borderBottom: '1px solid #2a2a2a', background: '#181818', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                        <Hash size={18} color={activeServer ? activeServer.color : '#FF4500'} />
                        <h2 style={{ fontWeight: 800, fontSize: '0.95rem', color: '#f5f5f5' }}>{activeChannel ? activeChannel.name : 'lobby'}</h2>
                    </div>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>
                    {!activeServer ? (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Zap size={40} color="#FF4500" strokeWidth={1} style={{ marginBottom: '16px', opacity: 0.5 }} />
                            <h3 style={{ color: '#eee', marginBottom: '8px' }}>¡Bienvenido al Campus Estudiantil!</h3>
                            <p style={{ color: '#555', fontSize: '0.85rem', maxWidth: '300px' }}>Parece que aún no te has unido a ninguna comunidad profesional.</p>
                            <button onClick={() => onNavigate(4)} style={{ marginTop: '20px', background: '#FF4500', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Explorar Comunidades</button>
                        </div>
                    ) : (
                        <ThreadCard thread={{ title: 'Bienvenidos al servidor', body: `Acabas de entrar al canal de ${activeServer.label}. Aquí podrás colaborar con otros estudiantes.`, author: 'Sistema', time: 'ahora' }} color={activeServer.color} />
                    )}
                </div>
            </main>

            {/* ── RIGHT PANEL: LEADERBOARD REAL */}
            <aside style={{ width: '236px', flexShrink: 0, background: '#161616', borderLeft: '1px solid #2a2a2a', padding: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                    <Trophy size={14} color="#FFA726" />
                    <h4 style={{ fontSize: '0.65rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Top Estudiantes</h4>
                </div>
                {leaderboard.length > 0 ? leaderboard.slice(0, 8).map((user, i) => (
                    <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '10px' }}>
                        <span style={{ fontWeight: 900, color: i === 0 ? '#FFA726' : '#333', fontSize: '0.7rem', minWidth: '16px' }}>#{i + 1}</span>
                        <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: '#222', border: `1px solid ${i === 0 ? '#FFA726' : '#2a2a2a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eee', fontSize: '0.6rem', fontWeight: 700 }}>
                            {user.username.substring(0, 2).toUpperCase()}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontSize: '0.75rem', color: '#ddd', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 600 }}>{user.username}</p>
                            <p style={{ fontSize: '0.6rem', color: '#00E5FF' }}>{user.xp_total} XP</p>
                        </div>
                    </div>
                )) : <p style={{ color: '#333', fontSize: '0.7rem' }}>Cargando ranking...</p>}
            </aside>
        </div>
    )
}