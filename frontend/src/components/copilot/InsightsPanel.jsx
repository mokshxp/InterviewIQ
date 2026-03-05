import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, TrendingUp, BookMarked, MessageSquareText, ChevronRight } from 'lucide-react'
import { resumeApi, analyticsApi } from '../../services/api.js'

const RECOMMENDED_TOPICS = [
    'Binary Search', 'Graphs', 'Dynamic Programming',
    'Caching Systems', 'REST APIs', 'System Design'
]

export default function InsightsPanel() {
    const [resume, setResume] = useState(null)
    const [analytics, setAnalytics] = useState(null)

    useEffect(() => {
        resumeApi.get()
            .then(r => setResume(r.data))
            .catch(() => setResume(null))
        analyticsApi.get()
            .then(r => setAnalytics(r.data))
            .catch(() => setAnalytics(null))
    }, [])

    const skillScores = analytics?.topic_scores || {
        'DSA': 65,
        'System Design': 40,
        'Backend': 75,
        'Frontend': 55,
    }

    const role = resume?.primary_role || 'Software Developer'
    const feedback = analytics?.ai_feedback_summary || 'Complete an interview to see AI-powered feedback and personalized insights here.'

    return (
        <div className="cop-insights">
            <h3 className="cop-insights-title">
                <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
                AI Career Insights
            </h3>

            {/* Target Role */}
            <motion.div
                className="cop-insight-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="cop-insight-label">
                    <Briefcase size={13} />
                    Target Role
                </div>
                <p className="cop-insight-value">{role}</p>
            </motion.div>

            {/* Skill Progress */}
            <motion.div
                className="cop-insight-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="cop-insight-label">
                    <TrendingUp size={13} />
                    Skill Progress
                </div>
                <div className="cop-skill-bars">
                    {Object.entries(skillScores).slice(0, 4).map(([skill, score], i) => (
                        <div key={skill} className="cop-skill-row">
                            <div className="cop-skill-info">
                                <span className="cop-skill-name">{skill}</span>
                                <span className="cop-skill-score">{score}%</span>
                            </div>
                            <div className="cop-skill-track">
                                <motion.div
                                    className="cop-skill-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${score}%` }}
                                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                                    style={{
                                        background: score >= 70 ? 'var(--emerald)' :
                                            score >= 50 ? 'var(--accent)' : 'var(--rose)'
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Recommended Topics */}
            <motion.div
                className="cop-insight-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="cop-insight-label">
                    <BookMarked size={13} />
                    Recommended Topics
                </div>
                <div className="cop-topics-grid">
                    {(resume?.skills?.slice(0, 6) || RECOMMENDED_TOPICS).map(topic => (
                        <span key={topic} className="cop-topic-tag">{topic}</span>
                    ))}
                </div>
            </motion.div>

            {/* Recent AI Feedback */}
            <motion.div
                className="cop-insight-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
            >
                <div className="cop-insight-label">
                    <MessageSquareText size={13} />
                    Recent AI Feedback
                </div>
                <p className="cop-insight-feedback">{feedback}</p>
            </motion.div>
        </div>
    )
}
