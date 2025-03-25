"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Define interfaces for component props
interface StarProps {
  size?: number;
  color?: string;
  speed?: number;
  delay?: number;
  initialX: number;
  initialY: number;
}

interface StarData extends StarProps {
  id: number;
}

// Star particle component
const Star: React.FC<StarProps> = ({
  size,
  color,
  speed,
  delay,
  initialX,
  initialY,
}) => {
  const baseSize = size || Math.random() * 3 + 1;

  return (
    <motion.div
      className="absolute rounded-full bg-white"
      initial={{
        x: initialX,
        y: initialY,
        opacity: Math.random() * 0.5 + 0.2,
        scale: 0,
      }}
      animate={{
        y: initialY + 1000,
        opacity: [null, Math.random() * 0.8 + 0.2, 0],
        scale: [null, baseSize / 2, baseSize, baseSize / 2, 0],
      }}
      transition={{
        duration: speed || Math.random() * 40 + 40,
        ease: "linear",
        delay: delay || Math.random() * 10,
        repeat: Infinity,
        repeatType: "loop",
      }}
      style={{
        width: baseSize,
        height: baseSize,
        backgroundColor:
          color ||
          (Math.random() > 0.3
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(0, 255, 255, 0.8)"),
      }}
    />
  );
};

// Define card data interface
interface CardData {
  title: string;
  description: string;
  features: string[];
  bgGradient: string;
  accentColor: string;
}

// Custom simplified card component with 3D effect
const Card3D: React.FC<CardData> = ({
  title,
  description,
  features,
  bgGradient,
  accentColor,
}) => {
  return (
    <div className="group perspective">
      <motion.div
        className="relative w-full h-[400px] rounded-2xl transition-all duration-500 preserve-3d cursor-pointer shadow-xl border border-opacity-20"
        whileHover={{
          rotateX: 10,
          rotateY: 15,
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
        style={{
          transformStyle: "preserve-3d",
          borderColor: accentColor,
        }}
      >
        {/* Card background with gradient */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden backface-hidden">
          <div className={`absolute inset-0 ${bgGradient}`} />

          {/* Shimmer effect overlay */}
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(45deg, transparent 30%, ${accentColor} 50%, transparent 70%)`,
              backgroundSize: "200% 200%",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />

          {/* Grain texture for depth */}
          <div className="absolute inset-0 opacity-20 bg-noise" />
        </div>

        {/* Glowing accent lines */}
        <div
          className="absolute top-6 left-6 right-6 h-[1px] opacity-40 backface-hidden"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            transform: "translateZ(5px)",
          }}
        />

        <div
          className="absolute bottom-6 left-6 right-6 h-[1px] opacity-40 backface-hidden"
          style={{
            background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
            transform: "translateZ(5px)",
          }}
        />

        {/* Card content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white backface-hidden">
          <div>
            <h3
              className="text-2xl font-bold mb-4 transform translate-z-10"
              style={{
                color: accentColor,
                textShadow: `0 0 10px ${accentColor}40`,
              }}
            >
              {title}
            </h3>
            <p className="text-sm text-gray-300 mb-4 transform translate-z-10">
              {description}
            </p>
          </div>

          <ul className="space-y-2 transform translate-z-10">
            {features.map((feature, i) => (
              <li key={i} className="flex items-center text-gray-300 text-xs">
                <span className="mr-2 text-lg" style={{ color: accentColor }}>
                  •
                </span>
                {feature}
              </li>
            ))}
          </ul>

          {/* Floating 3D elements */}
          <div
            className="absolute right-6 top-6 w-12 h-12 rounded-lg opacity-40"
            style={{
              border: `1px solid ${accentColor}`,
              transform: "translateZ(30px) rotate(15deg)",
              boxShadow: `0 0 15px ${accentColor}40`,
            }}
          />

          <div
            className="absolute left-10 bottom-10 w-8 h-8 rounded-full opacity-30"
            style={{
              border: `1px solid ${accentColor}`,
              transform: "translateZ(20px)",
              boxShadow: `0 0 15px ${accentColor}40`,
            }}
          />

          {/* Abstract dot pattern */}
          <div
            className="absolute bottom-8 right-8 grid grid-cols-3 gap-1 opacity-40"
            style={{ transform: "translateZ(10px)" }}
          >
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: i % 2 === 0 ? accentColor : "white" }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Container3: React.FC = () => {
  const [stars, setStars] = useState<StarData[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Subtle parallax effect
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    // Generate stars only on client-side
    if (typeof window === "undefined") return;

    const containerWidth =
      containerRef.current?.offsetWidth || window.innerWidth;
    const containerHeight =
      containerRef.current?.offsetHeight || window.innerHeight;

    const starCount = Math.floor((containerWidth * containerHeight) / 10000);
    const newStars: StarData[] = [];

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        initialX: Math.random() * containerWidth,
        initialY: Math.random() * containerHeight - containerHeight / 2,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 40 + 40,
        delay: Math.random() * 10,
        color:
          Math.random() > 0.8
            ? "rgba(0, 255, 255, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
      });
    }

    setStars(newStars);

    const handleResize = () => {
      if (!containerRef.current) return;

      const newContainerWidth = containerRef.current.offsetWidth;
      const newContainerHeight = containerRef.current.offsetHeight;
      const newStarCount = Math.floor(
        (newContainerWidth * newContainerHeight) / 10000
      );

      if (Math.abs(newStarCount - stars.length) > 10) {
        const resizedStars: StarData[] = [];

        for (let i = 0; i < newStarCount; i++) {
          resizedStars.push({
            id: i,
            initialX: Math.random() * newContainerWidth,
            initialY:
              Math.random() * newContainerHeight - newContainerHeight / 2,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 40 + 40,
            delay: Math.random() * 10,
            color:
              Math.random() > 0.8
                ? "rgba(0, 255, 255, 0.8)"
                : "rgba(255, 255, 255, 0.8)",
          });
        }

        setStars(resizedStars);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef]);

  const cards: CardData[] = [
    {
      title: "Carteira Digital de Criptomoedas",
      description:
        "Permite a transferência e controle de saldos de criptoativos, com recursos como autenticação de dois fatores (2FA), lista de amigos, QRCode e histórico de transações.",
      features: ["Redes EVM", "Rede Bitcoin", "Rede Tron"],
      bgGradient:
        "bg-gradient-to-br from-cyan-900/60 via-blue-950/70 to-black/80",
      accentColor: "#00FFFF",
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
      bgGradient:
        "bg-gradient-to-br from-blue-800/60 via-indigo-900/70 to-black/80",
      accentColor: "#5B8AF6",
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
      bgGradient:
        "bg-gradient-to-br from-cyan-800/60 via-blue-900/70 to-black/80",
      accentColor: "#4EEAFF",
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
      bgGradient:
        "bg-gradient-to-br from-purple-800/60 via-indigo-900/70 to-black/80",
      accentColor: "#A88BFA",
    },
    {
      title: "Gateway de Pagamento em Cripto",
      description: "Aceitando criptomoedas como método de pagamento.",
      features: [
        "Transações globais instantâneas",
        "Baixas taxas de transação",
        "Aceitação de múltiplas criptomoedas",
      ],
      bgGradient:
        "bg-gradient-to-br from-blue-700/60 via-cyan-800/70 to-black/80",
      accentColor: "#0FAAFF",
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
      bgGradient:
        "bg-gradient-to-br from-teal-800/60 via-blue-900/70 to-black/80",
      accentColor: "#4DFFF0",
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
      bgGradient:
        "bg-gradient-to-br from-blue-900/60 via-indigo-800/70 to-black/80",
      accentColor: "#00D0FF",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden min-h-screen bg-gradient-to-b from-black via-cyan-950 to-black"
    >
      {/* Galaxy background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Nebula effect */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            y: backgroundY,
            background:
              "radial-gradient(circle at 30% 50%, rgba(0, 255, 255, 0.15), transparent 60%), radial-gradient(circle at 70% 30%, rgba(128, 0, 255, 0.1), transparent 50%)",
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Stars */}
        {stars.map((star) => (
          <Star
            key={star.id}
            size={star.size}
            speed={star.speed}
            delay={star.delay}
            initialX={star.initialX}
            initialY={star.initialY}
            color={star.color}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen max-w-[1300px] mx-auto py-16 px-8">
        <div className="text-center mb-16">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-cyan-400"
            initial={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
          >
            Um Ecossistema Completo
          </motion.h1>
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-lg md:text-xl mt-4 text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Explore um ecossistema personalizável que fornece soluções
            blockchain e segurança de alto nível para otimizar as operações
            diárias da sua empresa.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <Card3D {...card} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Container3;
