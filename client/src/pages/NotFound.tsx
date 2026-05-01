/**
 * Página 404 - Cartas do Prompt Mage
 */

import { Link } from "wouter";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: '#f5e6d3' }} className="min-h-screen py-8 md:py-12 flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12 text-center" style={{ backgroundColor: '#f5e6d3' }}>
        <h1 className="text-6xl md:text-8xl font-bold mb-6" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
          404
        </h1>
        
        <p className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
          Página Não Encontrada
        </p>
        
        <p className="text-lg md:text-xl mb-8 leading-relaxed" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
          Desculpe, a carta que você procura não existe. Talvez tenha sido perdida no correio.
        </p>

        <div className="border-t-2 border-black my-8"></div>

        <Link href="/">
          <a className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
            Voltar para Cartas
          </a>
        </Link>
      </div>
    </div>
  );
}
