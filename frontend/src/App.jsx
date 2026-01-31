import { useState } from 'react'
import { MessageSquare, Database, BarChart3, RefreshCw } from 'lucide-react'
import Chat from './components/Chat'
import Ingest from './components/Ingest'
import Dashboard from './components/Dashboard'

const tabs = [
  { id: 'chat', label: 'Assistente', icon: MessageSquare },
  { id: 'ingest', label: 'Ingestão', icon: Database },
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
]

function App() {
  const [activeTab, setActiveTab] = useState('chat')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">ADD OPSRAG</h1>
                <p className="text-xs text-slate-400">Documentação Interativa</p>
              </div>
            </div>
            
            <nav className="flex gap-1 bg-slate-800/50 p-1 rounded-xl">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </nav>
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
