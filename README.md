# TaskFlow — Sistema de Gerenciamento de Tarefas

## 1. Identificação do Projeto

**Projeto:** TaskFlow — Sistema de Gerenciamento de Tarefas

**Curso:** Ciência da Computação

**Disciplina:** Desenvolvimento de Software Visual

**Turma:** 2026.02

**Instituição:** Universidade Positivo

**Integrantes:**

- Alexandre Enrick Zampier
- Erick Pereira Munhoz

## 2. Resumo

O TaskFlow é um sistema de gerenciamento de projetos e tarefas desenvolvido com o objetivo de facilitar a organização, a distribuição de responsabilidades e o acompanhamento de atividades. A aplicação permitirá que usuários criem projetos, cadastrem tarefas, definam responsáveis, estabeleçam prioridades e acompanhem o andamento das atividades. O sistema será desenvolvido utilizando C# com ASP.NET Core Minimal API, Entity Framework Core e SQLite, seguindo os princípios de uma API REST. Além de centralizar as informações dos projetos, o TaskFlow disponibilizará funcionalidades para monitorar o progresso das atividades, contribuindo para uma melhor organização e gestão do trabalho em equipe.

## 3. Funcionalidades

As principais funcionalidades planejadas para o sistema são:

- **Gerenciamento de usuários:** cadastrar e consultar usuários do sistema.
- **Gerenciamento de projetos:** cadastrar e consultar projetos.
- **Gerenciamento de tarefas:** criar, listar, atualizar e excluir tarefas.
- **Atribuição de responsáveis:** vincular tarefas aos usuários cadastrados.
- **Organização por projetos:** associar tarefas a projetos específicos.
- **Controle de status:** acompanhar tarefas pendentes, em andamento e concluídas.
- **Definição de prioridades:** classificar tarefas como baixa, média ou alta prioridade.
- **Acompanhamento de progresso:** calcular o percentual de conclusão das tarefas de cada projeto.

## 4. Descrição das Funcionalidades

### 4.1. Gerenciamento de Usuários

O sistema permitirá cadastrar usuários e consultar suas informações. Cada usuário poderá ser associado a diferentes tarefas, possibilitando identificar o responsável por cada atividade.

### 4.2. Gerenciamento de Projetos

Os projetos funcionarão como agrupadores de tarefas. Cada projeto possuirá informações como nome, descrição e data de criação, permitindo organizar diferentes conjuntos de atividades.

### 4.3. Gerenciamento de Tarefas

O sistema disponibilizará operações de criação, listagem, atualização e exclusão de tarefas, implementando um CRUD completo.

Cada tarefa poderá conter título, descrição, status, prioridade, prazo de conclusão, projeto associado e usuário responsável.

### 4.4. Atribuição de Responsáveis

As tarefas poderão ser vinculadas a usuários previamente cadastrados. Esse relacionamento permitirá consultar as atividades atribuídas a cada participante.

### 4.5. Controle de Status e Prioridades

Cada tarefa terá um status que representará sua situação atual:

- **Pendente:** atividade ainda não iniciada.
- **Em andamento:** atividade em desenvolvimento.
- **Concluída:** atividade finalizada.

Também será possível definir prioridades baixa, média e alta, facilitando a identificação das atividades mais importantes.

### 4.6. Acompanhamento do Progresso

O TaskFlow calculará o percentual de conclusão de cada projeto a partir da quantidade de tarefas concluídas em relação ao total de tarefas cadastradas.

Por exemplo, um projeto com 10 tarefas, das quais 7 estão concluídas, apresentará um progresso de 70%.

Essa funcionalidade permitirá acompanhar o andamento geral dos projetos por meio das informações armazenadas no banco de dados.

## 5. Tecnologias Utilizadas

As tecnologias previstas para o desenvolvimento são:

- **C# e .NET 8:** linguagem e plataforma de desenvolvimento.
- **ASP.NET Core Minimal API:** criação dos endpoints REST.
- **Entity Framework Core:** mapeamento das entidades e comunicação com o banco de dados.
- **SQLite:** armazenamento persistente das informações.
- **JSON:** formato de comunicação da API.
- **Git e GitHub:** versionamento e colaboração entre os integrantes.

## 6. Estrutura do Banco de Dados

O sistema será desenvolvido inicialmente com três entidades principais:

### Usuário

- Id
- Nome
- Email

### Projeto

- Id
- Nome
- Descricao
- DataCriacao

### Tarefa

- Id
- Titulo
- Descricao
- Status
- Prioridade
- DataLimite
- ProjetoId
- UsuarioId

**Relacionamentos:**

- Um projeto poderá possuir várias tarefas.
- Um usuário poderá ser responsável por várias tarefas.
- Cada tarefa estará vinculada a um projeto e poderá possuir um usuário responsável.

## 7. Repositório e Colaboração

O código-fonte e a documentação do TaskFlow serão mantidos neste repositório do GitHub.

O desenvolvimento será realizado de maneira colaborativa, com participação dos dois integrantes, utilizando Git para registrar alterações, acompanhar a evolução do projeto e integrar as funcionalidades implementadas.

## 8. Uso de IA

A documentação inicial do TaskFlow foi elaborada com o auxílio do **ChatGPT, desenvolvido pela OpenAI**.

### Forma de utilização

A ferramenta foi utilizada para auxiliar na definição da proposta do sistema, organização das funcionalidades, planejamento das entidades e relacionamentos e elaboração dos textos do README.

Entre as solicitações realizadas à ferramenta estão:

- Sugestões de projetos de API REST em C#.
- Análise de adequação das ideias aos requisitos acadêmicos.
- Comparação de projetos considerando possíveis expansões futuras.
- Planejamento das funcionalidades de um gerenciador de tarefas.
- Elaboração da documentação inicial seguindo o enunciado da disciplina.
- Verificação do funcionamento do GET de tarefas e das respostas da API.
- Análise e correção de campos nulos no JSON retornado.
- Apoio na implementação do PUT para atualização de tarefas por ID.
- Correção e validação de requisições HTTP no arquivo `Links.http`.
- Verificação da atualização dos campos e do salvamento no banco de dados.