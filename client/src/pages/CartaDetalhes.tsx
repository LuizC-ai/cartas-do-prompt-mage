/**
 * Página de Carta Completa - Cartas do Prompt Mage
 * Estilo: Carta datilografada completa
 */

import { useRoute } from "wouter";
import { Link } from "wouter";
import { getPostBySlug } from "@/lib/posts";
import { useSEO } from "@/hooks/useSEO";
import { generatePostSEO } from "@/lib/seo";
import NotFound from "./NotFound";

const PAPER = "#f5e6d3";
const INK = "#1a1a1a";
const ACCENT = "#8b6f47";
const CODE_BG = "#1a1a1a";
const CODE_TEXT = "#e8d8be";
const MONO = "'Courier Prime', 'Courier New', monospace";

/**
 * Formatação inline: **negrito** e *itálico*.
 * Sem crase para código inline — a carta usa bloco de código para isso.
 */
const renderInline = (text: string, keyPrefix: string) => {
  const parts: React.ReactNode[] = [];
  const regex = /\*\*([^*]+)\*\*|\*([^*\n]+)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    if (match[1] !== undefined) {
      parts.push(<strong key={`${keyPrefix}-b-${i++}`} className="font-bold">{match[1]}</strong>);
    } else {
      parts.push(<em key={`${keyPrefix}-i-${i++}`} className="italic">{match[2]}</em>);
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return parts.length > 0 ? parts : [text];
};

/**
 * Markdown de carta: blocos de código, títulos, separador, citação,
 * lista, e as linhas próprias do formato epistolar (De:, Querido, P.S.).
 */
const renderContent = (content: string) => {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Bloco de código — a linha da cerca (```python) some, só o corpo fica
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        code.push(lines[i]);
        i++;
      }
      i++;
      const k = key++;
      blocks.push(
        <pre
          key={`k-${k}`}
          className="my-5 p-4 overflow-x-auto whitespace-pre rounded-sm"
          style={{ backgroundColor: CODE_BG, color: CODE_TEXT, fontFamily: MONO, fontSize: "13px", lineHeight: "1.6" }}
        >
          <code>{code.join("\n")}</code>
        </pre>
      );
      continue;
    }

    if (/^##\s+/.test(line)) {
      const k = key++;
      blocks.push(
        <h2 key={`k-${k}`} className="text-xl md:text-2xl font-bold mt-10 mb-4 leading-tight">
          {renderInline(line.replace(/^##\s+/, ""), `k-${k}-h2`)}
        </h2>
      );
      i++;
      continue;
    }

    if (/^###\s+/.test(line)) {
      const k = key++;
      blocks.push(
        <h3 key={`k-${k}`} className="text-lg md:text-xl font-bold mt-7 mb-3 leading-tight">
          {renderInline(line.replace(/^###\s+/, ""), `k-${k}-h3`)}
        </h3>
      );
      i++;
      continue;
    }

    if (/^#\s+/.test(line)) {
      const k = key++;
      blocks.push(
        <h1 key={`k-${k}`} className="text-2xl md:text-3xl font-bold mt-12 mb-6 leading-tight">
          {renderInline(line.replace(/^#\s+/, ""), `k-${k}-h1`)}
        </h1>
      );
      i++;
      continue;
    }

    if (/^---+\s*$/.test(line)) {
      blocks.push(<hr key={`k-${key++}`} className="border-0 border-t my-8" style={{ borderColor: INK }} />);
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quote.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      const k = key++;
      blocks.push(
        <blockquote
          key={`k-${k}`}
          className="my-5 py-3 px-5 italic"
          style={{ borderLeft: `3px solid ${ACCENT}`, backgroundColor: "rgba(139,111,71,0.06)" }}
        >
          {quote.map((q, idx) => (
            <p key={idx} className="mb-2 leading-relaxed">{renderInline(q, `k-${k}-q-${idx}`)}</p>
          ))}
        </blockquote>
      );
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ""));
        i++;
      }
      const k = key++;
      blocks.push(
        <ul key={`k-${k}`} className="my-4 pl-2 space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed flex">
              <span className="mr-3 select-none" style={{ color: ACCENT }}>—</span>
              <span>{renderInline(item, `k-${k}-li-${idx}`)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (line.trim() === "") {
      blocks.push(<div key={`k-${key++}`} className="h-4" />);
      i++;
      continue;
    }

    // Linhas próprias da carta
    const remetente = line.match(/^\*?(De:.*?)\*?$/);
    if (remetente && remetente[1].startsWith("De:")) {
      blocks.push(
        <p key={`k-${key++}`} className="italic mb-4 mt-2" style={{ color: ACCENT, fontSize: "15px" }}>
          {remetente[1]}
        </p>
      );
      i++;
      continue;
    }

    if (line.startsWith("Data:")) {
      blocks.push(<p key={`k-${key++}`} className="mb-4" style={{ color: ACCENT }}>{line}</p>);
      i++;
      continue;
    }

    if (line.startsWith("Querido") || line.startsWith("Caro amigo")) {
      blocks.push(<p key={`k-${key++}`} className="font-bold mb-5 mt-2 text-lg">{line}</p>);
      i++;
      continue;
    }

    if (line.startsWith("P.S.")) {
      const k = key++;
      blocks.push(
        <p key={`k-${k}`} className="font-bold mt-10 pt-5 mb-3 leading-relaxed text-lg" style={{ borderTop: `1px solid ${INK}` }}>
          {renderInline(line, `k-${k}`)}
        </p>
      );
      i++;
      continue;
    }

    if (line.startsWith("Atenciosamente") || line.startsWith("Sinceramente") || line.startsWith("Mais depois")) {
      blocks.push(<p key={`k-${key++}`} className="italic mt-6">{line}</p>);
      i++;
      continue;
    }

    const k = key++;
    blocks.push(
      <p key={`k-${k}`} className="mb-4 leading-relaxed">{renderInline(line, `k-${k}`)}</p>
    );
    i++;
  }

  return blocks;
};

export default function CartaDetalhes() {
  const [match, params] = useRoute("/carta/:slug");
  const slug = params?.slug as string;
  const post = match ? getPostBySlug(slug) : undefined;

  useSEO(generatePostSEO(post?.title ?? "", post?.excerpt ?? "", post?.slug ?? ""));

  if (!match || !post) {
    return <NotFound />;
  }

  return (
    <div style={{ backgroundColor: PAPER }} className="min-h-screen py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12" style={{ backgroundColor: PAPER }}>
        {/* Botão voltar */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-bold underline hover:no-underline">
            ← Voltar para as Cartas
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-4">
          {post.title}
        </h1>

        {/* Assinatura da carta */}
        <p className="text-sm mb-8" style={{ color: ACCENT, fontFamily: MONO }}>
          {post.author} · {post.date}
        </p>

        {/* Separador */}
        <div className="my-8 border-t-2 border-black"></div>

        {/* Conteúdo da carta */}
        <div style={{ fontFamily: MONO, fontSize: '1.125rem', lineHeight: '1.8' }}>
          {renderContent(post.content)}
        </div>

        {/* Separador final */}
        <div className="my-8 md:my-12 border-t-2 border-black"></div>

        {/* Navegação */}
        <div className="text-center space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: MONO }}>
              Voltar para Cartas
            </Link>
            <Link href="/contato" className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: MONO }}>
              Responder a Esta Carta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
