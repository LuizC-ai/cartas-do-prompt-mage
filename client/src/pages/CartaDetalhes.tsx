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

export default function CartaDetalhes() {
  const [match, params] = useRoute("/carta/:slug");

  if (!match) {
    return <NotFound />;
  }

  const slug = params?.slug as string;
  const post = getPostBySlug(slug);

  if (!post) {
    return <NotFound />;
  }

  useSEO(generatePostSEO(post.title, post.excerpt, post.slug));

  // Renderizar conteúdo com quebras de linha preservadas
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.trim() === '') {
        return <div key={idx} className="h-4" />;
      }
      
      // Detectar seções especiais
      if (line.startsWith('De:')) {
        return <p key={idx} className="font-bold mb-2">{line}</p>;
      }
      if (line.startsWith('Data:')) {
        return <p key={idx} className="text-gray-700 mb-4">{line}</p>;
      }
      if (line.startsWith('Querido')) {
        return <p key={idx} className="font-bold mb-4">{line}</p>;
      }
      if (line.startsWith('P.S.')) {
        return <p key={idx} className="font-bold mt-8 pt-4 border-t border-gray-400">{line}</p>;
      }
      if (line.startsWith('Atenciosamente')) {
        return <p key={idx} className="italic mt-4">{line}</p>;
      }
      
      // Parágrafo normal
      return <p key={idx} className="mb-4 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div style={{ backgroundColor: '#f5e6d3' }} className="min-h-screen py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12" style={{ backgroundColor: '#f5e6d3' }}>
        {/* Botão voltar */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-bold underline hover:no-underline">
            ← Voltar para as Cartas
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider mb-8">
          {post.title}
        </h1>

        {/* Separador */}
        <div className="my-8 border-t-2 border-black"></div>

        {/* Conteúdo da carta */}
        <div className="space-y-4" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace", fontSize: '1.125rem', lineHeight: '1.8' }}>
          {renderContent(post.content)}
        </div>

        {/* Separador final */}
        <div className="my-8 md:my-12 border-t-2 border-black"></div>

        {/* Navegação */}
        <div className="text-center space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
              Voltar para Cartas
            </Link>
            <Link href="/contato" className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
              Responder a Esta Carta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
