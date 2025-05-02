import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function StoreLocation() {
  return (
    <address className="text-xs not-italic text-stone-500 whitespace-nowrap">
      Store Location: Jorpati,kathmandu,Nepal
    </address>
  );
}

export function LanguageCurrency() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [language, setLanguage] = useState("Eng");
  const [currency, setCurrency] = useState("USD");

  const languages = ["Eng", "Esp", "Fr"];
  const currencies = ["USD", "EUR", "GBP"];

  return (
    <div className="flex items-center gap-4 relative text-xs text-stone-500">
      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setLanguageOpen(!languageOpen);
            setCurrencyOpen(false);
          }}
          className="flex items-center gap-1.5 whitespace-nowrap"
        >
          {language}
          <ChevronDown size={14} />
        </button>
        {languageOpen && (
          <ul className="absolute top-full mt-1 bg-white shadow-md border rounded text-xs z-10">
            {languages.map((lang) => (
              <li
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setLanguageOpen(false);
                }}
                className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
              >
                {lang}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Currency Dropdown */}
      <div className="relative">
        <button
          onClick={() => {
            setCurrencyOpen(!currencyOpen);
            setLanguageOpen(false);
          }}
          className="flex items-center gap-1.5 whitespace-nowrap"
        >
          {currency}
          <ChevronDown size={14} />
        </button>
        {currencyOpen && (
          <ul className="absolute top-full mt-1 bg-white shadow-md border rounded text-xs z-10">
            {currencies.map((curr) => (
              <li
                key={curr}
                onClick={() => {
                  setCurrency(curr);
                  setCurrencyOpen(false);
                }}
                className="px-4 py-1 hover:bg-gray-100 cursor-pointer"
              >
                {curr}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}



const Topbar = () => {
  return (
    <header className=" px-[10%] flex justify-between items-center w-full py-3 text-xs bg-white shadow-sm text-stone-500 max-md:px-4 border-b-2">
      <StoreLocation />
      <div className="flex items-center gap-5">
        <LanguageCurrency />

      </div>
    </header>
  );
};

export default Topbar;
