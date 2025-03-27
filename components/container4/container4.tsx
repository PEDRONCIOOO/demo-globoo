"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiSearch } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
  category: "basics" | "security" | "technology" | "financial";
}

const Container4: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const faqItems: FAQItem[] = [
    {
      question: "O que é blockchain?",
      answer:
        "Blockchain é uma tecnologia de registro distribuído que permite o armazenamento de dados em vários computadores. Cada bloco contém um conjunto de transações e um link para o bloco anterior, formando uma cadeia. Esta estrutura torna os dados imutáveis e altamente seguros.",
      category: "basics",
    },
    {
      question: "Como funciona uma carteira de criptomoedas?",
      answer:
        "Uma carteira de criptomoedas é um software que armazena chaves privadas e públicas. A chave pública é comparável a um número de conta bancária, enquanto a chave privada é como a senha para acessar esta conta. A carteira não armazena realmente as criptomoedas, mas sim as chaves que permitem acessá-las na blockchain.",
      category: "basics",
    },
    {
      question: "O que é mineração de criptomoedas?",
      answer:
        "Mineração é o processo pelo qual novas transações são verificadas e adicionadas à blockchain. Os mineradores usam computadores poderosos para resolver problemas matemáticos complexos. Quando resolvem um problema, ganham o direito de adicionar um novo bloco à cadeia e são recompensados com criptomoedas recém-criadas.",
      category: "technology",
    },
    {
      question: "O que é um smart contract?",
      answer:
        "Smart contracts (contratos inteligentes) são programas que executam automaticamente quando certas condições são cumpridas. Eles funcionam na blockchain e são usados para automatizar acordos, eliminando a necessidade de intermediários. Por exemplo, um smart contract pode liberar fundos automaticamente quando um produto é entregue.",
      category: "technology",
    },
    {
      question: "Como a blockchain garante segurança?",
      answer:
        "A blockchain garante segurança através de criptografia, descentralização e consenso. Cada transação é criptografada e vinculada à anterior. Como os dados são armazenados em milhares de computadores diferentes, é quase impossível hackear todos eles simultaneamente. Além disso, qualquer tentativa de alterar um bloco seria rejeitada pelo mecanismo de consenso da rede.",
      category: "security",
    },
    {
      question: "O que são tokens NFT?",
      answer:
        "NFT significa 'Non-Fungible Token' (Token Não-Fungível). Ao contrário das criptomoedas como Bitcoin, que são fungíveis (cada bitcoin tem o mesmo valor), os NFTs são únicos e não podem ser trocados de forma equivalente. Eles são usados para representar propriedade de itens digitais únicos como arte, música, itens de jogos e muito mais.",
      category: "basics",
    },
    {
      question: "Qual a diferença entre blockchain pública e privada?",
      answer:
        "Uma blockchain pública (como Bitcoin ou Ethereum) é aberta para qualquer pessoa participar, ler e escrever. Uma blockchain privada restringe o acesso a participantes específicos, geralmente em um contexto empresarial. Blockchains privadas oferecem maior velocidade e controle, enquanto as públicas fornecem maior descentralização e transparência.",
      category: "technology",
    },
    {
      question: "Como declarar criptomoedas no imposto de renda no Brasil?",
      answer:
        "No Brasil, criptomoedas devem ser declaradas como 'outros bens' no imposto de renda. Se o valor total exceder R$ 5.000, é obrigatório declarar. Além disso, lucros acima de R$ 35.000 por mês em vendas estão sujeitos ao imposto sobre ganho de capital, com alíquota de 15% a 22,5%. É importante manter um registro detalhado de todas as transações.",
      category: "financial",
    },
    {
      question: "O que é DeFi (Finanças Descentralizadas)?",
      answer:
        "DeFi refere-se a aplicações financeiras construídas sobre redes blockchain que visam eliminar intermediários dos serviços financeiros tradicionais. Isso inclui empréstimos, negociação de ativos, seguros e poupança, tudo feito de forma peer-to-peer sem bancos. Os usuários mantêm controle total de seus ativos através de carteiras digitais.",
      category: "financial",
    },
    {
      question: "O que é um ataque de 51% em blockchain?",
      answer:
        "Um ataque de 51% ocorre quando uma entidade ou grupo controla mais de 50% do poder de processamento (taxa de hash) de uma rede blockchain. Com este controle, os atacantes poderiam impedir novas transações de serem confirmadas ou reverter transações recentes, permitindo gastos duplos. Quanto maior e mais descentralizada a rede, mais difícil e custoso é realizar este tipo de ataque.",
      category: "security",
    },
  ];

  const categories = [
    { id: "basics", name: "Conceitos Básicos", color: "#3DBEFF" },
    { id: "security", name: "Segurança", color: "#FF5757" },
    { id: "technology", name: "Tecnologia", color: "#9D5BFC" },
    { id: "financial", name: "Financeiro", color: "#4DFFC9" },
  ];

  const getColor = (category: string) => {
    const found = categories.find((cat) => cat.id === category);
    return found ? found.color : "#3DBEFF";
  };

  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFAQs = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const accentVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1],
      opacity: [0, 0.8, 0.4],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror" as "mirror",
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black py-20 overflow-hidden">
      {/* Background accent elements */}
      <motion.div
        className="absolute top-40 right-20 w-80 h-80 rounded-full bg-cyan-500 blur-[100px] -z-10"
        variants={accentVariants}
        initial="initial"
        animate="animate"
      />
      <motion.div
        className="absolute bottom-40 left-20 w-96 h-96 rounded-full bg-cyan-700 blur-[120px] -z-10"
        variants={accentVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1.5 }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Tire suas dúvidas sobre blockchain, criptomoedas e tecnologias
            descentralizadas
          </p>
        </motion.div>

        <div className="mb-10">
          <div className="relative mb-8">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative"
            >
              <input
                ref={searchRef}
                type="text"
                placeholder="Buscar uma pergunta..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900/50 text-white p-4 pl-12 pr-4 rounded-xl border border-gray-700 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </motion.div>

            {searchTerm && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  setSearchTerm("");
                  searchRef.current?.focus();
                }}
              >
                Limpar
              </motion.button>
            )}
          </div>

          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full border transition-all ${
                !activeCategory
                  ? "bg-white/10 border-white/30 text-white"
                  : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === category.id ? null : category.id
                  )
                }
                className={`px-4 py-2 rounded-full border transition-all ${
                  activeCategory === category.id
                    ? "bg-white/10 border-white/30 text-white shadow-lg"
                    : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow:
                    activeCategory === category.id
                      ? `0 0 15px ${category.color}40`
                      : "none",
                  borderColor:
                    activeCategory === category.id ? category.color : undefined,
                }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-5"
        >
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                variants={childVariants}
                className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden backdrop-blur-sm"
                layoutId={`faq-${index}`}
                style={{
                  borderLeft: `4px solid ${getColor(faq.category)}`,
                  boxShadow:
                    activeIndex === index
                      ? `0 0 20px ${getColor(faq.category)}30`
                      : "none",
                }}
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="flex justify-between items-center w-full p-5 text-left"
                >
                  <span className="text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-gray-400 text-xl" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-2 text-gray-300 border-t border-gray-800">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-400 text-xl">
                Nenhuma pergunta encontrada para &quot;{searchTerm}&quot;
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white"
              >
                Limpar pesquisa
              </button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Não encontrou o que procurava?
          </h3>
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-300 to-cyan-600 rounded-full text-white font-medium shadow-lg hover:shadow-cyan-500/20 transition-all">
            Fale com nossa inteligência artificial.
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Container4;
