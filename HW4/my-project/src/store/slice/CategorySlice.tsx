import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Category = {
    id: string,
    name: string,

}

export interface CategoryState {
    items: Category[]
}

const initialState: CategoryState = {
    items: [],
}

export const categorySlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            state.items.push(action.payload);
        },

        deleteCategory: (state, action: PayloadAction<String>) => {
            state.items = state.items.filter((p) => p.id !== action.payload);
        },

        updateCategory: (state, action: PayloadAction<Category>) => {
            const index = state.items.findIndex(p => p.id === action.payload.id);
            if (index !== -1) state.items[index] = action.payload;
        }
    }
})

export const { addCategory, deleteCategory, updateCategory } = categorySlice.actions;

export default categorySlice.reducer;