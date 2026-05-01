/**
 * Sistema de gerenciamento de posts em Markdown
 * Compatível com exportação do Obsidian
 */

export interface PostMetadata {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  author: string;
  location: string;
}

export interface Post extends PostMetadata {
  content: string;
}

// Posts de exemplo - podem ser substituídos por importação do Obsidian
export const POSTS: Post[] = [
  {
    title: "Como Treinar uma IA para Vender Mais (Sem Parecer um Robô)",
    date: "15 de abril de 2026",
    excerpt: "Descobri que a maioria dos prompts falha porque as pessoas tentam ser muito técnicas. A IA quer histórias. Quer emoção. Quer saber por que você está fazendo aquilo.",
    slug: "treinar-ia-vender-mais",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `De: Luiz – Minas Gerais, Brasil
Data: 15 de abril de 2026

Querido Amigo,

Você já parou para pensar no que realmente faz uma IA funcionar bem? Não é a quantidade de dados. Não é o modelo mais avançado. É a **intenção clara**.

Passei os últimos 3 meses testando diferentes abordagens com Claude, GPT-4 e Gemini. E descobri algo que ninguém fala: a maioria dos prompts falha porque as pessoas tentam ser muito técnicas. A IA quer histórias. Quer emoção. Quer saber por que você está fazendo aquilo.

Quando comecei a treinar minha IA pessoal com histórias de vendas reais (casos que funcionaram, casos que falharam), os resultados melhoraram em 340%. Não estou exagerando. Os textos começaram a converter melhor. Os emails começaram a ter mais resposta.

A métrica que importa: **taxa de cliques + taxa de resposta**. Não é o tamanho do texto. Não é se parece "natural". É se a pessoa do outro lado quer responder.

Aqui está o sistema que usei:

1. Coleta de histórias reais (seus melhores casos de vendas)
2. Análise do padrão emocional (por que funcionou?)
3. Treinamento da IA com esses padrões
4. Teste A/B com a audiência real
5. Refinamento contínuo

O resultado? Meus emails de vendas agora têm 47% de taxa de abertura. Antes eram 12%.

P.S. A coisa mais importante que aprendi: a IA é um amplificador. Se você coloca lixo, ela amplifica lixo. Se você coloca ouro, ela amplifica ouro. Invista tempo em coletar suas melhores histórias.

Atenciosamente,
Luiz`
  },
  {
    title: "O Código que Salvou Meu Negócio (E Pode Salvar o Seu)",
    date: "8 de abril de 2026",
    excerpt: "Tinha um problema: meu sistema de automação estava caindo 3 vezes por semana. Perdia vendas. Perdia confiança do cliente. Até que descobri o padrão.",
    slug: "codigo-salvou-negocio",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `De: Luiz – Minas Gerais, Brasil
Data: 8 de abril de 2026

Querido Amigo,

Tinha um problema que tirava meu sono: meu sistema de automação estava caindo 3 vezes por semana.

Perdia vendas. Perdia confiança do cliente. Até que descobri o padrão.

Não era a infraestrutura. Era o código. Especificamente, era a forma como eu estava lidando com erros de conexão.

Implementei um sistema de retry com backoff exponencial + circuit breaker. Simples. Elegante. Funcionou.

Desde então, meu sistema tem 99.8% de uptime. Não é perfeito, mas é suficiente para não perder vendas.

A lição: **confiabilidade não é um luxo, é um investimento**. Cada minuto de downtime custa dinheiro.

P.S. Se você está construindo algo que gera receita, invista em observabilidade. Saiba quando as coisas quebram ANTES de seus clientes descobrirem.

Atenciosamente,
Luiz`
  },
  {
    title: "Por Que Meu Primeiro Produto Fracassou (E Como o Segundo Virou Receita)",
    date: "1º de abril de 2026",
    excerpt: "O primeiro produto que lancei foi um fracasso total. Ninguém comprou. Ninguém nem olhou. Mas aprendi mais com esse fracasso do que com qualquer sucesso.",
    slug: "primeiro-produto-fracassou",
    author: "Luiz",
    location: "Minas Gerais, Brasil",
    content: `De: Luiz – Minas Gerais, Brasil
Data: 1º de abril de 2026

Querido Amigo,

O primeiro produto que lancei foi um fracasso total.

Ninguém comprou. Ninguém nem olhou. Passei 2 meses construindo. Lancei. Silêncio.

Mas aprendi mais com esse fracasso do que com qualquer sucesso.

Descobri que eu tinha construído a solução para um problema que ninguém tinha. Eu estava tão apaixonado pela tecnologia que esqueci de perguntar: **alguém realmente quer isso?**

Com o segundo produto, fiz diferente. Antes de escrever uma linha de código, conversei com 50 pessoas. Perguntei sobre seus problemas. Escutei.

Construí exatamente o que eles pediram. Nada mais. Nada menos.

Resultado: 200 vendas no primeiro mês.

A diferença entre fracasso e sucesso não foi a qualidade do código. Foi a qualidade da pesquisa.

P.S. Seu próximo produto já está sendo rejeitado. A questão é: você vai descobrir antes ou depois de gastar 2 meses construindo?

Atenciosamente,
Luiz`
  }
];

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find(post => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return POSTS.sort((a, b) => {
    // Ordena por data decrescente (mais recente primeiro)
    const dateA = new Date(a.date.split(' de ').reverse().join('-')).getTime();
    const dateB = new Date(b.date.split(' de ').reverse().join('-')).getTime();
    return dateB - dateA;
  });
}

export function getPostExcerpt(content: string, maxLength: number = 150): string {
  // Remove quebras de linha e espaços extras
  const text = content.replace(/\n/g, ' ').replace(/\s+/g, ' ');
  // Encontra o primeiro parágrafo
  const paragraphs = text.split('.');
  let excerpt = '';
  
  for (const para of paragraphs) {
    if (excerpt.length < maxLength) {
      excerpt += para + '.';
    } else {
      break;
    }
  }
  
  return excerpt.trim();
}
