import { motion } from 'framer-motion'
import { Bot } from 'lucide-react'

export default function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="cop-message cop-message--ai"
        >
            <div className="cop-avatar cop-avatar--ai">
                <Bot size={16} />
            </div>
            <div className="cop-message-content">
                <p className="cop-message-label">Copilot</p>
                <div className="cop-typing-indicator">
                    <span className="cop-typing-text">Copilot is thinking</span>
                    <div className="cop-typing-dots">
                        {[0, 1, 2].map(i => (
                            <motion.span
                                key={i}
                                className="cop-typing-dot"
                                animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
