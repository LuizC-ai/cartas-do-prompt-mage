/**
 * Página Sobre o Autor - Cartas do Prompt Mage
 * Estilo: Carta de apresentação longa
 */

import { Link } from "wouter";

export default function Sobre() {
  return (
    <div style={{ backgroundColor: '#f5e6d3' }} className="min-h-screen py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12 bg-yellow-50" style={{ backgroundColor: '#f5e6d3' }}>
        {/* Botão voltar */}
        <div className="mb-8">
          <Link href="/">
            <a className="text-sm font-bold underline hover:no-underline">
              ← Voltar para as Cartas
            </a>
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-wider">
          Sobre o Autor
        </h1>

        {/* Separador */}
        <div className="my-8 border-t-2 border-black"></div>

        {/* Conteúdo */}
        <div className="space-y-6 text-lg leading-relaxed" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
          <div>
            <p className="font-bold mb-2">De: Luiz</p>
            <p className="text-gray-700">Minas Gerais, Brasil</p>
          </div>

          <p>
            Meu nome é Luiz. Sou desenvolvedor, empreendedor e alguém que gasta muito tempo pensando em como fazer as coisas funcionarem em produção.
          </p>

          <p>
            Comecei a programar aos 14 anos. Fiz meu primeiro "produto" aos 18 – foi um fracasso monumental. Mas aprendi mais com aquele fracasso do que com qualquer sucesso que tive depois.
          </p>

          <p>
            Nos últimos 5 anos, construí e lancei mais de 10 produtos. Alguns falharam. Alguns geraram receita. Alguns ainda estão em produção gerando dinheiro enquanto durmo.
          </p>

          <p>
            Descobri que a maioria dos problemas que as pessoas enfrentam não é técnica. É sobre **entender o que o cliente realmente quer**. É sobre **construir com intenção**. É sobre **testar rapidamente e aprender mais rápido ainda**.
          </p>

          <p>
            Quando a IA começou a ficar acessível (GPT-3, depois GPT-4), vi uma oportunidade. Não era para substituir desenvolvedores. Era para amplificar o que já funciona.
          </p>

          <p>
            Comecei a experimentar. Descobri padrões. Descobri o que funciona e o que não funciona. E decidi compartilhar essas descobertas através dessas cartas.
          </p>

          <p>
            Cada carta que você lê aqui é baseada em algo que realmente funcionou (ou que realmente falhou, e aprendi com isso). Não são teorias. São histórias.
          </p>

          <p>
            Meu objetivo é simples: ajudar outras pessoas a construir coisas que funcionam. Coisas que geram valor. Coisas que duram.
          </p>

          {/* Separador */}
          <div className="my-8 border-t border-gray-400"></div>

          <div className="font-bold">
            <p>O que você vai encontrar aqui:</p>
            <ul className="mt-4 space-y-2 ml-4">
              <li>• Histórias reais sobre IA em produção</li>
              <li>• Código que funciona (e por que funciona)</li>
              <li>• Lições aprendidas com fracassos</li>
              <li>• Padrões que se repetem</li>
              <li>• Métricas que importam</li>
            </ul>
          </div>

          {/* Separador */}
          <div className="my-8 border-t border-gray-400"></div>

          <p className="font-bold">P.S.</p>
          <p>
            Se você quer conversar sobre IA, código, empreendedorismo ou qualquer coisa relacionada, mande um email. Respondo todos (eventualmente).
          </p>

          <p className="italic">
            Atenciosamente,<br />
            Luiz
          </p>
        </div>

        {/* Separador final */}
        <div className="my-8 md:my-12 border-t-2 border-black"></div>

        {/* Navegação */}
        <div className="text-center space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/">
              <a className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
                Voltar para Cartas
              </a>
            </Link>
            <Link href="/contato">
              <a className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
                Entrar em Contato
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
