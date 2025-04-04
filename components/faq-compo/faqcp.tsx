"use client";

import { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";

// Define types for our FAQ items
interface FAQItem {
  question: string;
  answer: string;
}

const FAQComponent: React.FC = () => {
  // Client-side rendering check
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Array of FAQ items with proper typing
  const faqs: FAQItem[] = [
    {
      question: "Como converter criptoativos?",
      answer:
        "Para converter criptoativos, acesse sua carteira digital, selecione a opção de troca ou conversão, escolha as criptomoedas de origem e destino, informe o valor e confirme a transação após revisar as taxas aplicáveis.",
    },
    {
      question: "Como enviar criptomoedas?",
      answer:
        "Para enviar criptomoedas, acesse sua carteira, selecione a opção 'Enviar', digite o endereço do destinatário (ou escaneie o QR code), informe o valor desejado e confirme a transação.",
    },
    {
      question: "Como proteger minha carteira digital?",
      answer:
        "Proteja sua carteira digital utilizando autenticação de dois fatores, armazenando suas chaves privadas offline, utilizando senhas fortes e nunca compartilhando suas frases de recuperação com terceiros.",
    },
    {
      question: "Quais são as taxas de transação?",
      answer:
        "As taxas de transação variam de acordo com a rede blockchain utilizada e o congestionamento atual da rede. Algumas plataformas permitem ajustar as taxas para transações mais ou menos urgentes.",
    },
    {
      question: "Como declarar criptomoedas no imposto de renda?",
      answer:
        "Para declarar criptomoedas no imposto de renda, você deve informar seus ativos como 'outros bens', incluindo detalhes como quantidade, valor de aquisição e a exchange onde estão custodiados, conforme regulamentação vigente.",
    },
  ];

  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number): void => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Simple loading state while client is mounting
  if (!isMounted) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl opacity-0 transition-opacity duration-500">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Dúvidas frequentes
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl animate-fade-in-up">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Dúvidas frequentes
      </h1>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ 
              opacity: 1, 
              transform: 'translateY(0)', 
              transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s` 
            }}
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left bg-gray-800 hover:bg-gray-700 rounded-lg text-teal-400 font-medium transition-all duration-300 ease-in-out hover:scale-[1.01] active:scale-[0.99]"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span>{faq.question}</span>
              <div
                className={`text-2xl flex items-center justify-center h-6 w-6 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-45 text-cyan-300" : ""
                }`}
              >
                +
              </div>
            </button>

            <Transition
              show={activeIndex === index}
              enter="transition-all duration-300 ease-out"
              enterFrom="max-h-0 opacity-0"
              enterTo="max-h-[500px] opacity-100"
              leave="transition-all duration-200 ease-in"
              leaveFrom="max-h-[500px] opacity-100"
              leaveTo="max-h-0 opacity-0"
            >
              <div
                id={`faq-answer-${index}`}
                className="bg-gray-800 rounded-b-lg border-t border-gray-700 overflow-hidden"
              >
                <div className="p-5 text-gray-300 transform transition-transform duration-300 ease-out">
                  {faq.answer}
                </div>
              </div>
            </Transition>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add Tailwind animation classes
export default FAQComponent;