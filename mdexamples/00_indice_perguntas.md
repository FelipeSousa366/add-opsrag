# Índice de Documentação e Sugestões de Perguntas

## Sobre Este Repositório

Este repositório contém a documentação interna da **TechNova Solutions**, uma empresa fictícia de tecnologia. Os documentos simulam cenários reais de uma organização e podem ser usados para testar sistemas RAG (Retrieval-Augmented Generation).

---

## Arquivos Disponíveis

### 1. `01_politica_seguranca.md`
**Tema**: Segurança da Informação
- Classificação de dados
- Requisitos de senha e MFA
- Uso de dispositivos corporativos
- Procedimentos para incidentes de segurança

### 2. `02_onboarding_colaboradores.md`
**Tema**: Integração de Novos Funcionários
- Documentação necessária no primeiro dia
- Treinamentos obrigatórios
- Benefícios da empresa
- Horário de trabalho e contatos

### 3. `03_processos_ti.md`
**Tema**: ServiceDesk e Suporte Interno
- Abertura de chamados
- Solicitação de equipamentos
- Configuração de VPN
- Política de backup

### 4. `04_desenvolvimento_software.md`
**Tema**: Padrões de Desenvolvimento
- Stack tecnológico (Python, React, AWS)
- Git flow e convenção de commits
- Processo de code review
- Ambientes e deploy

### 5. `05_politica_ferias.md`
**Tema**: Férias e Ausências
- Solicitação de férias
- Licenças (maternidade, paternidade, casamento, luto)
- Política de home office
- Banco de horas

### 6. `06_produtos_servicos.md`
**Tema**: Catálogo Comercial
- Produtos: ERP, Analytics, Chat
- Serviços: Consultoria, desenvolvimento, suporte
- Tabela de preços
- Clientes e contato comercial

### 7. `07_compliance_etica.md`
**Tema**: Código de Ética
- Valores da empresa
- Conflito de interesses
- Política anticorrupção
- Canal de denúncias

### 8. `08_arquitetura_sistemas.md`
**Tema**: Infraestrutura Técnica
- Arquitetura de microserviços
- Bancos de dados (PostgreSQL, Redis, MongoDB)
- Kubernetes e AWS
- Monitoramento e disaster recovery

### 9. `09_procedimentos_vendas.md`
**Tema**: Processo Comercial
- Funil de vendas
- Qualificação de leads (BANT)
- Alçadas de desconto
- Comissionamento

### 10. `10_suporte_cliente.md`
**Tema**: Atendimento ao Cliente
- Canais e horários de atendimento
- SLA por plano (Bronze, Prata, Ouro, Platinum)
- Classificação de severidade
- Procedimentos de escalonamento

---

## Sugestões de Perguntas para o RAG

### Segurança e TI

1. "Quais são os requisitos mínimos para criar uma senha na empresa?"
2. "Como faço para reportar um incidente de segurança?"
3. "Qual é o SLA para chamados de segurança críticos?"
4. "Como configurar a VPN para trabalho remoto?"
5. "Quais equipamentos estão disponíveis para desenvolvedores?"

### RH e Benefícios

6. "Quais documentos preciso levar no primeiro dia de trabalho?"
7. "Quanto tempo de licença paternidade a empresa oferece?"
8. "Como funciona o banco de horas?"
9. "Qual é o valor do vale refeição?"
10. "Quantos dias de home office são permitidos por semana?"

### Desenvolvimento

11. "Qual é a stack de tecnologia usada no backend?"
12. "Como deve ser o formato das mensagens de commit?"
13. "Quantas aprovações são necessárias para fazer merge?"
14. "Qual é a URL do ambiente de staging?"
15. "Como funciona o deploy para produção?"

### Comercial e Produtos

16. "Quais são os produtos oferecidos pela TechNova?"
17. "Quanto custa o plano Enterprise do ERP?"
18. "Qual é o desconto máximo que um gerente pode oferecer?"
19. "Como funciona o comissionamento de vendas?"
20. "Quais são as etapas do funil de vendas?"

### Suporte ao Cliente

21. "Qual é o SLA de resposta para clientes do plano Ouro?"
22. "Como classificar um chamado como severidade crítica?"
23. "Quais são os horários de atendimento do suporte?"
24. "Quando devo escalar um chamado para o próximo nível?"
25. "Qual é a meta de CSAT do suporte?"

### Compliance e Ética

26. "Qual é o limite de valor para aceitar brindes de fornecedores?"
27. "Como fazer uma denúncia anônima?"
28. "Quais são os valores da empresa?"
29. "O que configura conflito de interesses?"
30. "Qual é o prazo para investigação de denúncias?"

### Arquitetura e Infraestrutura

31. "Qual banco de dados é usado para cache?"
32. "Quantas réplicas de leitura tem o PostgreSQL?"
33. "Qual é o RPO definido para disaster recovery?"
34. "Quais ferramentas são usadas para monitoramento?"
35. "Qual é a versão do Kubernetes no cluster?"

---

## Como Usar

1. Copie os arquivos `.md` para a pasta `app/data/raw_md` do backend
2. Execute a ingestão: `POST /ingest`
3. Faça perguntas via: `POST /ask`

---

*Documentação criada para fins de demonstração e testes*
*TechNova Solutions - Empresa Fictícia*
