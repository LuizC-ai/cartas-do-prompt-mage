# Importar Cartas do Obsidian

## Como Funciona

O sistema de "Cartas do Prompt Mage" foi projetado para ser facilmente compatível com exportações do Obsidian. Cada carta é um arquivo Markdown simples.

## Estrutura de Arquivo

Cada carta deve ter a seguinte estrutura:

```markdown
---
title: "Título da Carta"
date: "15 de abril de 2026"
excerpt: "Primeira frase ou resumo da carta"
slug: "titulo-da-carta-em-slug"
---

De: Luiz – Minas Gerais, Brasil
Data: 15 de abril de 2026

Querido Amigo,

[Corpo da carta aqui]

P.S. [Nota final]

Atenciosamente,
Luiz
```

## Campos Obrigatórios

- **title**: Título da carta (será exibido em MAIÚSCULAS no estilo Gary Halbert)
- **date**: Data formatada como "DD de mês de YYYY"
- **excerpt**: Primeira frase ou resumo (máximo 150 caracteres)
- **slug**: Identificador único em minúsculas com hífens (ex: "como-treinar-ia")

## Importar do Obsidian

### Passo 1: Preparar Arquivos
1. Abra seu Obsidian vault
2. Exporte as cartas como Markdown (File > Export as Markdown)
3. Certifique-se de que cada arquivo tem o frontmatter YAML com os campos acima

### Passo 2: Adicionar ao Projeto
1. Abra o arquivo `client/src/lib/posts.ts`
2. Localize o array `POSTS`
3. Adicione novos objetos Post com os dados de suas cartas

### Exemplo de Adição Manual

```typescript
{
  title: "Meu Novo Post",
  date: "20 de maio de 2026",
  excerpt: "Uma história sobre IA que realmente funcionou",
  slug: "historia-sobre-ia",
  author: "Luiz",
  location: "Minas Gerais, Brasil",
  content: `De: Luiz – Minas Gerais, Brasil
Data: 20 de maio de 2026

Querido Amigo,

[Seu conteúdo aqui...]

Atenciosamente,
Luiz`
}
```

## Automação Futura

Para automatizar completamente a importação do Obsidian:

1. Crie um script Node.js que leia arquivos `.md` de uma pasta
2. Parse do frontmatter YAML
3. Geração automática do array `POSTS`
4. Ou migre para um sistema de CMS/banco de dados

## Formatação de Conteúdo

### Quebras de Linha
- Use quebras de linha simples para separar parágrafos
- O sistema preserva a formatação exata do Markdown

### Seções Especiais
O sistema reconhece automaticamente:
- Linhas começando com "De:" → formatadas como cabeçalho
- Linhas começando com "Data:" → formatadas como data
- Linhas começando com "Querido" → formatadas como saudação
- Linhas começando com "P.S." → formatadas como nota final
- Linhas começando com "Atenciosamente" → formatadas como assinatura

## Dicas

- Mantenha o comprimento das cartas entre 800-2000 palavras
- Use a primeira frase como excerpt
- Slugs devem ser únicos e descritivos
- Datas devem estar em português: "DD de mês de YYYY"
- O sistema ordena automaticamente por data (mais recente primeiro)

## Suporte a Markdown

O sistema suporta:
- Parágrafos simples
- Quebras de linha
- **Negrito** (será renderizado como negrito)
- Estrutura de carta formal

Não suporta (por design):
- Listas
- Código
- Imagens
- Tabelas
- Links internos

Isso mantém o estilo autêntico de carta datilografada de 1986.
