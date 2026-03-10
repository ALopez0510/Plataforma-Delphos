import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Send, Sparkles, Bot, Upload, FileText, X, Paperclip,
    CheckCircle2, HelpCircle, Lightbulb
} from 'lucide-react'

const INITIAL_MESSAGES = [
    { from: 'ai', text: '// SISTEMA ACTIVO — Soy Mentora Ana. Estoy aquí para guiarte en la redacción de tu contrato de arrendamiento. ¿Por dónde empezamos?' },
    { from: 'ai', text: 'PROTOCOLO: Recuerda incluir: (1) datos de las partes, (2) descripción del inmueble, (3) duración y renta mensual.' },
]

const QUICK_PILLS = [
    { label: 'No entiendo el paso 2', icon: HelpCircle },
    { label: 'Dame una pista', icon: Lightbulb },
    { label: '¿Cómo lo empiezo?', icon: Sparkles },
]

const CONTRACT_PLACEHOLDER = `// CONTRATO DE ARRENDAMIENTO v1.0
// ================================

ARRENDADOR: [Nombre completo]
DNI/NIE: ___________

ARRENDATARIO: [Nombre completo]
DNI/NIE: ___________

/* === CLÁUSULA 1: OBJETO === */
El arrendador cede en arrendamiento
el inmueble ubicado en: [Dirección]

/* === CLÁUSULA 2: DURACIÓN === */
Inicio: _______    Fin: _______

/* === CLÁUSULA 3: RENTA === */
Renta mensual: €_______
Día de pago:   ___

/* === CLÁUSULA 4: FIANZA === */
Importe: €_______  (= ___ mensualidades)

/* === CLÁUSULA 5: SUMINISTROS === */
Agua / Luz / Gas a cargo de: _______

...`

