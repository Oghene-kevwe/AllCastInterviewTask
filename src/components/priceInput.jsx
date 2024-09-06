import React, { useState } from "react";
import { toast } from "react-toastify";

export const PriceInput = ({
  usdAmount,
  setUsdAmount,
  btcPrice,
  setBtcEquivalent,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  // Calculate BTC equivalent when USD amount changes
  function handleUsdChange(e) {
    const usdValue = e.target.value;
    const usd = parseFloat(usdValue);

    // sets function to do nothing when user inputs non-numeric values
    if (usdValue === "" || isNaN(usdValue)) {
      setUsdAmount("");
      setBtcEquivalent("--");
      setError(true);
      setErrorMessage("Please enter a valid number e.g 10");
      return;
    } else {
      setError(false);
    }

    //Check if the amount exceeds the maximum limit
    if (usd > 100000000) {
      setError(true);
      setErrorMessage("Amount cannot exceed $100,000,000.");
      return;
    } else {
      setError(false);
    }

    if (btcPrice) {
      setBtcEquivalent((usd / btcPrice).toFixed(8));
    }

    setUsdAmount(usdValue);
  }

  return (
    <div className="mb-4">
      <label
        htmlFor="usdAmount"
        className="block text-sm font-medium text-purple500"
      >
        Enter USD amount:
      </label>
      <input
        id="usdAmount"
        value={usdAmount}
        onChange={handleUsdChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple500 focus:border-purple500 sm:text-sm"
        placeholder="Enter amount in USD"
      />
      {error && (
        <p className=" text-red-500 text-xs text-left">{errorMessage}</p>
      )}
    </div>
  );
};
