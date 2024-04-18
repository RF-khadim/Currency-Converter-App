import React, { useEffect, useState } from "react";
import DropDown from "./assets/Components/DropDown";

function App() {
  const [amount, setAmount] = useState(1);
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const currencyConvert = async () => {
    try {
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
      const data = await res.json();
      const converted = data.rates[toCurrency];
      setConvertedAmount(converted.toFixed(2));
    } catch (error) {
      console.log("Error converting", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r to-gray-800 from-slate-700 flex items-center justify-center">
      <div className="w-[420px] h-[520px] md:w-[550px] md:h-[620px] bg-gray-300 rounded-md shadow-lg shadow-slate-500 flex items-center flex-col py-5 px-3 gap-3">
        <h1 className="md:text-3xl text-xl font-bold ">Currency Converter</h1>
        <div className="flex items-center flex-col justify-center mt-5">
          <div>
            <DropDown currencies={currencies} currency={fromCurrency} setCurrency={setFromCurrency} title="from:" />
          </div>
          <div>
            <DropDown currencies={currencies} currency={toCurrency} setCurrency={setToCurrency} title="to:" />
          </div>
        </div>
        <div>
          <label htmlFor="Amount" className="flex flex-col py-1 text-xl gap-2">Amount:
            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Enter the amount here" className="py-2 md:py-3 border-none w-72 md:w-96 px-3 rounded-sm focus:bg-slate-500 outline-none text-black" />
          </label>
          <button onClick={currencyConvert} className="w-full py-3 bg-slate-500 mt-7 font-bold hover:bg-slate-600 transition-all duration-200">Convert</button>

        </div>

        {convertedAmount && (
          <p className="mt-4 text-lg font-semibold border-b-2 border-gray-800 text-green-600">Converted Amount: {convertedAmount} {toCurrency}</p>
        )}




      </div>
    </div>
  )
}

export default App;
