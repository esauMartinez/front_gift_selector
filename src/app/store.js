import { configureStore } from '@reduxjs/toolkit'
import giftReducer from '../features/gift/giftSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        gift: giftReducer,
    }
})
