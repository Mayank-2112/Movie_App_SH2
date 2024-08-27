import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
  currentUser : null,
  error: null,
  loading: false,
}

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading= true
    },
    signInSuccess: (state,action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading= true
    },
    updateUserSuccess: (state,action)=>{
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading= true
    },
    deleteUserSuccess: (state,action)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading= true
    },
    signOutSuccess: (state,action)=>{
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFailure: (state,action)=>{
      state.error = action.payload;
      state.loading = false;
    },
  },
})

// Action creators are generated for each case reducer function
export const { signInStart,signInSuccess,signInFailure, updateUserStart,updateUserFailure,updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutFailure,signOutStart,signOutSuccess} = userSlice.actions;

export default userSlice.reducer;