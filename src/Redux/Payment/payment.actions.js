import { createAsyncThunk } from "@reduxjs/toolkit"
import paymentService from "./payment.service"

export const getPayment = createAsyncThunk(
    'accounts/getPayment ',
    async (data) => {
      try {
        const res = await paymentService.fetchPayment(data)
        return res.data
      } catch (error) {
        console.log(error)
      }
    },
  )
  export const getledger = createAsyncThunk(
    'accounts/getLedger ',
    async (data) => {
      try {
        const res = await paymentService.getLedger(data)
        return res.data
      } catch (error) {
        console.log(error)
      }
    },
  )