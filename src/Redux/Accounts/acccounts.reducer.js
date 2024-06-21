import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addFiles,
  addNote,
  addPatient,
  changeStatus,
  deleteFiles,
  deleteNote,
  deletePatient,
  fetchByName,
  fetchPatient,
  getAllCharges,
  getAllNotes,
  getFiles,
  updatePatient,
} from "./accounts.actions";
const INITIAL_STATE = {
  patientList: {},
  patientDetail: {},
  deletePatRes: {},
  PatientSaveRes: {},
  statusRes: {},
  patientUpdateRes:{},
  chargeList:{},
  noteList:{},
  deleteNoteRes:{},
  addNoteRes:{},
  filesDataRes:{},
  deleteFileRes:{},
  addFilesRes:{}
};
const accountSlice = createSlice({
  name: "account",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    builder.addCase(fetchPatient.fulfilled, (state, action) => {
      state.patientList = action.payload;
    });
    builder.addCase(fetchByName.fulfilled, (state, action) => {
      state.patientDetail = action.payload;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.deletePatRes = action.payload;
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.PatientSaveRes = action.payload;
    });
    builder.addCase(changeStatus.fulfilled, (state, action) => {
      state.statusRes = action.payload;
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.patientUpdateRes = action.payload;
    });
    builder.addCase(getAllCharges.fulfilled, (state, action) => {
      state.chargeList = action.payload;
    });
    builder.addCase(getAllNotes.fulfilled, (state, action) => {
      state.noteList = action.payload;
    });
    builder.addCase(addNote.fulfilled, (state, action) => {
      state.addNoteRes = action.payload;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.deleteNoteRes = action.payload;
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.filesDataRes= action.payload;
    });
    builder.addCase(deleteFiles.fulfilled, (state, action) => {
      state.deleteFileRes = action.payload;
    });
    builder.addCase(addFiles.fulfilled, (state, action) => {
      state.addFilesRes= action.payload;
    });
  
  },
});

const selectPatients = (state) => state.account.patientList?.data?.results;
export const selectPatientById = (id) =>
  createSelector([selectPatients], (patients) =>
    patients.find((patient) => patient.id === id)
  );
const { reducer } = accountSlice;
export default reducer;
