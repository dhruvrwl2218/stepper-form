import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  personalDetails,Register,kyc,bankDetails, VehicleMap } from './userAsyncThunk';
import { UserState } from '../../../Schemas/UserSliceData';
import { number, z } from 'zod';


interface User {
    user: UserState | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  const initialState: User = {
    user: null,
    status: 'idle',
    error: null,
  };
// Create the slice directly handling async thunks without utility functions
const UserSlice = createSlice({
  name: 'User',
  initialState, 
  reducers: {
    previousStep(state){
      console.log("prestep clicked")
      if(state.user){
        state.user.step = (state.user.step as number) - 1;
        console.log('done')
      }
    },
  },
  extraReducers: (builder) => {
    builder
    //reg
      .addCase(Register.pending,(state:User)=>{
        state.status='loading';
      })
      .addCase(Register.fulfilled,(state: User, action: PayloadAction<UserState>) => {
        console.log("in slice after res:",action.payload)
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(Register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch OTP';
      })

      //vehicleMap 
      .addCase(VehicleMap.pending,(state:User)=>{
        state.status='loading';
      })
      .addCase(VehicleMap.fulfilled,(state: User, action: PayloadAction<UserState>) => {
        console.log("in slice after res:",action.payload)
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(VehicleMap.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch OTP';
      })
      
      //kyc
      .addCase(kyc.pending,(state:User)=>{
        state.status='loading';
      })
      .addCase(kyc.fulfilled,(state: User, action: PayloadAction<UserState>) => {
        console.log("in slice after res:",action.payload)
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(kyc.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch OTP';
      })
      //PersDetails
    .addCase(personalDetails.pending, (state: User) => {
        state.status = 'loading';
      })
      .addCase(personalDetails.fulfilled, (state: User, action: PayloadAction<UserState>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(personalDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch OTP';
      })
      //bankDetails
    .addCase(bankDetails.pending,(state:User)=>{
      state.status='loading';
    })
    .addCase(bankDetails.fulfilled,(state: User, action: PayloadAction<UserState>) => {
      console.log("in slice after res:",action.payload)
      state.status = 'succeeded';
      state.user = action.payload;
    })
    .addCase(bankDetails.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Failed to fetch OTP';
    });
  },
});
export const { previousStep } = UserSlice.actions;
export default UserSlice.reducer;
