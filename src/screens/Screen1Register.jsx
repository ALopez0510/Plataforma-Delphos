import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../services/api' // Importante: Asegúrate que la ruta sea correcta
import {
    Eye, EyeOff, User, Mail, Lock, Globe, GraduationCap,
    Briefcase, ChevronDown, ArrowLeft, CheckCircle2, Zap,
} from 'lucide-react'

// ── Reusable styled input ──────────────────────────────────────────────────────
function Field({ label, type = 'text', placeholder, value, onChange, icon: Icon, accentColor = '#00E5FF', rightEl }) {
    const [focused, setFocused] = useState(false)
    return (
        <div>
            {label && <p style={{ fontFamily: 'Inter', fontSize: '0.62rem', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '5px' }}>{label}</p>}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                {Icon && (
                    <Icon size={14} color={focused ? accentColor : '#444'} strokeWidth={2}
                        style={{ position: 'absolute', left: '13px', pointerEvents: 'none', transition: 'color 0.2s' }} />
                )}
                <input type={type} placeholder={placeholder} value={value} onChange={onChange}
                    onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    style={{
                        width: '100%', background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${focused ? accentColor : '#2a2a2a'}`,
                        borderRadius: '8px', padding: Icon ? '11px 40px 11px 37px' : '11px 40px 11px 14px',
                        fontFamily: 'Inter', fontSize: '0.85rem', color: '#e0e0e0', outline: 'none',
                        transition: 'border-color 0.2s', boxShadow: focused ? `0 0 0 3px ${accentColor}14` : 'none',
                    }}
                />
                {rightEl && <div style={{ position: 'absolute', right: '12px' }}>{rightEl}</div>}
            </div>
        </div>
    )
}

// ── Select field ──────────────────────────────────────────────────────────────
function SelectField({ label, value, onChange, options, icon: Icon }) {
    const [focused, setFocused] = useState(false)
    return (
        <div>
            {label && <p style={{ fontFamily: 'Inter', fontSize: '0.62rem', fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '5px' }}>{label}</p>}
            <div style={{ position: 'relative' }}>
                {Icon && <Icon size={14} color={focused ? '#FF4500' : '#444'} strokeWidth={2} style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }} />}
                <select value={value} onChange={onChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    style={{
                        width: '100%', appearance: 'none', background: 'rgba(0,0,0,0.3)',
                        border: `1px solid ${focused ? '#FF4500' : '#2a2a2a'}`, borderRadius: '8px',
                        padding: '11px 36px 11px 37px', fontFamily: 'Inter', fontSize: '0.85rem',
                        color: value ? '#e0e0e0' : '#555', outline: 'none', cursor: 'pointer',
                        boxShadow: focused ? '0 0 0 3px rgba(255,69,0,0.1)' : 'none', transition: 'all 0.2s',
                    }}>
                    {options.map(o => <option key={o.value} value={o.value} style={{ background: '#1c1c1c' }}>{o.label}</option>)}
                </select>
                <ChevronDown size={13} color="#444" strokeWidth={2} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
        </div>
    )
}

const COUNTRIES = [
    '', 'Argentina', 'Bolivia', 'Chile', 'Colombia', 'Costa Rica', 'Cuba',
    'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'México', 'Nicaragua',
    'Panamá', 'Paraguay', 'Perú', 'República Dominicana', 'Uruguay', 'Venezuela',
    'España', 'Estados Unidos', 'Otro',
].map(c => ({ value: c, label: c || 'Selecciona tu país' }))

const ROLES = [
    { value: '', label: 'Selecciona tu rol' },
    { value: 'student', label: 'Estudiante universitario' },
    { value: 'graduate', label: 'Recién graduado' },
    { value: 'professional', label: 'Profesional en activo' },
    { value: 'career_change', label: 'En transición de carrera' },
    { value: 'teacher', label: 'Docente / Académico' },
    { value: 'entrepreneur', label: 'Emprendedor' },
    { value: 'other', label: 'Otro' },
]

const GDPR_TEXT = 'Acepto los Términos de servicio y la Política de privacidad. Entiendo que mis datos serán usados para personalizar mi experiencia en la plataforma.'

// ── Background decorations (shared) ──────────────────────────────────────────
function BgDecorations() {
    return (
        <>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,229,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,69,0,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        </>
    )
}

// ── Logo & header (shared) ────────────────────────────────────────────────────
function CardHeader({ subtitle, title, desc }) {
    return (
        <>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '2px', background: 'linear-gradient(to left, #00E5FF, transparent)', borderRadius: '2px 0 0 0' }} />
            <div style={{ width: '42px', height: '42px', marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.3)', borderRadius: '10px', fontSize: '1.3rem' }}>⬡</div>
            <span style={{ fontSize: '0.6rem', fontFamily: 'Inter', color: '#FF4500', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{subtitle}</span>
            <h1 style={{ fontSize: '1.7rem', lineHeight: '1.15', color: '#f5f5f5', fontFamily: 'Inter', fontWeight: 900, marginBottom: '5px' }}>{title}</h1>
            <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '22px', fontFamily: 'Inter' }}>{desc}</p>
        </>
    )
}

// ── Password input with toggle ────────────────────────────────────────────────
function PasswordField({ label, placeholder, value, onChange, accentColor = '#00E5FF' }) {
    const [show, setShow] = useState(false)
    return (
        <Field label={label} type={show ? 'text' : 'password'} placeholder={placeholder} value={value} onChange={onChange}
            icon={Lock} accentColor={accentColor}
            rightEl={
                <button type="button" onClick={() => setShow(s => !s)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#555', display: 'flex' }}>
                    {show ? <EyeOff size={14} strokeWidth={2} /> : <Eye size={14} strokeWidth={2} />}
                </button>
            }
        />
    )
}

// ── Password strength meter ───────────────────────────────────────────────────
function PasswordStrength({ password }) {
    const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length
    const labels = ['', 'Débil', 'Regular', 'Buena', 'Fuerte']
    const colors = ['#2a2a2a', '#FF4500', '#FFA726', '#00E5FF', '#34D399']
    if (!password) return null
    return (
        <div style={{ marginTop: '-4px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '3px' }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= score ? colors[score] : '#2a2a2a', transition: 'background 0.3s' }} />
                ))}
            </div>
            <p style={{ fontFamily: 'Inter', fontSize: '0.6rem', color: colors[score], textAlign: 'right' }}>{labels[score]}</p>
        </div>
    )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── LOGIN PANEL ───────────────────────────────────────────────────────────────
function LoginPanel({ onNext, onGoRegister }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // LÓGICA DE LOGIN AÑADIDA
    const handleLogin = async () => {
        if (!email || !password) return;
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('username', email);
            params.append('password', password);

            const response = await api.post('/api/v1/token', params, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            if (response.data.access_token) {
                localStorage.setItem('token', response.data.access_token);
                onNext();
            }
        } catch (err) {
            alert(err.response?.data?.detail || "Credenciales incorrectas");
        } finally {
            setLoading(false);
        }
    }

    return (
        <motion.div key="login" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}
            style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: '2px solid #FF4500', borderRadius: '12px', maxWidth: '420px', width: '100%', padding: '36px 32px 28px', position: 'relative', boxShadow: '0 0 40px rgba(255,69,0,0.06), 0 20px 60px rgba(0,0,0,0.6)' }}>
            <CardHeader
                subtitle="// Sistema de acceso"
                title={<>ÚNETE AL<br />CAMPUS</>}
                desc="> Tu aventura profesional empieza aquí"
            />

            <motion.button whileHover={{ borderColor: '#00E5FF', color: '#00E5FF' }} whileTap={{ scale: 0.97 }}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#222', border: '1px solid #2a2a2a', borderRadius: '8px', padding: '12px 24px', fontFamily: 'Inter', fontWeight: 600, fontSize: '0.73rem', letterSpacing: '0.07em', textTransform: 'uppercase', color: '#e0e0e0', cursor: 'pointer', marginBottom: '18px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                Continuar con Google
            </motion.button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', color: '#444', fontSize: '0.72rem', fontFamily: 'Inter', letterSpacing: '0.08em' }}>
                <div style={{ flex: 1, height: '1px', background: '#2a2a2a' }} />o usa tu email<div style={{ flex: 1, height: '1px', background: '#2a2a2a' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <Field type="email" placeholder="Tu correo electrónico..." value={email} onChange={e => setEmail(e.target.value)} icon={Mail} accentColor="#00E5FF" />
                <PasswordField placeholder="Tu contraseña" value={password} onChange={e => setPassword(e.target.value)} accentColor="#FF4500" />
            </div>

            <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'Inter', fontSize: '0.75rem', color: '#00E5FF', cursor: 'pointer', fontWeight: 600 }}>¿Olvidaste tu contraseña?</span>
            </div>

            <motion.button whileHover={{ background: '#cc3700', boxShadow: '0 6px 28px rgba(255,69,0,0.5)' }} whileTap={{ scale: 0.97 }}
                onClick={handleLogin} disabled={loading}
                style={{ width: '100%', background: '#FF4500', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 24px', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.83rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 20px rgba(255,69,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                <Zap size={15} strokeWidth={2.5} /> {loading ? 'SINCRONIZANDO...' : 'Comenzar aventura'}
            </motion.button>

            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#555', fontFamily: 'Inter' }}>
                ¿No tienes cuenta?{' '}
                <motion.span whileHover={{ color: '#FF4500' }} onClick={onGoRegister}
                    style={{ color: '#00E5FF', cursor: 'pointer', fontWeight: 700, transition: 'color 0.2s' }}>
                    Crear cuenta gratis
                </motion.span>
            </p>
        </motion.div>
    )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── REGISTER PANEL ────────────────────────────────────────────────────────────
function RegisterPanel({ onNext, onGoLogin }) {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirm: '', country: '', role: '', birthYear: '', terms: false })
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

    const passwordMatch = form.password && form.confirm && form.password === form.confirm
    const step1Valid = form.firstName && form.lastName && form.role && form.country
    const step2Valid = form.email && form.password.length >= 8 && passwordMatch && form.terms

    // LÓGICA DE REGISTRO AÑADIDA
    const handleSubmit = async () => {
        if (!step2Valid) return;
        setLoading(true);
        try {
            const payload = {
                email: form.email,
                password: form.password,
                full_name: `${form.firstName} ${form.lastName}`,
                username: form.email.split('@')[0],
                role: form.role,
                country: form.country,
                birth_year: parseInt(form.birthYear) || 2000
            };

            await api.post('/api/v1/register', payload);
            setStep(3);
        } catch (err) {
            alert(err.response?.data?.detail || "Error al crear la cuenta");
        } finally {
            setLoading(false);
        }
    }

    const years = Array.from({ length: 60 }, (_, i) => 2010 - i)

    return (
        <motion.div key="register" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.35 }}
            style={{ background: '#1c1c1c', border: '1px solid #2a2a2a', borderTop: '2px solid #FF4500', borderRadius: '12px', maxWidth: step === 3 ? '420px' : '500px', width: '100%', padding: '32px 32px 28px', position: 'relative', boxShadow: '0 0 40px rgba(255,69,0,0.08), 0 20px 60px rgba(0,0,0,0.6)' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '80px', height: '2px', background: 'linear-gradient(to left, #00E5FF, transparent)', borderRadius: '2px 0 0 0' }} />

            {step < 3 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                    {[1, 2].map(s => (
                        <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: step >= s ? '#FF4500' : '#222', border: `1px solid ${step >= s ? '#FF4500' : '#333'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.65rem', color: step >= s ? '#fff' : '#555', transition: 'all 0.3s' }}>{s}</div>
                            <span style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: step === s ? '#e0e0e0' : '#555', fontWeight: step === s ? 600 : 400 }}>{s === 1 ? 'Perfil' : 'Cuenta'}</span>
                            {s < 2 && <div style={{ width: '32px', height: '1px', background: step > s ? '#FF4500' : '#2a2a2a' }} />}
                        </div>
                    ))}
                </div>
            )}

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div style={{ width: '40px', height: '40px', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,69,0,0.12)', border: '1px solid rgba(255,69,0,0.3)', borderRadius: '10px', fontSize: '1.2rem' }}>⬡</div>
                        <span style={{ fontSize: '0.6rem', fontFamily: 'Inter', color: '#FF4500', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>// Nueva cuenta</span>
                        <h2 style={{ fontSize: '1.5rem', lineHeight: 1.2, color: '#f5f5f5', fontFamily: 'Inter', fontWeight: 900, marginBottom: '4px' }}>CUÉNTANOS<br />SOBRE TI</h2>
                        <p style={{ color: '#555', fontSize: '0.78rem', marginBottom: '20px', fontFamily: 'Inter' }}>Paso 1 de 2 — Información personal</p>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ flex: 1 }}><Field label="Nombre" placeholder="María" value={form.firstName} onChange={set('firstName')} icon={User} accentColor="#FF4500" /></div>
                            <div style={{ flex: 1 }}><Field label="Apellido" placeholder="García" value={form.lastName} onChange={set('lastName')} icon={User} accentColor="#FF4500" /></div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <SelectField label="Rol actual" value={form.role} onChange={set('role')} options={ROLES} icon={Briefcase} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <SelectField label="Año de nacimiento" value={form.birthYear}
                                    onChange={set('birthYear')}
                                    options={[{ value: '', label: 'Año' }, ...years.map(y => ({ value: y, label: String(y) }))]}
                                    icon={GraduationCap}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <SelectField label="País" value={form.country} onChange={set('country')} options={COUNTRIES} icon={Globe} />
                        </div>

                        <motion.button onClick={() => step1Valid && setStep(2)}
                            whileHover={step1Valid ? { background: '#cc3700', boxShadow: '0 6px 24px rgba(255,69,0,0.5)' } : {}} whileTap={{ scale: 0.97 }}
                            style={{ width: '100%', background: step1Valid ? '#FF4500' : '#222', color: step1Valid ? '#fff' : '#555', border: step1Valid ? 'none' : '1px solid #2a2a2a', borderRadius: '8px', padding: '13px 24px', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.09em', textTransform: 'uppercase', cursor: step1Valid ? 'pointer' : 'not-allowed', boxShadow: step1Valid ? '0 4px 18px rgba(255,69,0,0.35)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px', transition: 'all 0.2s' }}>
                            Continuar →
                        </motion.button>

                        <p style={{ textAlign: 'center', fontSize: '0.76rem', color: '#555', fontFamily: 'Inter' }}>
                            ¿Ya tienes cuenta?{' '}
                            <motion.span whileHover={{ color: '#FF4500' }} onClick={onGoLogin}
                                style={{ color: '#00E5FF', cursor: 'pointer', fontWeight: 700 }}>
                                Iniciar sesión
                            </motion.span>
                        </p>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <button onClick={() => setStep(1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', color: '#555', fontFamily: 'Inter', fontSize: '0.72rem', padding: 0 }}>
                                <ArrowLeft size={13} strokeWidth={2} /> Volver
                            </button>
                        </div>

                        <span style={{ fontSize: '0.6rem', fontFamily: 'Inter', color: '#FF4500', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', marginBottom: '3px' }}>// Credenciales</span>
                        <h2 style={{ fontSize: '1.5rem', lineHeight: 1.2, color: '#f5f5f5', fontFamily: 'Inter', fontWeight: 900, marginBottom: '4px' }}>CREA TU<br />ACCESO</h2>
                        <p style={{ color: '#555', fontSize: '0.78rem', marginBottom: '18px', fontFamily: 'Inter' }}>Paso 2 de 2 — Seguridad de la cuenta</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '6px' }}>
                            <Field label="Correo electrónico" type="email" placeholder="correo@ejemplo.com" value={form.email} onChange={set('email')} icon={Mail} accentColor="#00E5FF" />
                            <div>
                                <PasswordField label="Contraseña" placeholder="Mínimo 8 caracteres" value={form.password} onChange={set('password')} accentColor="#FF4500" />
                                <PasswordStrength password={form.password} />
                            </div>
                            <PasswordField label="Confirmar contraseña" placeholder="Repite tu contraseña" value={form.confirm} onChange={set('confirm')} accentColor={passwordMatch ? '#34D399' : '#FF4500'} />
                            {form.confirm && !passwordMatch && (
                                <p style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: '#FF4500', marginTop: '-4px' }}>Las contraseñas no coinciden</p>
                            )}
                            {passwordMatch && (
                                <p style={{ fontFamily: 'Inter', fontSize: '0.65rem', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '-4px' }}>
                                    <CheckCircle2 size={11} strokeWidth={2.5} /> Las contraseñas coinciden
                                </p>
                            )}
                        </div>

                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginBottom: '18px', marginTop: '10px' }}>
                            <div onClick={() => setForm(f => ({ ...f, terms: !f.terms }))}
                                style={{ width: '18px', height: '18px', flexShrink: 0, borderRadius: '5px', border: `1px solid ${form.terms ? '#FF4500' : '#333'}`, background: form.terms ? 'rgba(255,69,0,0.15)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px', cursor: 'pointer', transition: 'all 0.2s' }}>
                                {form.terms && <CheckCircle2 size={12} color="#FF4500" strokeWidth={2.5} />}
                            </div>
                            <span style={{ fontFamily: 'Inter', fontSize: '0.72rem', color: '#666', lineHeight: 1.5 }}>
                                {GDPR_TEXT.split('Términos de servicio').map((part, i, arr) => (
                                    <span key={i}>{part}{i < arr.length - 1 && <span style={{ color: '#00E5FF', fontWeight: 600 }}>Términos de servicio</span>}</span>
                                ))}
                            </span>
                        </label>

                        <motion.button onClick={handleSubmit} disabled={!step2Valid || loading}
                            whileHover={step2Valid ? { background: '#cc3700', boxShadow: '0 6px 24px rgba(255,69,0,0.5)' } : {}} whileTap={{ scale: 0.97 }}
                            style={{ width: '100%', background: step2Valid ? '#FF4500' : '#222', color: step2Valid ? '#fff' : '#555', border: step2Valid ? 'none' : '1px solid #2a2a2a', borderRadius: '8px', padding: '13px 24px', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.09em', textTransform: 'uppercase', cursor: step2Valid ? 'pointer' : 'not-allowed', boxShadow: step2Valid ? '0 4px 18px rgba(255,69,0,0.35)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px', transition: 'all 0.2s' }}>
                            <Zap size={14} strokeWidth={2.5} /> {loading ? 'CREANDO...' : 'Crear mi cuenta'}
                        </motion.button>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '16px 0' }}>
                        <motion.div animate={{ scale: [1, 1.15, 1], boxShadow: ['0 0 0px rgba(52,211,153,0)', '0 0 32px rgba(52,211,153,0.5)', '0 0 0px rgba(52,211,153,0)'] }} transition={{ duration: 1.5, repeat: 2 }}
                            style={{ width: '72px', height: '72px', margin: '0 auto 20px', borderRadius: '50%', background: 'rgba(52,211,153,0.12)', border: '2px solid #34D399', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircle2 size={34} color="#34D399" strokeWidth={2} />
                        </motion.div>
                        <span style={{ fontSize: '0.6rem', fontFamily: 'Inter', color: '#34D399', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>// Cuenta creada</span>
                        <h2 style={{ fontSize: '1.6rem', fontFamily: 'Inter', fontWeight: 900, color: '#f5f5f5', marginBottom: '8px' }}>¡BIENVENIDO<br />AL CAMPUS!</h2>
                        <p style={{ fontFamily: 'Inter', fontSize: '0.82rem', color: '#666', lineHeight: 1.6, marginBottom: '26px' }}>
                            Hola, <strong style={{ color: '#e0e0e0' }}>{form.firstName}</strong>. Tu perfil ha sido creado exitosamente. Ahora el Oráculo te guiará para descubrir tu camino profesional.
                        </p>
                        <motion.button onClick={onNext}
                            whileHover={{ background: '#cc3700', boxShadow: '0 6px 28px rgba(255,69,0,0.5)' }} whileTap={{ scale: 0.97 }}
                            style={{ width: '100%', background: '#FF4500', color: '#fff', border: 'none', borderRadius: '8px', padding: '14px 24px', fontFamily: 'Inter', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', boxShadow: '0 4px 20px rgba(255,69,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Zap size={15} strokeWidth={2.5} /> Comenzar aventura
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ══════════════════════════════════════════════════════════════════════════════
// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function Screen1Register({ onNext }) {
    const [mode, setMode] = useState('login')

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: '#111111', position: 'relative', overflow: 'hidden' }}>
            <BgDecorations />
            <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                <AnimatePresence mode="wait">
                    {mode === 'login'
                        ? <LoginPanel key="login" onNext={onNext} onGoRegister={() => setMode('register')} />
                        : <RegisterPanel key="register" onNext={onNext} onGoLogin={() => setMode('login')} />
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}