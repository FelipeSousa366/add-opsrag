import { useState } from 'react'
import { MessageSquare, Database, BarChart3, Sun, Moon } from 'lucide-react'
import Chat from './components/Chat'
import Ingest from './components/Ingest'
import Dashboard from './components/Dashboard'
import { useTheme } from './context/ThemeContext'

const tabs = [
  { id: 'chat', label: 'Assistente', icon: MessageSquare },
  { id: 'ingest', label: 'Ingestão', icon: Database },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
]

function App() {
  const [activeTab, setActiveTab] = useState('chat')
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ background: 'var(--bg-primary)' }}>
      <header className="border-b backdrop-blur-sm sticky top-0 z-50 transition-colors duration-300" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)' }}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>ASSIST OPS-RAG</h1>
              <div>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Documentação Interativa</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <nav className="flex gap-1 p-1 rounded-xl transition-colors duration-300" style={{ background: 'var(--bg-secondary)' }}>
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive ? 'shadow-lg' : ''
                      }`}
                      style={{
                        background: isActive ? 'var(--accent-primary)' : 'transparent',
                        color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'chat' && <Chat />}
        {activeTab === 'ingest' && <Ingest />}
        {activeTab === 'dashboard' && <Dashboard />}
      </main>
    </div>
  )
}

export default App
