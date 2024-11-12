import React from 'react';
import { HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'O que devo procurar em uma boa creche para cachorro?',
    answer: 'Uma boa creche deve ter equipe qualificada, ambiente seguro e espaçoso, supervisão constante, área para exercícios, protocolos de emergência e transparência com os tutores.'
  },
  {
    question: 'Qual é o melhor momento para começar a levar meu cachorro à creche?',
    answer: 'O ideal é começar após a conclusão do esquema vacinal completo, geralmente após os 4 meses de idade. É importante que o cachorro já tenha alguma socialização básica.'
  },
  {
    question: 'Como funciona o período de adaptação?',
    answer: 'O período de adaptação geralmente começa com visitas curtas que vão aumentando gradualmente. Isso permite que seu cachorro se acostume com o ambiente, outros cães e a equipe.'
  },
  {
    question: 'Quais documentos são necessários para matricular meu cachorro?',
    answer: 'Normalmente são necessários: carteira de vacinação atualizada, comprovante de vermifugação, atestado de saúde do veterinário e documentos do tutor.'
  }
];

const FaqSection = () => {
  return (
    <section id="faq" className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="text-amber-500" size={32} />
        <h2 className="text-3xl font-bold text-gray-800">Perguntas Frequentes</h2>
      </div>

      <div className="grid gap-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;