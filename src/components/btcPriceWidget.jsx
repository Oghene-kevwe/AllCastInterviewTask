import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { PriceInput } from "./priceInput";

export const BtcPriceWidget = () => {
  const [btcPrice, setBtcPrice] = useState(null);
  const [usdAmount, setUsdAmount] = useState("");
  const [btcEquivalent, setBtcEquivalent] = useState("--");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [apiError, setApiError] = useState(false);

  async function fetchBitcoinPrice() {
    const url =
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

    try {
      const response = await axios(url);
      if (response.status === 200) {
        const price = response.data.bitcoin.usd;
        const timestamp = new Date().toLocaleString();
        setBtcPrice(price);
        setLastUpdated(timestamp);
      }
    } catch (error) {
      setApiError(true);
      console.error("Error fetching Bitcoin price:", error);
    }
  }

  const debouncedUsdAmount = useDebounce(usdAmount, 500);

  // fetch BTC price on initial app load
  useEffect(() => {
    fetchBitcoinPrice();
    // Fetch new price every 60 seconds
    const interval = setInterval(() => {
      fetchBitcoinPrice();
    }, 600000);

    return () => clearInterval(interval);
  }, [debouncedUsdAmount]);

  // Format number with commas
  function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
  }

  return (
    <div className="max-w-[450px]  mx-auto p-4 bg-white shadow-lg rounded-lg text-center">
      <h1 className="text-xl font-bold mb-4 text-purple500">
        BTC Price Widget
      </h1>

      {/* current price container */}
      {apiError ? (
        <p className="mb-8 text-red-500">
          An error occured please try again later
        </p>
      ) : (
        <div className="mb-8">
          <p>
            Current BTC Price:{" "}
            <span>{btcPrice ? `$${formatNumber(btcPrice)}` : "--"}</span>
          </p>
          {/* last updated */}
          <p className="text-sm text-gray-500">
            Last Updated: {lastUpdated ? lastUpdated : "--"}
          </p>
        </div>
      )}

      {/* input container */}
      <PriceInput
        {...{
          setUsdAmount,
          usdAmount,
          btcPrice,
          btcEquivalent,
          setBtcEquivalent,
        }}
      />
      {/* converted price */}
      <div className="mb-4 font-semibold">
        <p className="text-xl">Converted BTC: {btcEquivalent} BTC</p>
      </div>
    </div>
  );
};
