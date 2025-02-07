import { configureStore } from "@reduxjs/toolkit";
import productReduser from "./slice/ProductSlice.tsx"
import categoryReduser from "./slice/CategorySlice.tsx"

export const store = configureStore({
    reducer: {
        product: productReduser,
        category: categoryReduser
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;