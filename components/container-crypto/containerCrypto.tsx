"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiArrowDown, FiRefreshCw, FiStar } from "react-icons/fi";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Image from "next/image";

interface CryptoData {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      market_cap: number;
      volume_24h: number;
    };
  };
  cmc_rank: number;
  last_updated: string;
}

interface ApiResponse {
  status: {
    timestamp: string;
    error_code: number;
    error_message: string | null;
  };
  data: CryptoData[];
}

const ContainerCrypto: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState<"1h" | "24h" | "7d">(
    "24h"
  );
  const [favorites, setFavorites] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"all" | "favorites">("all");
  const [iconErrors, setIconErrors] = useState<Record<string, boolean>>({});

  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCryptoData = async () => {
    try {
      setIsRefreshing(true);

      // In a real Next.js app, we'd use an API route to protect our API key
      // For demonstration purposes, this shows the direct fetch approach
      const response = await fetch("/api/crypto");

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();

      if (data.status.error_code !== 0) {
        throw new Error(data.status.error_message || "Unknown API error");
      }

      setCryptoData(data.data);
      setLastUpdated(new Date());
      setIsLoading(false);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao buscar dados de criptomoedas"
      );
      setIsLoading(false);
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();

    // Set up auto-refresh every 60 seconds
    refreshIntervalRef.current = setInterval(fetchCryptoData, 60000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const getDisplayData = () => {
    if (viewMode === "favorites") {
      return cryptoData.filter((crypto) => favorites.includes(crypto.id));
    }
    return cryptoData;
  };

  const getChangeColor = (value: number) => {
    if (value > 0) return "text-green-500";
    if (value < 0) return "text-red-500";
    return "text-gray-400";
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };

  const formatPercent = (value: number) => {
    return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
  };

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
    return formatCurrency(value);
  };

  const handleRefresh = () => {
    fetchCryptoData();
  };

  const handleIconError = (symbol: string) => {
    setIconErrors(prev => ({ ...prev, [symbol]: true }));
  };

  const getIconUrl = (symbol: string) => {
    // Try a more reliable source - CoinGecko has better API and icons
    return `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/128/color/${symbol.toLowerCase()}.png`;
  };

  const displayData = getDisplayData();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-black to-cyan-700 py-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-700/20 blur-[100px] -z-10" />
      <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-cyan-500/20 blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Cotações de Criptomoedas
          </h2>
          <p className="text-gray-300 mt-3">
            Acompanhe as principais criptomoedas do mercado em tempo real
          </p>
        </motion.div>

        <div className="bg-gray-900/40 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl overflow-hidden mb-8">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <button
                onClick={() => setViewMode("all")}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  viewMode === "all"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setViewMode("favorites")}
                className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1 ${
                  viewMode === "favorites"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:text-white"
                }`}
              >
                <FiStar className="text-xs" />
                Favoritas {favorites.length > 0 && `(${favorites.length})`}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex rounded-full bg-gray-800 p-1">
                {(["1h", "24h", "7d"] as const).map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setActiveTimeframe(timeframe)}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      activeTimeframe === timeframe
                        ? "bg-gray-700 text-white"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-full bg-gray-800 text-cyan-400 hover:text-cyan-300 transition-colors disabled:opacity-50"
              >
                <motion.div
                  animate={isRefreshing ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <FiRefreshCw />
                </motion.div>
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-4 text-xs text-gray-400 font-medium">
                    Favorito
                  </th>
                  <th className="p-4 text-xs text-gray-400 font-medium">#</th>
                  <th className="p-4 text-xs text-gray-400 font-medium">
                    Nome
                  </th>
                  <th className="p-4 text-xs text-gray-400 font-medium text-right">
                    Preço
                  </th>
                  <th className="p-4 text-xs text-gray-400 font-medium text-right">
                    {activeTimeframe === "1h" && "1h %"}
                    {activeTimeframe === "24h" && "24h %"}
                    {activeTimeframe === "7d" && "7d %"}
                  </th>
                  <th className="p-4 text-xs text-gray-400 font-medium text-right">
                    Market Cap
                  </th>
                  <th className="p-4 text-xs text-gray-400 font-medium text-right">
                    Volume (24h)
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {isLoading ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                          <p className="mt-4 text-gray-400">
                            Carregando cotações...
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="bg-red-900/30 border border-red-900 rounded-lg p-4 max-w-md mx-auto">
                          <p className="text-red-400">{error}</p>
                          <button
                            onClick={handleRefresh}
                            className="mt-3 px-4 py-2 bg-red-900/50 hover:bg-red-800/50 text-white rounded-md transition-colors"
                          >
                            Tentar novamente
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : displayData.length === 0 && viewMode === "favorites" ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <p className="text-gray-400">
                          Você ainda não adicionou nenhuma moeda aos favoritos.
                        </p>
                        <button
                          onClick={() => setViewMode("all")}
                          className="mt-3 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-md text-white"
                        >
                          Ver todas as moedas
                        </button>
                      </td>
                    </tr>
                  ) : (
                    displayData.map((crypto) => {
                      const changeValue =
                        activeTimeframe === "1h"
                          ? crypto.quote.USD.percent_change_1h
                          : activeTimeframe === "24h"
                            ? crypto.quote.USD.percent_change_24h
                            : crypto.quote.USD.percent_change_7d;

                      return (
                        <motion.tr
                          key={crypto.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                        >
                          <td className="p-4">
                            <button
                              onClick={() => toggleFavorite(crypto.id)}
                              className="p-1.5 rounded-full hover:bg-gray-700/50 transition-colors"
                            >
                              <FiStar
                                className={
                                  favorites.includes(crypto.id)
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600"
                                }
                              />
                            </button>
                          </td>
                          <td className="p-4 text-gray-400">
                            {crypto.cmc_rank}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold overflow-hidden">
                                {!iconErrors[crypto.symbol] ? (
                                  <div className="relative w-full h-full">
                                    <Image
                                      alt={crypto.symbol}
                                      fill
                                      sizes="32px"
                                      className="object-cover"
                                      src={getIconUrl(crypto.symbol)}
                                      onError={() =>
                                        handleIconError(crypto.symbol)
                                      }
                                      unoptimized // Add this to bypass image optimization for external icons
                                    />
                                  </div>
                                ) : (
                                  crypto.symbol.slice(0, 2)
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-white">
                                  {crypto.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {crypto.symbol}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-right font-medium text-white">
                            {formatCurrency(crypto.quote.USD.price)}
                          </td>
                          <td className="p-4 text-right font-medium">
                            <div
                              className={`flex items-center justify-end gap-1 ${getChangeColor(changeValue)}`}
                            >
                              {changeValue > 0 ? (
                                <FiArrowUp size={14} />
                              ) : changeValue < 0 ? (
                                <FiArrowDown size={14} />
                              ) : null}
                              {formatPercent(changeValue)}
                            </div>
                          </td>
                          <td className="p-4 text-right text-gray-300">
                            {formatMarketCap(crypto.quote.USD.market_cap)}
                          </td>
                          <td className="p-4 text-right text-gray-300">
                            {formatMarketCap(crypto.quote.USD.volume_24h)}
                          </td>
                        </motion.tr>
                      );
                    })
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          {lastUpdated && !isLoading && !error && (
            <div className="p-4 border-t border-gray-800 text-xs text-gray-400 flex justify-between items-center">
              <span>
                Última atualização:{" "}
                {format(lastUpdated, "dd 'de' MMMM 'de' yyyy, HH:mm:ss", {
                  locale: ptBR,
                })}
              </span>
              <span>Dados fornecidos por CoinMarketCap</span>
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          <p>
            Os preços são mostrados em tempo real com atualização automática a
            cada minuto.
            <br />
            Adicione suas criptomoedas favoritas para acompanhar mais
            facilmente.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContainerCrypto;