export default function Screen5Workspace({ onNext }) {
    const [messages, setMessages] = useState(INITIAL_MESSAGES)
    const [inputText, setInputText] = useState('')
    const [contractText, setContractText] = useState(CONTRACT_PLACEHOLDER)
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [activeTab, setActiveTab] = useState('editor')   // 'editor' | 'uploads'
    const chatEndRef = useRef(null)
    const fileInputRef = useRef(null)

    useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

    const sendMessage = (text) => {
        if (!text.trim()) return
        setMessages(prev => [...prev, { from: 'user', text }])
        setInputText('')
        setTimeout(() => {
            setMessages(prev => [...prev, {
                from: 'ai',
                text: '// RESPUESTA: Excelente punto. Asegúrate de que los datos sean legibles y verificados con documentación oficial.'
            }])
        }, 1000)
    }

    const handleFiles = (files) => {
        const arr = Array.from(files).map(f => ({
            name: f.name,
            size: (f.size / 1024).toFixed(1) + ' KB',
            type: f.type,
            id: Date.now() + Math.random(),
        }))
        setUploadedFiles(prev => [...prev, ...arr])
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)
        handleFiles(e.dataTransfer.files)
    }

    const removeFile = (id) => setUploadedFiles(prev => prev.filter(f => f.id !== id))

    const getFileIcon = (type) => {
        if (type?.includes('pdf')) return { color: '#FF4500', ext: 'PDF' }
        if (type?.includes('word') || type?.includes('document')) return { color: '#00E5FF', ext: 'DOC' }
        if (type?.includes('sheet') || type?.includes('excel')) return { color: '#4ade80', ext: 'XLS' }
        if (type?.includes('image')) return { color: '#FFA726', ext: 'IMG' }
        return { color: '#888', ext: 'FILE' }
    }

    return (
        <div style={{ height: '100vh', display: 'flex', background: '#111111', overflow: 'hidden' }}>

            {/* ── LEFT: EDITOR + UPLOADS */}
            <div style={{
                flex: '0 0 60%', background: '#0d0d0d',
                display: 'flex', flexDirection: 'column',
                borderRight: '1px solid #2a2a2a', position: 'relative'
            }}>
                {/* Tab bar */}
                <div style={{
                    padding: '0 28px', borderBottom: '1px solid #2a2a2a',
                    background: '#181818',
                    display: 'flex', alignItems: 'center', gap: '0'
                }}>
                    {/* Window dots */}
                    <div style={{ display: 'flex', gap: '6px', marginRight: '20px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF4500', boxShadow: '0 0 5px #FF4500' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFA726', boxShadow: '0 0 5px #FFA726' }} />
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00E5FF', boxShadow: '0 0 5px #00E5FF' }} />
                    </div>

                    {/* Tabs */}
                    {[
                        { key: 'editor', label: 'REDACCIÓN', icon: FileText },
                        { key: 'uploads', label: 'DOCUMENTOS', icon: Paperclip, badge: uploadedFiles.length || null },
                    ].map(tab => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.key
                        return (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '7px',
                                    padding: '14px 18px', borderRadius: '0', border: 'none', cursor: 'pointer',
                                    background: 'transparent',
                                    color: isActive ? '#e0e0e0' : '#555',
                                    borderBottom: isActive ? '2px solid #FF4500' : '2px solid transparent',
                                    fontFamily: 'Inter', fontWeight: 600, fontSize: '0.7rem',
                                    letterSpacing: '0.06em', textTransform: 'uppercase',
                                    transition: 'all 0.2s', whiteSpace: 'nowrap',
                                    position: 'relative',
                                }}
                            >
                                <Icon size={13} strokeWidth={2.2} />
                                {tab.label}
                                {tab.badge ? (
                                    <span style={{
                                        background: '#FF4500', color: '#fff',
                                        borderRadius: '9999px', minWidth: '16px', height: '16px',
                                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.6rem', fontWeight: 700, padding: '0 4px',
                                    }}>{tab.badge}</span>
                                ) : null}
                            </button>
                        )
                    })}

                    <span className="neon-chip neon-chip-cyan" style={{ marginLeft: 'auto' }}>EN PROGRESO</span>
                </div>

                {/* EDITOR TAB */}
                {activeTab === 'editor' && (
                    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                        {/* Line numbers */}
                        <div style={{
                            width: '48px', background: '#0a0a0a', borderRight: '1px solid #2a2a2a',
                            display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
                            padding: '28px 8px', fontFamily: 'monospace',
                            fontSize: '0.72rem', lineHeight: '1.8', userSelect: 'none', flexShrink: 0, overflow: 'hidden'
                        }}>
                            {Array.from({ length: 30 }, (_, i) => (
                                <div key={i} style={{ color: i % 5 === 0 ? '#FF4500' : '#333', opacity: i % 5 === 0 ? 0.8 : 0.5 }}>
                                    {String(i + 1).padStart(2, '0')}
                                </div>
                            ))}
                        </div>
                        {/* Textarea */}
                        <textarea value={contractText} onChange={e => setContractText(e.target.value)}
                            style={{
                                flex: 1, padding: '28px 22px', border: 'none', outline: 'none',
                                fontFamily: 'monospace', fontSize: '0.85rem',
                                lineHeight: '1.8', color: '#00E5FF', resize: 'none',
                                background: 'transparent', letterSpacing: '0.02em', caretColor: '#FF4500',
                            }}
                        />
                    </div>
                )}

                {/* UPLOADS TAB */}
                {activeTab === 'uploads' && (
                    <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Drop zone */}
                        <motion.div
                            onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            animate={{ borderColor: isDragging ? '#FF4500' : '#2a2a2a', background: isDragging ? 'rgba(255,69,0,0.05)' : 'rgba(0,229,255,0.02)' }}
                            style={{
                                border: '2px dashed #2a2a2a', borderRadius: '12px',
                                padding: '40px 24px', cursor: 'pointer',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: '12px', transition: 'all 0.2s',
                                position: 'relative', overflow: 'hidden',
                            }}
                        >
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '14px',
                                background: 'rgba(255,69,0,0.1)', border: '1.5px solid rgba(255,69,0,0.3)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <Upload size={26} color="#FF4500" strokeWidth={1.8} />
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <p style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '0.9rem', color: '#e0e0e0', marginBottom: '4px' }}>
                                    Arrastra documentos aquí
                                </p>
                                <p style={{ fontFamily: 'Inter', fontSize: '0.78rem', color: '#555' }}>
                                    o haz clic para seleccionar — PDF, DOC, DOCX, XLSX, IMG
                                </p>
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png"
                                style={{ display: 'none' }}
                                onChange={e => handleFiles(e.target.files)}
                            />
                        </motion.div>

                        {/* Uploaded file list */}
                        {uploadedFiles.length > 0 && (
                            <div>
                                <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.7rem', color: '#555', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                                    ARCHIVOS CARGADOS — {uploadedFiles.length}
                                </p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {uploadedFiles.map(file => {
                                        const { color, ext } = getFileIcon(file.type)
                                        return (
                                            <motion.div key={file.id}
                                                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: '12px',
                                                    background: '#1c1c1c', border: '1px solid #2a2a2a',
                                                    borderLeft: `3px solid ${color}`,
                                                    borderRadius: '8px', padding: '10px 14px',
                                                }}
                                            >
                                                <div style={{
                                                    width: '34px', height: '34px', borderRadius: '7px', flexShrink: 0,
                                                    background: `${color}14`, border: `1px solid ${color}33`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                }}>
                                                    <FileText size={16} color={color} strokeWidth={2} />
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.82rem', color: '#e0e0e0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        {file.name}
                                                    </p>
                                                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
                                                        <span style={{ fontSize: '0.62rem', fontFamily: 'Inter', fontWeight: 700, color, background: `${color}15`, border: `1px solid ${color}33`, borderRadius: '4px', padding: '1px 6px' }}>{ext}</span>
                                                        <span style={{ fontSize: '0.72rem', color: '#555', fontFamily: 'Inter' }}>{file.size}</span>
                                                    </div>
                                                </div>
                                                <CheckCircle2 size={14} color="#4ade80" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                                                <button onClick={() => removeFile(file.id)} style={{
                                                    background: 'transparent', border: 'none', cursor: 'pointer', padding: '2px',
                                                    display: 'flex', alignItems: 'center', flexShrink: 0,
                                                }}>
                                                    <X size={14} color="#555" strokeWidth={2.5} />
                                                </button>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {uploadedFiles.length === 0 && (
                            <p style={{ textAlign: 'center', color: '#333', fontSize: '0.78rem', fontFamily: 'Inter' }}>
                                Aún no has cargado ningún documento.
                            </p>
                        )}
                    </div>
                )}

                {/* Submit FAB */}
                <motion.button onClick={onNext}
                    whileHover={{ scale: 1.08, boxShadow: '0 0 24px rgba(255,69,0,0.6)' }}
                    whileTap={{ scale: 0.92 }}
                    style={{
                        position: 'absolute', bottom: '24px', right: '24px',
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '12px 20px', borderRadius: '10px',
                        border: 'none', background: '#FF4500',
                        cursor: 'pointer', color: '#fff',
                        fontFamily: 'Inter', fontWeight: 700, fontSize: '0.78rem',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        boxShadow: '0 4px 20px rgba(255,69,0,0.4)',
                    }}
                    title="Enviar tarea"
                >
                    <Sparkles size={16} strokeWidth={2.5} />
                    Enviar tarea
                </motion.button>
            </div>

            {/* ── RIGHT: AI CHAT */}
            <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', background: '#111111' }}>
                {/* Chat header */}
                <div style={{
                    padding: '14px 18px', background: '#181818', borderBottom: '1px solid #2a2a2a',
                    display: 'flex', alignItems: 'center', gap: '12px',
                }}>
                    <div style={{
                        width: '42px', height: '42px',
                        background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)',
                        borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                        <Bot size={20} color="#00E5FF" strokeWidth={2.5} />
                    </div>
                    <div>
                        <h4 style={{ fontSize: '0.85rem', fontFamily: 'Inter', fontWeight: 700, color: '#f5f5f5', letterSpacing: '0.04em' }}>MENTORA ANA</h4>
                        <p style={{ fontSize: '0.7rem', color: '#00E5FF', fontFamily: 'Inter' }}>● EN LÍNEA · IA ESPECIALIZADA</p>
                    </div>
                </div>

                {/* Messages */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {messages.map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start', gap: '8px', alignItems: 'flex-end' }}
                        >
                            {msg.from === 'ai' && (
                                <div style={{ width: '26px', height: '26px', flexShrink: 0, border: '1px solid rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.08)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Bot size={13} color="#00E5FF" />
                                </div>
                            )}
                            <div style={{
                                maxWidth: '76%',
                                background: msg.from === 'user' ? 'rgba(255,69,0,0.12)' : '#1c1c1c',
                                color: msg.from === 'user' ? '#FF4500' : '#e0e0e0',
                                border: msg.from === 'user' ? '1px solid rgba(255,69,0,0.35)' : '1px solid #2a2a2a',
                                borderLeft: msg.from === 'ai' ? '3px solid #00E5FF' : undefined,
                                borderRight: msg.from === 'user' ? '3px solid #FF4500' : undefined,
                                borderRadius: '8px',
                                padding: '10px 14px',
                                fontSize: '0.8rem', lineHeight: '1.6', fontFamily: 'Inter',
                            }}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Quick pills */}
                <div style={{ padding: '8px 14px 4px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {QUICK_PILLS.map((pill, i) => {
                        const Icon = pill.icon
                        return (
                            <motion.button key={i} onClick={() => sendMessage(pill.label)}
                                whileHover={{ borderColor: '#00E5FF', color: '#00E5FF' }} whileTap={{ scale: 0.95 }}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '5px',
                                    padding: '5px 12px', borderRadius: '6px',
                                    border: '1px solid #2a2a2a', background: 'transparent',
                                    fontSize: '0.72rem', fontFamily: 'Inter', color: '#666',
                                    cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                <Icon size={11} strokeWidth={2.5} />
                                {pill.label}
                            </motion.button>
                        )
                    })}
                </div>

                {/* Input */}
                <div style={{ padding: '12px 14px', background: '#181818', borderTop: '1px solid #2a2a2a', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input type="text" className="input-field" placeholder="> Escribe tu consulta..."
                        value={inputText} onChange={e => setInputText(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && sendMessage(inputText)}
                        style={{ flex: 1 }}
                    />
                    <motion.button onClick={() => sendMessage(inputText)}
                        whileHover={{ scale: 1.1, boxShadow: '0 0 14px rgba(0,229,255,0.4)' }} whileTap={{ scale: 0.9 }}
                        style={{
                            width: '42px', height: '42px', borderRadius: '8px',
                            border: '1px solid rgba(0,229,255,0.35)',
                            background: 'rgba(0,229,255,0.08)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                        }}
                    >
                        <Send size={16} color="#00E5FF" strokeWidth={2.5} />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}
