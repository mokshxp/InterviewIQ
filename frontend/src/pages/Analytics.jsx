import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell,
    CartesianGrid,
} from 'recharts'
import PageWrapper, { FadeUp } from '../components/layout/PageWrapper.jsx'
import { analyticsApi } from '../services/api.js'

const COLORS = ['var(--amber)', 'var(--emerald)', 'var(--sky)', 'var(--rose)', '#A855F7', '#F97316']

export default function Analytics() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        analyticsApi.get()
            .then(r => setData(r))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <LoadingGrid />
    if (error) return (
        <PageWrapper>
            <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--rose)' }}>
                <p style={{ fontSize: '3rem', marginBottom: 12 }}>⚠️</p>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>Connection Error</h2>
                <p style={{ maxWidth: 400, margin: '8px auto', color: 'var(--text-1)' }}>{error}</p>
            </div>
        </PageWrapper>
    )

    // Data fallbacks (ensure [] triggers mock data)
    const scoreTrend = (data?.score_trend?.length > 0) ? data.score_trend : MOCK_TREND
    const codingStats = (data?.coding_success_rate?.length > 0) ? data.coding_success_rate : MOCK_CODING
    const topicStrength = (data?.topic_strength?.length > 0) ? data.topic_strength : MOCK_TOPICS
    const weakHeatmap = (data?.weak_topics?.length > 0) ? data.weak_topics : MOCK_WEAK
    const readiness = data?.readiness_pct ?? 64

    return (
        <PageWrapper>
            <div style={{ position: 'relative' }}>
                {/* Visual Orbs */}
                <div className="orb orb-amber" style={{ width: 400, height: 400, top: -150, right: -50, opacity: 0.1, filter: 'blur(100px)', pointerEvents: 'none', position: 'absolute' }} />
                
                <FadeUp>
                    <div style={{ marginBottom: 40 }}>
                        <p style={{ fontFamily: 'Fira Code, monospace', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                            Performance Intelligence
                        </p>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 36, fontWeight: 800, color: 'var(--text-0)', letterSpacing: '-0.02em', margin: 0 }}>
                            Career Analytics
                        </h1>
                    </div>
                </FadeUp>

                {/* Quick Stats Grid */}
                <FadeUp>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
                        <QuickStat label="Interview Readiness" value={`${readiness}%`} color="var(--amber)" icon="⚡" />
                        <QuickStat label="Total Sessions" value={data?.total_sessions ?? '0'} color="var(--sky)" icon="📊" />
                        <QuickStat label="Average Score" value={data?.average_score != null ? `${data.average_score}/100` : '—'} color="var(--emerald)" icon="🎯" />
                        <QuickStat label="Peak Performance" value={data?.best_score != null ? `${data.best_score}/100` : '—'} color="var(--rose)" icon="🏆" />
                    </div>
                </FadeUp>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 32 }}>
                    {/* Score Trend Chart */}
                    <FadeUp className="card" style={{ padding: 28, background: 'var(--bg-1)', borderRadius: 24, border: '1px solid var(--border-md)', gridColumn: 'span 2' }}>
                        <div style={{ marginBottom: 24 }}>
                            <p style={SECTION_LABEL}>Score Progression</p>
                            <h3 style={SECTION_TITLE}>Trend Analysis</h3>
                        </div>
                        <div style={{ height: 260, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={scoreTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                    <XAxis dataKey="session" tick={{ fill: 'var(--text-2)', fontSize: 11, fontFamily: 'Fira Code' }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-2)', fontSize: 11, fontFamily: 'Fira Code' }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<ChartTooltip />} />
                                    <Line
                                        type="monotone" dataKey="score" stroke="var(--amber)" strokeWidth={3}
                                        dot={{ r: 5, fill: 'var(--amber)', stroke: 'var(--bg-1)', strokeWidth: 2 }}
                                        activeDot={{ r: 7, fill: 'var(--accent)', stroke: 'var(--bg-0)', strokeWidth: 3 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </FadeUp>

                    {/* Topic Distribution */}
                    <FadeUp className="card" style={{ padding: 28, background: 'var(--bg-1)', borderRadius: 24, border: '1px solid var(--border-md)' }}>
                         <div style={{ marginBottom: 20 }}>
                            <p style={SECTION_LABEL}>Skill Breakdown</p>
                            <h3 style={SECTION_TITLE}>Topic Strengths</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                            <div style={{ width: '50%', height: 200 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={topicStrength} dataKey="score" cx="50%" cy="50%" outerRadius={80} innerRadius={50} paddingAngle={4}>
                                            {topicStrength.map((_, i) => (
                                                <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<ChartTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {topicStrength.slice(0, 5).map((t, i) => (
                                    <div key={t.topic} style={{ display: 'grid', gridTemplateColumns: '12px 1fr 32px', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i % COLORS.length] }} />
                                        <span style={{ fontSize: 12, color: 'var(--text-1)', fontWeight: 500 }}>{t.topic}</span>
                                        <span style={{ fontSize: 12, color: 'var(--text-0)', fontFamily: 'Fira Code', fontWeight: 600 }}>{t.score}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </FadeUp>

                    {/* Coding Proficiency */}
                    <FadeUp className="card" style={{ padding: 28, background: 'var(--bg-1)', borderRadius: 24, border: '1px solid var(--border-md)' }}>
                         <div style={{ marginBottom: 24 }}>
                            <p style={SECTION_LABEL}>Technical Depth</p>
                            <h3 style={SECTION_TITLE}>Coding Mastery</h3>
                        </div>
                        <div style={{ height: 200, width: '100%' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={codingStats} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                    <XAxis dataKey="session" tick={{ fill: 'var(--text-2)', fontSize: 11, fontFamily: 'Fira Code' }} axisLine={false} tickLine={false} />
                                    <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-2)', fontSize: 11, fontFamily: 'Fira Code' }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<ChartTooltip suffix="%" />} />
                                    <Bar dataKey="rate" fill="var(--emerald)" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </FadeUp>
                </div>

                {/* Weakness Heatmap */}
                <FadeUp className="card" style={{ padding: 28, background: 'var(--bg-1)', borderRadius: 24, border: '1px solid var(--border-md)', marginBottom: 32 }}>
                    <div style={{ marginBottom: 24 }}>
                        <p style={SECTION_LABEL}>Growth Opportunities</p>
                        <h3 style={SECTION_TITLE}>Concept Focus Areas</h3>
                        <p style={{ fontSize: 13, color: 'var(--text-2)', marginTop: 4 }}>Topics requiring focused review based on common interview gaps.</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
                        {weakHeatmap.map((t, i) => {
                            const intensity = Math.max(0.15, 1 - (t.score / 100))
                            return (
                                <motion.div
                                    key={t.topic}
                                    whileHover={{ y: -4, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                                    style={{
                                        padding: '16px 12px', borderRadius: 16, textAlign: 'center', transition: 'all 0.2s',
                                        background: `rgba(251,113,133,${intensity * 0.15})`,
                                        border: `1px solid rgba(251,113,133,${intensity * 0.3})`,
                                    }}
                                >
                                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-1)', marginBottom: 6 }}>{t.topic}</p>
                                    <p style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Fira Code', color: 'var(--rose)' }}>{t.score}%</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </FadeUp>
            </div>
        </PageWrapper>
    )
}

const SECTION_LABEL = { fontFamily: 'Fira Code, monospace', fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4 }
const SECTION_TITLE = { fontFamily: 'Outfit, sans-serif', fontSize: 20, fontWeight: 700, color: 'var(--text-0)', margin: 0 }

function QuickStat({ label, value, color, icon }) {
    return (
        <div style={{ 
            padding: '24px', 
            background: 'var(--bg-1)', 
            borderRadius: 20, 
            border: '1px solid var(--border-md)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: 12
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 20 }}>{icon}</span>
                <span style={{ fontFamily: 'Fira Code, monospace', fontSize: 10, color: 'var(--text-2)', letterSpacing: '0.1em' }}>METRIC</span>
            </div>
            <div>
                <p style={{ fontSize: 12, color: 'var(--text-2)', marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 28, fontWeight: 800, color, fontFamily: 'Outfit, sans-serif' }}>{value}</p>
            </div>
        </div>
    )
}

function ChartTooltip({ active, payload, label, suffix = '' }) {
    if (!active || !payload?.length) return null
    return (
        <div style={{ 
            background: 'var(--bg-4)', 
            padding: '10px 14px', 
            borderRadius: 12, 
            border: '1px solid var(--border-hi)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)'
        }}>
            <p style={{ fontSize: 11, color: 'var(--text-2)', fontWeight: 600, marginBottom: 4, textTransform: 'uppercase' }}>{label || 'Session'}</p>
            <p style={{ fontSize: 18, color: 'var(--amber)', fontWeight: 800, fontFamily: 'Fira Code' }}>
                {payload[0].value}{suffix}
            </p>
        </div>
    )
}

function LoadingGrid() {
    return (
        <div className="page-wrapper" style={{ padding: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div className="animate-shimmer" style={{ height: 40, width: 300, borderRadius: 12 }} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
                {[0, 1, 2, 3].map(i => <div key={i} className="animate-shimmer" style={{ height: 120, borderRadius: 20 }} />)}
            </div>
            <div className="animate-shimmer" style={{ height: 300, borderRadius: 24 }} />
        </div>
    )
}

// Mock data for when backend is offline or empty
const MOCK_TREND = [1, 2, 3, 4, 5, 6].map(i => ({ session: `S${i}`, score: 45 + Math.round(Math.random() * 40) }))
const MOCK_CODING = [1, 2, 3, 4, 5].map(i => ({ session: `S${i}`, rate: 50 + Math.round(Math.random() * 45) }))
const MOCK_TOPICS = ['Arrays', 'Trees', 'DP', 'Graphs', 'OS', 'Networks'].map((t, i) => ({ topic: t, score: 40 + i * 8 + Math.round(Math.random() * 12) }))
const MOCK_WEAK = ['DP', 'Graphs', 'OS', 'Concurrency', 'Trees', 'Sorting', 'Regex', 'SQL'].map(t => ({ topic: t, score: Math.round(30 + Math.random() * 50) }))
