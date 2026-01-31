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
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Ingestão de Documentos</h2>
        <p className="text-slate-400">
          Processa os arquivos Markdown da pasta <code className="text-emerald-400">raw_md</code> e 
          atualiza o índice vetorial para consultas.
        </p>
      </div>

      <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50">
            <FileText className="w-5 h-5 text-blue-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">Arquivos Markdown</h3>
              <p className="text-sm text-slate-400">
                Coloque seus arquivos <code>.md</code> na pasta <code>backend/app/data/raw_md</code>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50">
            <Layers className="w-5 h-5 text-purple-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">Chunking Inteligente</h3>
              <p className="text-sm text-slate-400">
                Documentos são divididos em chunks de 1000 caracteres com overlap de 200
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-900/50">
            <Clock className="w-5 h-5 text-amber-400 mt-0.5" />
            <div>
              <h3 className="font-medium text-white">Processamento</h3>
              <p className="text-sm text-slate-400">
                O tempo varia conforme a quantidade de documentos. Aguarde a conclusão.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleIngest}
          disabled={loading}
          className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold flex items-center justify-center gap-2 hover:from-emerald-400 hover:to-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
                <div className="text-2xl font-bold text-white">{result.files}</div>
                <div className="text-xs text-slate-400">Arquivos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{result.chunks}</div>
                <div className="text-xs text-slate-400">Chunks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{result.elapsed_seconds}s</div>
                <div className="text-xs text-slate-400">Tempo</div>
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
