import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Price {
    id: string;
    price: number;
    timestamp: string;
}

interface PriceState {
    prices: Price[];
}

const initialState: PriceState = {
    prices: [],
};

const priceSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        setPrices(state, action: PayloadAction<Price[]>) {
            state.prices = action.payload;
        },
    },
});

export const { setPrices } = priceSlice.actions;
export default priceSlice.reducer;