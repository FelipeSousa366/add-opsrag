# Padrões de Desenvolvimento de Software

## Stack Tecnológico

### Backend

- **Linguagem principal**: Python 3.11+
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Banco de dados**: PostgreSQL 15
- **Cache**: Redis
- **Mensageria**: RabbitMQ

### Frontend

- **Framework**: React 18 com TypeScript
- **Gerenciador de estado**: Zustand
- **Estilização**: TailwindCSS
- **Componentes**: Shadcn/UI
- **Build tool**: Vite

### Infraestrutura

- **Cloud**: AWS
- **Containers**: Docker + Kubernetes (EKS)
- **CI/CD**: GitHub Actions
- **IaC**: Terraform
- **Monitoramento**: Datadog

## Git Flow

### Branches

| Branch | Propósito |
|--------|-----------|
| `main` | Produção - código estável |
| `develop` | Desenvolvimento - integração |
| `feature/*` | Novas funcionalidades |
| `bugfix/*` | Correções de bugs |
| `hotfix/*` | Correções urgentes em produção |
| `release/*` | Preparação para release |

### Convenção de Commits

Seguimos o padrão **Conventional Commits**:

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[rodapé opcional]
```

**Tipos permitidos:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Manutenção

**Exemplo:**
```
feat(auth): implementar login com OAuth2

- Adicionar integração com Google
- Adicionar integração com Microsoft
- Criar testes unitários

Closes #123
```

## Code Review

### Requisitos para Merge

1. Mínimo de 2 aprovações
2. Todos os checks de CI passando
3. Cobertura de testes >= 80%
4. Sem conflitos com a branch destino
5. Documentação atualizada (se aplicável)

### Checklist do Reviewer

- [ ] Código segue os padrões do projeto
- [ ] Lógica está correta e eficiente
- [ ] Testes cobrem os casos principais
- [ ] Não há vulnerabilidades de segurança
- [ ] Performance não foi degradada

## Ambientes

| Ambiente | URL | Propósito |
|----------|-----|-----------|
| Local | localhost:3000 | Desenvolvimento |
| Dev | dev.technova.com.br | Testes internos |
| Staging | staging.technova.com.br | Homologação |
| Produção | app.technova.com.br | Usuários finais |

## Deploy

### Deploy para Staging

1. Merge na branch `develop`
2. Pipeline automático executa
3. Deploy automático em staging

### Deploy para Produção

1. Criar PR de `develop` para `main`
2. Aprovação do Tech Lead
3. Merge dispara pipeline
4. Deploy com blue-green strategy

---

*Mantido por: Arquitetura de Software*
*Versão: 2.1*
