import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogInModalOpen: false,
  isRegisterModalOpen: false,
  isTrialModalOpen: false,
  trialTeacher: null,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openLogInModal: (state) => {
      state.isLogInModalOpen = true;
    },
    closeLogInModal: (state) => {
      state.isLogInModalOpen = false;
    },
    openRegisterModal: (state) => {
      state.isRegisterModalOpen = true;
    },
    closeRegisterModal: (state) => {
      state.isRegisterModalOpen = false;
    },

    openTrialModal: (state, action) => {
      state.isTrialModalOpen = true;
      state.trialTeacher = action.payload; // объект teacher
    },
    closeTrialModal: (state) => {
      state.isTrialModalOpen = false;
      state.trialTeacher = null;
    },
  },
});

export const {
  openLogInModal,
  closeLogInModal,
  openRegisterModal,
  closeRegisterModal,
  openTrialModal,
  closeTrialModal,
} = modalsSlice.actions;

export const modalsReducer = modalsSlice.reducer;
