import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Bot, User } from 'lucide-react'

export default function ChatMessage({ msg, index = 0 }) {
    const isUser = msg.role === 'user'

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.2) }}
            className={`cop-message ${isUser ? 'cop-message--user' : 'cop-message--ai'}`}
        >
            {/* Avatar */}
            <div className={`cop-avatar ${isUser ? 'cop-avatar--user' : 'cop-avatar--ai'}`}>
                {isUser ? <User size={16} /> : <Bot size={16} />}
            </div>

            {/* Content */}
            <div className="cop-message-content">
                <p className="cop-message-label">{isUser ? 'You' : 'Copilot'}</p>
                <div className={`cop-message-bubble ${isUser ? 'cop-bubble--user' : 'cop-bubble--ai'} ${msg.error ? 'cop-bubble--error' : ''}`}>
                    {isUser ? (
                        <p>{msg.content}</p>
                    ) : (
                        <div className="cop-markdown">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        return inline ? (
                                            <code className="cop-inline-code" {...props}>{children}</code>
                                        ) : (
                                            <pre className="cop-code-block">
                                                <code {...props}>{children}</code>
                                            </pre>
                                        )
                                    },
                                    h1: ({ children }) => <h3 className="cop-md-heading">{children}</h3>,
                                    h2: ({ children }) => <h4 className="cop-md-heading">{children}</h4>,
                                    h3: ({ children }) => <h5 className="cop-md-heading">{children}</h5>,
                                    ul: ({ children }) => <ul className="cop-md-list">{children}</ul>,
                                    ol: ({ children }) => <ol className="cop-md-list cop-md-list--ordered">{children}</ol>,
                                    li: ({ children }) => <li className="cop-md-li">{children}</li>,
                                    p: ({ children }) => <p className="cop-md-p">{children}</p>,
                                    strong: ({ children }) => <strong className="cop-md-strong">{children}</strong>,
                                    blockquote: ({ children }) => <blockquote className="cop-md-blockquote">{children}</blockquote>,
                                }}
                            >
                                {msg.content}
                            </ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
