# Processos de TI - ServiceDesk

## Abertura de Chamados

### Canais de Atendimento

1. **Portal ServiceDesk**: servicedesk.technova.com.br
2. **E-mail**: suporte@technova.com.br
3. **Slack**: canal #ti-suporte
4. **Telefone**: Ramal 2200

### Categorias de Chamado

| Categoria | Exemplos | SLA |
|-----------|----------|-----|
| Hardware | Notebook quebrado, monitor com defeito | 24h |
| Software | Instalação de programas, licenças | 8h |
| Acesso | Reset de senha, novos acessos | 4h |
| Rede | Problemas de conexão, VPN | 2h |
| Segurança | Vírus, phishing, vazamento | 1h |

## Solicitação de Equipamentos

### Notebook Novo

1. Abrir chamado categoria "Hardware > Novo Equipamento"
2. Preencher justificativa
3. Aguardar aprovação do gestor
4. Aguardar aprovação do TI Manager
5. Prazo de entrega: 5 a 10 dias úteis

### Modelos Disponíveis

- **Desenvolvedor**: MacBook Pro M3 16GB ou Dell XPS 15
- **Administrativo**: Dell Latitude 5540
- **Executivo**: MacBook Air M3 ou ThinkPad X1 Carbon

## VPN - Acesso Remoto

### Configuração Inicial

1. Baixar o cliente **GlobalProtect** em: vpn.technova.com.br
2. Instalar o aplicativo
3. Configurar servidor: `vpn.technova.com.br`
4. Usar credenciais do Active Directory
5. Aprovar MFA no celular

### Troubleshooting VPN

**Erro: "Unable to connect"**
- Verificar conexão com internet
- Reiniciar o cliente VPN
- Limpar cache do GlobalProtect

**Erro: "Authentication failed"**
- Verificar se a senha não expirou
- Confirmar que MFA está configurado
- Contatar suporte se persistir

## Backup e Recuperação

### Política de Backup

- **Documentos locais**: Não há backup automático
- **OneDrive**: Sincronização automática
- **Servidores**: Backup diário às 2h

### Recuperação de Arquivos

Para recuperar arquivos deletados:
1. OneDrive: Lixeira disponível por 30 dias
2. Servidores: Abrir chamado com data e caminho do arquivo
3. E-mail: Lixeira disponível por 14 dias

## Manutenção Programada

### Janelas de Manutenção

- **Semanal**: Domingo, 2h às 6h
- **Mensal**: Primeiro domingo do mês, 0h às 8h

### Comunicação

- Aviso com 48h de antecedência via e-mail
- Status em tempo real: status.technova.com.br

---

*Responsável: Equipe de Infraestrutura*
*Atualizado em: Janeiro 2024*
