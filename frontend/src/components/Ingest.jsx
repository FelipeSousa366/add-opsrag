import { useState } from 'react'
import { Upload, Loader2, CheckCircle, XCircle, FileText, Clock, Layers } from 'lucide-react'
import { ingestDocuments } from '../api'

function Ingest() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleIngest = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const data = await ingestDocuments()
      setResult(data)
    } catch (err) {
      setError('Erro ao processar ingestão. Verifique se o backend está rodando e se há arquivos .md na pasta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(to bottom right, var(--accent-gradient-from), var(--accent-gradient-to))' }}>
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Ingestão de Documentos</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Processa os arquivos Markdown da pasta <code style={{ color: 'var(--accent-primary)' }}>raw_md</code> e 
          atualiza o índice vetorial para consultas.
        </p>
      </div>

      <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            <FileText className="w-5 h-5 mt-0.5" style={{ color: 'var(--accent-primary)' }} />
            <div>
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Arquivos Markdown</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Coloque seus arquivos <code>.md</code> na pasta <code>backend/app/data/raw_md</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            <Layers className="w-5 h-5 mt-0.5" style={{ color: 'var(--accent-secondary)' }} />
            <div>
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Chunking Inteligente</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Documentos são divididos em chunks de 1000 caracteres com overlap de 200
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>Processamento</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                O tempo varia conforme a quantidade de documentos. Aguarde a conclusão.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleIngest}
          disabled={loading}
          className="w-full mt-6 py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          style={{ background: 'linear-gradient(to right, var(--accent-gradient-from), var(--accent-gradient-to))' }}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando documentos...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Iniciar Ingestão
            </>
          )}
        </button>

        {result && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-900/30 border border-emerald-700/50">
            <div className="flex items-center gap-2 text-emerald-400 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Ingestão concluída!</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{result.files}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Arquivos</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{result.chunks}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Chunks</div>
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{result.elapsed_seconds}s</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>Tempo</div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 rounded-xl bg-red-900/30 border border-red-700/50">
            <div className="flex items-center gap-2 text-red-400">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Ingest
