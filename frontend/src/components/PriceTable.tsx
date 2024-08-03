import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setPrices } from '../store/priceSlice';
import { RootState } from '../store';


interface Price {
    id: string;
    price: number;
    timestamp: string;
}

const PriceTable: React.FC<{ symbol: string }> = ({ symbol }) => {
    const prices = useSelector((state: RootState) => state.prices.prices);
    const dispatch = useDispatch();

    const fetchPrices = async () => {
        try {
            const resp = await axios.get(`http://localhost:8080/api/prices/${symbol}`);
            dispatch(setPrices(resp.data));
        } catch(err) {
            console.error('Error fetching prices:', err);
        }
    }
    useEffect(() => {
        fetchPrices();
        const interval = setInterval(fetchPrices, 5000);
        return () => clearInterval(interval);
    }, [ symbol ]);

    return (
        <div>
            <table className="text-auto text-gray-500 dark:text-gray-400">
            <caption className="caption-top">
                Pricing List for {symbol}
            </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-s-lg">#</th>
                        <th scope="col" className="px-6 py-3">Timestamp</th>
                        <th scope="col" className="px-6 py-3 rounded-e-lg">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.slice(0,20).map((price: Price, idx: number) => (
                        <tr key={price.id}>
                            <td scope="row" className="px-6 py-4">{idx+1}</td>
                            <td scope="row" className="px-6 py-4">
                                {new Date(price.timestamp).toLocaleString()}
                            </td>
                            <td className="px-6 py-4">{price.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PriceTable;