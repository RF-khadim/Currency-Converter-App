import React from "react";

const DropDown = ({ currencies, currency, setCurrency,title = "" }) => {
    return (
        <div>
            <label htmlFor={title} className="flex flex-col py-1 text-xl gap-2">{title}</label>
            <div>
                <select 
                    name="currencies" 
                    value={currency} 
                    onChange={(e) => setCurrency(e.target.value)} 
                    className="py-2 md:py-3 border-none w-72 md:w-96 px-3 rounded-sm focus:bg-slate-500 outline-none text-black"
                >
                    {currencies.map((currency) => (
                        <option value={currency} key={currency}>{currency}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DropDown;
