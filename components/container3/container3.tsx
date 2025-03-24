"use client";

import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
    transition: { duration: 0.3 },
  },
};

const Container3 = () => {
  const cards = [
    {
      title: "Carteira Digital de Criptomoedas",
      description:
        "Permite a transferência e controle de saldos de criptoativos, com recursos como autenticação de dois fatores (2FA), lista de amigos, QRCode e histórico de transações.",
      features: ["Redes EVM", "Rede Bitcoin", "Rede Tron"],
    },
    {
      title: "Marketplace",
      description:
        "Plataforma digital de e-commerce e marketplace, responsável pela venda de diversos produtos e serviços.",
      features: [
        "Gestão de promoções",
        "Gestão de estoque",
        "Métodos de pagamento",
      ],
    },
    {
      title: "Banco Digital White Label",
      description:
        "Seu Internet Banking, integrado com seu ecossistema de criptomoedas e os principais provedores de BaaS do mercado.",
      features: [
        "PIX, Transferências bancárias e Boletos",
        "Folha de pagamento",
        "Depósitos",
      ],
    },
    {
      title: "Tokenização e NFTs",
      description:
        "Plataforma digital para tokenização de produtos em blockchain.",
      features: [
        "Criação automática de Smart Contracts para NFTs e Tokens ERC20",
        "Mercado Secundário",
        "Distribuição de Recursos",
      ],
    },
    {
      title: "Gateway de Pagamento em Cripto",
      description: "Aceitando criptomoedas como método de pagamento.",
      features: [
        "Transações globais instantâneas",
        "Baixas taxas de transação",
        "Aceitação de múltiplas criptomoedas",
      ],
    },
    {
      title: "Crowdfunding",
      description:
        "Através da nossa plataforma, captações de recursos são verdadeiramente tokenizadas do início ao fim.",
      features: [
        "Gestão descentralizada e segura",
        "Transparência completa nas transações",
        "Regulamentação pela CVM",
      ],
    },
    {
      title: "Exchange",
      description:
        "Para negociar desde criptomoedas até o mercado secundário de crowdfunding, conectando-se diretamente com livros de ordens das principais exchanges do mercado.",
      features: [
        "Suporte para múltiplas criptomoedas",
        "Alta liquidez de mercado",
        "Console de administração personalizável",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-black to-gray-900 text-white py-16 px-8">
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-cyan-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Um Ecossistema Completo
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mt-4 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Explore um ecossistema personalizável que fornece soluções blockchain
          e segurança de alto nível para otimizar as operações diárias da sua
          empresa.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-cyan-400"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            {/* Glowing Border Effect */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-cyan-400 opacity-0 pointer-events-none"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            ></motion.div>

            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              {card.title}
            </h2>
            <p className="text-gray-300 mb-4">{card.description}</p>
            <ul className="space-y-2">
              {card.features.map((feature, i) => (
                <li key={i} className="flex items-center text-gray-400 text-sm">
                  <span className="mr-2 text-cyan-400">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Container3;
