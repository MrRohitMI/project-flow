import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = {
  successMessage: string;
  errorMessage: string;
};
const initialState: UiState = {
  successMessage: "",
  errorMessage: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    setSuccessMessage: (state, action:PayloadAction<string>) => {
      state.successMessage = action.payload;
      state.errorMessage="";
    },
    setErrorMessage: (state, action:PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.successMessage = "";
    },
    clearMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
});

export const { setSuccessMessage, setErrorMessage, clearMessages } =
  uiSlice.actions;

export default uiSlice.reducer;
