/**
 * Página de Contato - Cartas do Prompt Mage
 * Estilo: Carta de contato com formulário simples
 */

import { useState } from "react";
import { Link } from "wouter";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular envio (em produção, conectar a um backend)
    console.log('Formulário enviado:', formData);
    setEnviado(true);
    setTimeout(() => {
      setFormData({ nome: '', email: '', mensagem: '' });
      setEnviado(false);
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: '#f5e6d3' }} className="min-h-screen py-8 md:py-12">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12 bg-yellow-50" style={{ backgroundColor: '#f5e6d3' }}>
        {/* Botão voltar */}
        <div className="mb-8">
          <Link href="/" className="text-sm font-bold underline hover:no-underline">
            ← Voltar para as Cartas
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-wider">
          Entrar em Contato
        </h1>

        {/* Separador */}
        <div className="my-8 border-t-2 border-black"></div>

        {/* Conteúdo */}
        <div className="space-y-6 text-lg leading-relaxed" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
          <p>
            Querido Amigo,
          </p>

          <p>
            Se você quer responder a uma das minhas cartas, compartilhar uma história, ou simplesmente conversar sobre IA e código, estou aqui.
          </p>

          <p>
            Preencha o formulário abaixo e farei o possível para responder em até 48 horas.
          </p>

          {/* Separador */}
          <div className="my-8 border-t border-gray-400"></div>

          {/* Formulário */}
          {enviado ? (
            <div className="bg-green-100 border-2 border-green-800 p-6 text-center">
              <p className="font-bold text-green-800 text-lg">
                Mensagem enviada com sucesso!
              </p>
              <p className="text-green-700 mt-2">
                Obrigado por entrar em contato. Responderei em breve.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-bold mb-2">Seu Nome:</label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-black bg-white text-black"
                  style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Seu Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border-2 border-black bg-white text-black"
                  style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Sua Mensagem:</label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleChange}
                  required
                  rows={8}
                  className="w-full px-4 py-2 border-2 border-black bg-white text-black resize-none"
                  style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all"
                style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}
              >
                Enviar Mensagem
              </button>
            </form>
          )}

          {/* Separador */}
          <div className="my-8 border-t border-gray-400"></div>

          <p className="font-bold">P.S.</p>
          <p>
            Se preferir, pode também responder diretamente para luiz@promptmage.com (endereço fictício para este exemplo).
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
          <Link href="/" className="px-6 py-3 bg-black text-yellow-50 border-2 border-black font-bold uppercase tracking-wider hover:bg-yellow-50 hover:text-black transition-all inline-block" style={{ fontFamily: "'Courier Prime', 'Courier New', monospace" }}>
            Voltar para Cartas
          </Link>
        </div>
      </div>
    </div>
  );
}
