/**
 * Homepage - Cartas do Prompt Mage
 * Estilo: Carta datilografada de 1986 ao estilo Gary Halbert
 * Design: Papel amarelo-envelhecido, tipografia Courier New, layout de carta física
 */

import { Link } from "wouter";
import { getAllPosts } from "@/lib/posts";
import { useSEO } from "@/hooks/useSEO";
import { defaultSEO } from "@/lib/seo";

export default function Home() {
  const posts = getAllPosts();
  useSEO(defaultSEO);

  return (
    <div style={{ backgroundColor: '#f5e6d3' }} className="min-h-screen py-8 md:py-12">
      {/* Container principal */}
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12" style={{ backgroundColor: '#f5e6d3' }}>
        {/* Cabeçalho */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-wider">
            Minhas Cartas
          </h1>
          <p className="text-lg md:text-xl font-bold mt-4 mb-2">
            O que realmente funciona com IA em produção
          </p>
          <p className="text-base md:text-lg text-gray-700">
            Luiz, Minas Gerais, Brasil
          </p>
        </div>

        {/* Separador */}
        <div className="my-8 md:my-12 border-t-2 border-black"></div>

        {/* Introdução */}
        <div className="mb-8 md:mb-12 text-center">
          <p className="text-base md:text-lg leading-relaxed mb-4">
            Aqui estão as cartas que escrevi sobre o que realmente funciona quando você combina IA com código em produção.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            Não são teorias. São histórias de coisas que funcionaram (e de coisas que falharam).
          </p>
        </div>

        {/* Separador */}
        <div className="my-8 md:my-12 border-t-2 border-black"></div>

        {/* Lista de cartas */}
        <div className="space-y-6 md:space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="p-6 md:p-8 mb-6 md:mb-8 border-l-4 border-black" style={{ backgroundColor: '#f5e6d3' }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 leading-tight">
                {post.title}
              </h2>
              
              <div className="text-sm md:text-base text-gray-700 mb-4">
                <span className="font-bold">De:</span> {post.author} – {post.location}
                <br />
                <span className="font-bold">Data:</span> {post.date}
              </div>

              <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <Link href={`/carta/${post.slug}`} className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
                Ler a Carta Completa
              </Link>
            </article>
          ))}
        </div>

        {/* Separador final */}
        <div className="my-8 md:my-12 border-t-2 border-black"></div>

        {/* Rodapé com navegação */}
        <div className="text-center space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/sobre" className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
              Sobre o Autor
            </Link>
            <Link href="/contato" className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
              Entrar em Contato
            </Link>
          </div>
        </div>

        {/* P.S. final */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-400">
          <p className="font-bold mb-2">P.S.</p>
          <p className="text-base leading-relaxed">
            Se você quer receber novas cartas quando forem publicadas, deixe seu email na página de contato. Prometo não enviar spam – só histórias reais sobre IA e código que funcionam.
          </p>
        </div>
      </div>
    </div>
  );
}
