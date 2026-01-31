import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Bot, User, FileText, Trash2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { askQuestion } from '../api'

const STORAGE_KEY = 'add_opsrag_chat_history'

function Chat() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // localStorage cheio ou indisponível
    }
  }, [messages])

  const clearHistory = () => {
    setMessages([])
    localStorage.removeItem(STORAGE_KEY)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const question = input.trim()
    setInput('')
    const newUserMessage = { role: 'user', content: question }
    const updatedMessages = [...messages, newUserMessage]
    setMessages(updatedMessages)
    setLoading(true)

    const history = updatedMessages
      .filter(m => !m.error)
      .map(m => ({ role: m.role, content: m.content }))
      .slice(-10)

    try {
      const data = await askQuestion(question, history)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        sources: data.sources
      }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Desculpe, ocorreu um erro ao processar sua pergunta. Verifique se o backend está rodando.',
        error: true
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {messages.length > 0 && (
        <div className="flex justify-end mb-4">
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-400 text-sm hover:bg-red-900/30 hover:border-red-700/50 hover:text-red-400 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Limpar conversa
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
              <Bot className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Olá! Sou o ADD OPSRAG</h2>
            <p className="text-slate-400 max-w-md">
              Seu assistente técnico para documentação. Faça perguntas sobre os documentos 
              carregados e receba respostas contextualizadas.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {[
                'Como configurar o ambiente?',
                'Quais são os requisitos do sistema?',
                'Como fazer deploy da aplicação?',
                'Onde encontro os logs?'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="text-left px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-700/50 hover:border-slate-600 transition-all"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
              <div
                className={`rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : msg.error
                    ? 'bg-red-900/50 border border-red-700/50 text-red-200'
                    : 'bg-slate-800 text-slate-100'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <div className="markdown-content">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{msg.content}</p>
                )}
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {msg.sources.filter(Boolean).map((source, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-slate-800/50 text-slate-400 border border-slate-700/50"
                    >
                      <FileText className="w-3 h-3" />
                      {source.split('/').pop()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-800 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Pensando...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Faça uma pergunta sobre a documentação..."
            className="w-full px-5 py-4 pr-14 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Chat
