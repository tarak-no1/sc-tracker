import PriceTable from "@/components/PriceTable";
import StockUpdateModel from "@/components/StockUpdateModel";
import React, { useState } from "react"

const stocks = ['GOOG', 'BTC-USD', 'ETH-USD', 'AAPL', 'TSLA'];

const Home: React.FC = () => {
    const [symbol, setSymbol] = useState('GOOG');
    
    return (
        <div className="container mx-auto">
            <div>
                <p className="text-gray-500 dark:text-gray-400"> 
                    Available Stocks to Search: 
                    {
                        stocks.map((stock, idx) => {
                            return (
                                <>
                                    <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
                                        key={idx}>
                                        {stock}
                                    </kbd> &nbsp;
                                </>
                            );
                        })
                    }
                </p>
            </div>
            <StockUpdateModel onChange={(newSymbol) => setSymbol(newSymbol)}/>
            <PriceTable symbol={symbol} />
        </div>
    );
}

export default Home;