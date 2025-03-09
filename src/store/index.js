import { configureStore } from '@reduxjs/toolkit'
import researchReducer from './researchSlice'
import authReducer from './authSlice'

const store = configureStore({
  reducer: {
    research: researchReducer,
    auth: authReducer,
  },
})

export default store