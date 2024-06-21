import { createAsyncThunk } from '@reduxjs/toolkit'
import AccountServices from './accounts.services'

export const fetchPatient = createAsyncThunk(
  'accounts/fetchPatient ',
  async (data) => {
    try {
      const res = await AccountServices.fetchPatient(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const fetchByName = createAsyncThunk(
  'accounts/fetchByName ',
  async (data) => {
    try {
      const res = await AccountServices.fetchByName(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const deletePatient = createAsyncThunk(
  'accounts/deletePatient ',
  async (credential) => {
    try {
      const res = await AccountServices.deletePatient(credential)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const addPatient = createAsyncThunk(
  'accounts/addPatient ',
  async (data) => {
    try {
      const res = await AccountServices.addPatient(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const changeStatus = createAsyncThunk(
  'accounts/changeStatus ',
  async (data) => {
    try {
      console.log("hai")
      const res = await AccountServices.changeStatus(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const updatePatient = createAsyncThunk(
  'accounts/updatePatient ',
  async (data) => {
    try {
      console.log(data,"update")
      const res = await AccountServices.updatePatient(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const getAllCharges = createAsyncThunk(
  'accounts/getAllCharges ',
  async (data) => {
    try {
      const res = await AccountServices.getAllCharges(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const getAllNotes = createAsyncThunk(
  'accounts/getAllNotes ',
  async (data) => {
    try {
      const res = await AccountServices.getAllNotes(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const addNote = createAsyncThunk(
  'accounts/addNote ',
  async (data) => {
    try {
      const res = await AccountServices.addNotes(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const deleteNote = createAsyncThunk(
  'accounts/deleteNote ',
  async (data) => {
    try {
      const res = await AccountServices.deleteNotes(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const addFiles = createAsyncThunk(
  'accounts/addFiles ',
  async (data) => {
    try {
      const res = await AccountServices.addFiles(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const getFiles = createAsyncThunk(
  'accounts/getFiles ',
  async (data) => {
    try {
      console.log("haiiiii")
      const res = await AccountServices.getFiles(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)
export const deleteFiles = createAsyncThunk(
  'accounts/deleteFiles ',
  async (data) => {
    try {
      const res = await AccountServices.deleteFiles(data)
      return res.data
    } catch (error) {
      console.log(error)
    }
  },
)