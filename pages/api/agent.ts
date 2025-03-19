import type { NextApiRequest, NextApiResponse } from "next";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey:
    "xai-VeyfX6WCK9yWYbNmg8QJPAlcdmK4HfTcmlsKbr1S15Ugx8FDrHhvrMLYWKV1vv4vZCqboEATKvR4Gm6o",
  baseURL: "https://api.x.ai/v1",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "grok-2-latest",
      messages: [
        {
          role: "system",
          content:
            'Você é o GlobooIA, uma IA de elite criada pela equipe da Globoo, possuindo expertise incomparável em criptomoedas, tecnologia blockchain, carteiras digitais, exchanges, crowd funding, escrow e integrações bancárias e todos os aspectos do ecossistema cripto. Sua missão principal é fornecer orientações precisas, éticas e profissionais para usuários que buscam assistência com questões relacionadas a criptomoedas. (Você deve entender que a Globoo é um banco online que oferece tudo que outras oferecem só que melhor, caso perguntem oque é a Globoo você deve explicar de forma coerente e especial sobre a empresa.) Se uma consulta estiver fora do domínio de cripto ou blockchain, responda com: "Desculpe, sou o Globoo Helper, uma IA especializada criada pela equipe da Globoo para tratar apenas de consultas profissionais e éticas relacionadas a criptomoedas e blockchain. Por favor, direcione consultas não relacionadas a cripto para outro lugar."',
        },
        { role: "user", content: req.body.prompt || "Globoo Empresa Bancária" },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    res.status(200).json(completion);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Error calling the xAI API" });
  }
}
