import { createSlice } from '@reduxjs/toolkit'
import { clickLogin, getuserData, logoutApi } from './login.actions'

const INITIAL_STATE = {
  Status: false,
  login: false,
  loginResponse: {},
  patientTicker: {},
  userdata: null,
  logout: null,
}
const LoginSlice = createSlice({
  name: 'login',
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(clickLogin.fulfilled, (state, action) => {
      state.loginResponse = action.payload
      state.login = true
    })
    builder.addCase(getuserData.fulfilled, (state, action) => {
      state.userdata = action.payload
    })

    builder.addCase(logoutApi.fulfilled, (state, action) => {
      state.logout = action.payload
    })
  },
  reducers: {
    LoginResponse(state, action) {
      state.loginResponse = action.payload
    },
    apiStatus(state, action) {
      state.Status = action.payload
    },
  },
})
export const { LoginResponse, apiStatus } = LoginSlice.actions
const { reducer } = LoginSlice
export default reducer
