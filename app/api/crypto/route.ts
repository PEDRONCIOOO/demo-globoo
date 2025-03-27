import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.COINMARKET_API;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20",
      {
        headers: {
          "X-CMC_PRO_API_KEY": apiKey,
          "Accept": "application/json",
        },
        cache: "no-store" // Don't cache the response
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `CoinMarketCap API responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return NextResponse.json(
      { error: "Failed to fetch cryptocurrency data" },
      { status: 500 }
    );
  }
}