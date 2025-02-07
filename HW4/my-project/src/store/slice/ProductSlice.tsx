import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Product = {
    id: string,
    name: string,
    description: string,
    category: string,
    quantity: number,
    price: number
}

export interface ProductState {
    items: Product[]
}

const initialState: ProductState = {
    items: [],
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.items.push(action.payload);
        },

        deleteProduct: (state, action: PayloadAction<String>) => {
            state.items = state.items.filter((p) => p.id !== action.payload);
        },

        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.items[index] = action.payload;
        }
    }
})

export const { addProduct, deleteProduct, updateProduct } = productSlice.actions;

export default productSlice.reducer;