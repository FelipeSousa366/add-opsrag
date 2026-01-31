import { useState, useEffect } from 'react'
import { Activity, FileText, Layers, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { getHealth, getStats } from '../api'

function Dashboard() {
  const [health, setHealth] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const [healthData, statsData] = await Promise.all([
        getHealth().catch(() => null),
        getStats().catch(() => null)
      ])
      setHealth(healthData)
      setStats(statsData)
    } catch (err) {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const isOnline = health?.status === 'ok'

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400">Visão geral do sistema</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-50 transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            {isOnline ? (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-emerald-900/50 text-emerald-400 border border-emerald-700/50">
                <CheckCircle className="w-3 h-3" />
                Online
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-red-900/50 text-red-400 border border-red-700/50">
                <XCircle className="w-3 h-3" />
                Offline
              </span>
            )}
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {isOnline ? 'Operacional' : 'Indisponível'}
          </div>
          <div className="text-sm text-slate-400">Status do Serviço</div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats?.documents ?? '-'}
          </div>
          <div className="text-sm text-slate-400">Documentos</div>
        </div>

        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {stats?.chunks ?? '-'}
          </div>
          <div className="text-sm text-slate-400">Chunks Indexados</div>
        </div>
      </div>

      {stats?.files && stats.files.length > 0 && (
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Arquivos Carregados</h3>
          <div className="space-y-2">
            {stats.files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/30"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300 font-mono text-sm">{file}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-900/30 border border-red-700/50">
          <div className="flex items-center gap-2 text-red-400">
            <XCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
