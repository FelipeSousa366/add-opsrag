# Arquitetura de Sistemas - TechNova

## Visão Geral da Infraestrutura

A TechNova utiliza uma arquitetura baseada em microserviços hospedada na AWS, seguindo princípios de cloud-native e DevOps.

## Diagrama de Alto Nível

```
                    ┌─────────────┐
                    │   CloudFront│
                    │    (CDN)    │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │     ALB     │
                    │(Load Balancer)
                    └──────┬──────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
    │ Service │      │ Service │      │ Service │
    │   API   │      │  Auth   │      │  Core   │
    └────┬────┘      └────┬────┘      └────┬────┘
         │                │                 │
         └────────────────┼─────────────────┘
                          │
              ┌───────────┼───────────┐
              │           │           │
         ┌────▼────┐ ┌────▼────┐ ┌────▼────┐
         │PostgreSQL│ │  Redis  │ │RabbitMQ │
         └─────────┘ └─────────┘ └─────────┘
```

## Serviços Principais

### API Gateway

- **Tecnologia**: Kong
- **Função**: Roteamento, rate limiting, autenticação
- **URL interna**: api-gateway.internal.technova.com

### Serviço de Autenticação

- **Tecnologia**: Keycloak
- **Função**: SSO, OAuth2, OIDC
- **Banco**: PostgreSQL dedicado
- **URL**: auth.technova.com.br

### Serviço Core

- **Tecnologia**: Python/FastAPI
- **Função**: Lógica de negócio principal
- **Replicas**: 3 (auto-scaling até 10)

### Serviço de Notificações

- **Tecnologia**: Node.js
- **Função**: E-mails, push, SMS
- **Integrações**: SendGrid, Firebase, Twilio

## Bancos de Dados

### PostgreSQL (RDS)

- **Versão**: 15.4
- **Instância**: db.r6g.xlarge
- **Storage**: 500GB SSD (auto-scaling)
- **Backup**: Diário, retenção 30 dias
- **Read Replicas**: 2

### Redis (ElastiCache)

- **Versão**: 7.0
- **Uso**: Cache, sessões, filas
- **Cluster**: 3 nós
- **Memória**: 13GB por nó

### MongoDB (DocumentDB)

- **Uso**: Logs, analytics, dados não estruturados
- **Instância**: db.r6g.large
- **Storage**: 200GB

## Kubernetes (EKS)

### Cluster

- **Versão**: 1.28
- **Node Groups**:
  - `general`: t3.large (3-10 nós)
  - `compute`: c6i.xlarge (2-8 nós)
  - `memory`: r6i.large (2-4 nós)

### Namespaces

| Namespace | Propósito |
|-----------|-----------|
| production | Ambiente de produção |
| staging | Homologação |
| monitoring | Prometheus, Grafana |
| logging | ELK Stack |

## Monitoramento

### Ferramentas

- **Métricas**: Datadog
- **Logs**: ELK Stack (Elasticsearch, Logstash, Kibana)
- **APM**: Datadog APM
- **Alertas**: PagerDuty

### Dashboards Principais

1. **Overview**: Saúde geral dos serviços
2. **API Performance**: Latência e throughput
3. **Database**: Queries lentas, conexões
4. **Kubernetes**: Recursos dos pods

### Alertas Críticos

| Alerta | Condição | Ação |
|--------|----------|------|
| API Down | 0 pods healthy | PagerDuty + Slack |
| High Latency | p99 > 2s por 5min | Slack |
| DB Connections | > 80% | Slack |
| Disk Space | > 85% | E-mail |

## Disaster Recovery

### RPO e RTO

- **RPO (Recovery Point Objective)**: 1 hora
- **RTO (Recovery Time Objective)**: 4 horas

### Estratégia

1. Backups automáticos em S3 (cross-region)
2. Infraestrutura como código (Terraform)
3. Runbooks documentados
4. Testes de DR trimestrais

---

*Equipe de Arquitetura*
*Atualizado em: Janeiro 2024*
