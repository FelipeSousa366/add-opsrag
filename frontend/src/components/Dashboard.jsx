import { useState, useEffect } from 'react'
import { Activity, FileText, Layers, RefreshCw, CheckCircle, XCircle, Trash2, Loader2 } from 'lucide-react'
import { getHealth, getStats, deleteDocument } from '../api'

function Dashboard() {
  const [health, setHealth] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deleting, setDeleting] = useState(null)

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

  const handleDelete = async (filename) => {
    if (!confirm(`Tem certeza que deseja excluir "${filename}" da memória do RAG?`)) return
    
    setDeleting(filename)
    setError(null)
    
    try {
      await deleteDocument(filename)
      await fetchData()
    } catch (err) {
      setError(`Erro ao excluir ${filename}`)
    } finally {
      setDeleting(null)
    }
  }

  const isOnline = health?.status === 'ok'

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Visão geral do sistema</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl hover:opacity-80 disabled:opacity-50 transition-all"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--accent-gradient-from), var(--accent-gradient-to))' }}>
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
          <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {isOnline ? 'Operacional' : 'Indisponível'}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Status do Serviço</div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, var(--accent-secondary), var(--accent-gradient-to))' }}>
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {stats?.documents ?? '-'}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Documentos</div>
        </div>

        <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            {stats?.chunks ?? '-'}
          </div>
          <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Chunks Indexados</div>
        </div>
      </div>

      {stats?.files && stats.files.length > 0 && (
        <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Arquivos Carregados</h3>
          <div className="space-y-2">
            {stats.files.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-4 py-3 rounded-xl"
                style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>{file}</span>
                </div>
                <button
                  onClick={() => handleDelete(file)}
                  disabled={deleting === file}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs hover:bg-red-900/30 hover:text-red-400 disabled:opacity-50 transition-all"
                  style={{ color: 'var(--text-muted)' }}
                  title="Excluir da memória do RAG"
                >
                  {deleting === file ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
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
