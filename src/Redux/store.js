import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './Login/login.reducer'
import accountReducer from './Accounts/acccounts.reducer'
import paymentReducer from './Payment/payment.reducer'
import { combineReducers } from 'redux'
const rootReducer = combineReducers({
  login: loginReducer,
  account: accountReducer,
  payment:paymentReducer
});
const store = configureStore({
  reducer: rootReducer,
})

export default store
