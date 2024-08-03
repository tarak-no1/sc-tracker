import React, { useState } from "react";
interface StockUpdateModelProps {
    onChange: (newSymbol: string) => void;
}

const StockUpdateModel: React.FC<StockUpdateModelProps> = ({ onChange }) => {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = () => {
        onChange(symbol);
    };
    return (
        <div>
            <form className="w-full max-w-sm">
                <div className="flex items-center border-b border-teal-500 py-2">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                        type="text" 
                        placeholder="Stock Symbol" 
                        aria-label="Stock Symbol"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}/>
                    <button 
                        className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
                        type="button"
                        onClick={handleSubmit}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default StockUpdateModel;