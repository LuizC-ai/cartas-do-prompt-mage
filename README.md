# Cartas do Prompt Mage

Um blog de cartas datilografadas no estilo exato de Gary Halbert (1986), construído com **Next.js 15**, **React 19** e **Tailwind CSS 4**.

## 📖 Sobre o Projeto

**Cartas do Prompt Mage** é um blog minimalista que apresenta histórias reais sobre IA e código em produção, formatadas como cartas datilografadas autênticas de 1986.

### Características

- **Design Autêntico**: Papel amarelo-envelhecido com textura real, fonte Courier New, layout de carta física
- **Sem Animações Modernas**: Zero 3D, zero neon, zero efeitos desnecessários
- **Totalmente Responsivo**: Funciona perfeitamente em mobile, tablet e desktop
- **SEO Perfeito**: Meta tags, titles e descriptions únicos para cada página
- **Fácil Importação**: Sistema compatível com exportações do Obsidian
- **Performance**: Estático, rápido, sem JavaScript desnecessário

## 🚀 Início Rápido

### Instalação

```bash
# Clone ou extraia o repositório
cd cartas-do-prompt-mage

# Instale as dependências
pnpm install

# Inicie o servidor de desenvolvimento
pnpm dev
```

O site estará disponível em `http://localhost:3000`

### Estrutura de Arquivos

```
cartas-do-prompt-mage/
├── client/
│   ├── public/              # Arquivos estáticos (robots.txt, favicon)
│   ├── src/
│   │   ├── pages/           # Páginas do site
│   │   │   ├── Home.tsx
│   │   │   ├── CartaDetalhes.tsx
│   │   │   ├── Sobre.tsx
│   │   │   ├── Contato.tsx
│   │   │   └── NotFound.tsx
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── hooks/           # Hooks customizados
│   │   ├── lib/             # Utilitários
│   │   │   ├── posts.ts     # Sistema de posts
│   │   │   └── seo.ts       # Configurações SEO
│   │   ├── index.css        # Estilos globais
│   │   └── App.tsx          # Componente raiz
│   └── index.html
├── OBSIDIAN_IMPORT.md       # Guia de importação do Obsidian
└── README.md
```

## 📝 Adicionar Novas Cartas

### Método 1: Edição Direta

Abra `client/src/lib/posts.ts` e adicione um novo objeto ao array `POSTS`:

```typescript
{
  title: "Título da Sua Carta",
  date: "15 de maio de 2026",
  excerpt: "Primeira frase que resume a carta",
  slug: "titulo-da-sua-carta",
  author: "Luiz",
  location: "Minas Gerais, Brasil",
  content: `De: Luiz – Minas Gerais, Brasil
Data: 15 de maio de 2026

Querido Amigo,

[Seu conteúdo aqui...]

P.S. [Nota final]

Atenciosamente,
Luiz`
}
```

### Método 2: Importar do Obsidian

Veja o arquivo `OBSIDIAN_IMPORT.md` para instruções detalhadas sobre como importar cartas do Obsidian.

## 🎨 Personalização

### Cores

As cores estão definidas em `client/src/index.css` no bloco `:root`:

- **Background**: `#f5e6d3` (papel amarelo-envelhecido)
- **Foreground**: `#1a1a1a` (tinta preta)
- **Accent**: `#8b6f47` (marrom envelhecido)

### Tipografia

A fonte padrão é **Courier Prime** (importada do Google Fonts), que simula perfeitamente uma máquina de escrever.

### Layout

- **Max-width**: 800px (largura de carta padrão)
- **Margens**: Grandes margens laterais para efeito de carta física
- **Espaçamento**: Generoso entre parágrafos

## 🔍 SEO

Cada página tem:
- Title único
- Meta description
- Open Graph tags
- Canonical URLs
- Robots.txt

As meta tags são atualizadas automaticamente usando o hook `useSEO()`.

## 📱 Responsividade

O design é totalmente responsivo:
- **Mobile** (< 640px): Margens reduzidas, fonte ajustada
- **Tablet** (640px - 1024px): Layout intermediário
- **Desktop** (> 1024px): Layout completo com margens generosas

## 🛠️ Desenvolvimento

### Adicionar uma Nova Página

1. Crie um novo arquivo em `client/src/pages/NovaPage.tsx`
2. Adicione a rota em `client/src/App.tsx`
3. Importe e use o hook `useSEO()` para SEO

### Modificar o Design

Todos os estilos estão em `client/src/index.css`. As classes Tailwind estão disponíveis para uso em componentes.

### Build para Produção

```bash
pnpm build
pnpm start
```

## 📦 Deploy

O projeto é um site estático puro e pode ser deployado em qualquer hosting:

- **Vercel**: `vercel deploy`
- **Netlify**: Conecte o repositório
- **GitHub Pages**: Configure para servir a pasta `dist`
- **Manus**: Use o botão Publish na interface

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar, modificar e distribuir.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se livre para:
- Adicionar novas cartas
- Melhorar o design
- Corrigir bugs
- Sugerir novas funcionalidades

## 📞 Contato

Para dúvidas ou sugestões, use o formulário de contato no site ou abra uma issue no repositório.

---

**Feito com ❤️ no estilo de Gary Halbert**
