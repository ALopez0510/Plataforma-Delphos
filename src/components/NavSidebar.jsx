import { motion } from 'framer-motion'
import { Map, Target, Users, User2, ChevronRight } from 'lucide-react'

const NAV_ITEMS = [
    { icon: Map, label: 'Dashboard', id: 3 },
    { icon: Target, label: 'Misiones', id: 4 },
    { icon: Users, label: 'Comunidad', id: 7 },
    { icon: User2, label: 'Perfil', id: 8 },
]

/**
 * Shared vertical navigation sidebar used by screens that don't have
 * their own custom sidebar (Screen4Missions, Screen8Profile).
 *
 * Props:
 *   onNavigate  (id: number) => void
 *   activeId    number  — current screen id
 *   compact     boolean — if true, shows icon-only (40px wide) mode
 */
export default function NavSidebar({ onNavigate, activeId, compact = false }) {
    return (
        <aside style={{
            width: compact ? '52px' : '190px',
            flexShrink: 0,
            background: '#181818',
            borderRight: '1px solid #1e1e1e',
            display: 'flex',
            flexDirection: 'column',
            padding: compact ? '16px 6px' : '20px 12px',
            gap: '4px',
            overflow: 'hidden',
            transition: 'width 0.25s ease',
        }}>
            {!compact && (
                <p style={{ fontFamily: 'Inter', fontSize: '0.58rem', fontWeight: 700, color: '#3a3a3a', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px', paddingLeft: '4px' }}>
                    // Navegación
                </p>
            )}

            {NAV_ITEMS.map(item => {
                const Icon = item.icon
                const isActive = item.id === activeId
                return (
                    <motion.button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        whileHover={{ x: compact ? 0 : 3 }}
                        whileTap={{ scale: 0.96 }}
                        title={compact ? item.label : undefined}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: compact ? 0 : '10px',
                            justifyContent: compact ? 'center' : 'flex-start',
                            padding: compact ? '10px' : '10px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: isActive ? 'rgba(255,69,0,0.1)' : 'transparent',
                            borderLeft: compact ? 'none' : `2px solid ${isActive ? '#FF4500' : 'transparent'}`,
                            color: isActive ? '#FF4500' : '#555',
                            cursor: 'pointer',
                            fontFamily: 'Inter',
                            fontWeight: isActive ? 700 : 500,
                            fontSize: '0.78rem',
                            transition: 'all 0.2s',
                            width: '100%',
                        }}
                    >
                        <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                        {!compact && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
                        {!compact && isActive && <ChevronRight size={12} strokeWidth={2.5} style={{ opacity: 0.6 }} />}
                    </motion.button>
                )
            })}
        </aside>
    )
}
