const API_BASE = '/api';

export async function askQuestion(question, history = []) {
  const response = await fetch(`${API_BASE}/ask`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, history })
  });
  if (!response.ok) throw new Error('Erro ao consultar assistente');
  return response.json();
}

export async function ingestDocuments() {
  const response = await fetch(`${API_BASE}/ingest`, {
    method: 'POST'
  });
  if (!response.ok) throw new Error('Erro na ingestão');
  return response.json();
}

export async function getHealth() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) throw new Error('Serviço indisponível');
  return response.json();
}

export async function getStats() {
  const response = await fetch(`${API_BASE}/stats`);
  if (!response.ok) throw new Error('Erro ao obter estatísticas');
  return response.json();
}
