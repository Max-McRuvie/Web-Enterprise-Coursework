import { configureStore } from '@reduxjs/toolkit'
import authReducer from './user/userReducer'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})