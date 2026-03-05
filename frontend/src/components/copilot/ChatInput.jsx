import { useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'

export default function ChatInput({ input, setInput, onSend, sending }) {
    const textareaRef = useRef(null)

    useEffect(() => {
        adjustHeight()
    }, [input])

    const adjustHeight = () => {
        const el = textareaRef.current
        if (!el) return
        el.style.height = 'auto'
        el.style.height = Math.min(el.scrollHeight, 160) + 'px'
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
        }
    }

    const canSend = input.trim() && !sending

    return (
        <div className="cop-input-area">
            <div className={`cop-input-box ${canSend ? 'cop-input-box--active' : ''}`}>
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about your career, interview prep, or coding skills..."
                    rows={1}
                    className="cop-textarea"
                    disabled={sending}
                />
                <button
                    onClick={onSend}
                    disabled={!canSend}
                    className={`cop-send-btn ${canSend ? 'cop-send-btn--active' : ''}`}
                    title="Send message"
                >
                    {sending ? <Loader2 size={16} className="cop-spinner" /> : <Send size={16} />}
                </button>
            </div>
            <p className="cop-input-hint">
                <kbd>Enter</kbd> to send · <kbd>Shift+Enter</kbd> for new line
            </p>
        </div>
    )
}
