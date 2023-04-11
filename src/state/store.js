import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authReducer.js'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})