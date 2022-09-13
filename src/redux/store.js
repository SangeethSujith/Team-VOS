import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'

export const store = configureStore({
    reducer: {
        userAuth: authSlice,
    },
    // middleware: getDefaultMiddleware =>
    //     getDefaultMiddleware({
    //         serializableCheck: false,
    //     }),
    // middleware: [...getDefaultMiddleware({ immutableCheck: false })]
})