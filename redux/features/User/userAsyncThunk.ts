import { api } from '@/apiReq/axiosApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import {PersonalDetailsSchema,BankDetailsSchema,KycSchema,otpSchema} from "@/Schemas/FormSchemas";
import { PersonalDetailsSchema,otpSchema,BankDetailsSchema,KycSchema} from '@/components/steppers/FormSchemas';
import { UserState } from "@/Schemas/UserSliceData";
import { AxiosResponse,isAxiosError} from "axios";
import {z} from 'zod';

type registerType = z.infer<typeof otpSchema>
export const Register = createAsyncThunk<UserState, {registerData : registerType}, { rejectValue: string }>(
  'User/Register',
  async (registerData, thunkAPI) => {
      try {
          const response: AxiosResponse<UserState> = await api.post('Register/confirmation', { registerData });
          console.log(response);
          return response.data; // Return the data property directly
      } catch (err) {
          let errorMessage = 'An unknown error occurred';
          if (isAxiosError(err)) {
            // Axios-specific error
            if (err.response && err.response.data) {
              errorMessage = err.response.data.message || 'An error occurred while fetching OTP';
            } else {
              errorMessage = err.message;
            }
          } else if (err instanceof Error) {
            // Native JS error
            errorMessage = err.message;
          }
          return thunkAPI.rejectWithValue(errorMessage);
        }
  }
);
//kyc Api call
type kycType = z.infer<typeof KycSchema>
export const kyc = createAsyncThunk<UserState, {KycData : FormData}, { rejectValue: string }>(
  'User/kyc',
  async (kycData, thunkAPI) => {
    console.log("inside thunk",kycData)
      try {
          const response: AxiosResponse<UserState> = await api.post('Register/kyc', { kycData });
          console.log(response);
          return response.data; // Return the data property directly
      } catch (err) {
          let errorMessage = 'An unknown error occurred';
          if (isAxiosError(err)) {
            // Axios-specific error
            if (err.response && err.response.data) {
              errorMessage = err.response.data.message || 'An error occurred while fetching OTP';
            } else {
              errorMessage = err.message;
            }
          } else if (err instanceof Error) {
            // Native JS error
            errorMessage = err.message;
          }
          return thunkAPI.rejectWithValue(errorMessage);
        }
  }
);


//Personal Details request
const baseSchema = PersonalDetailsSchema._def.schema; // Extract the base schema
const Updatedschema = baseSchema.partial({ ConfirmPassword : true });
type personalDetailsType = z.infer<typeof Updatedschema>

export const personalDetails = createAsyncThunk<UserState, {PersonalData: personalDetailsType}, { rejectValue: string }>(
    'User/personalDetails',
    async (PersonalData, thunkAPI) => {
        try {
            const response: AxiosResponse<UserState> = await api.post('Register/personalDetails', { PersonalData });
            console.log(response);
            return response.data; // Return the data property directly
        } catch (err) {
            let errorMessage = 'An unknown error occurred';
            if (isAxiosError(err)) {
              // Axios-specific error
              if (err.response && err.response.data) {
                errorMessage = err.response.data.message || 'An error occurred while fetching OTP';
              } else {
                errorMessage = err.message;
              }
            } else if (err instanceof Error) {
              // Native JS error
              errorMessage = err.message;
            }
            return thunkAPI.rejectWithValue(errorMessage);
          }
    }
);


// bankDetails Api call
type bankDetailsType = z.infer<typeof BankDetailsSchema>
export const bankDetails = createAsyncThunk<UserState, {BankData : bankDetailsType}, { rejectValue: string }>(
  'User/bankDetails',
  async (BankData, thunkAPI) => {
      try {
          const response: AxiosResponse<UserState> = await api.post('Register/bankDetails', { BankData });
          console.log(response);
          return response.data; // Return the data property directly
      } catch (err) {
          let errorMessage = 'An unknown error occurred';
          if (isAxiosError(err)) {
            // Axios-specific error
            if (err.response && err.response.data) {
              errorMessage = err.response.data.message || 'An error occurred while fetching OTP';
            } else {
              errorMessage = err.message;
            }
          } else if (err instanceof Error) {
            // Native JS error
            errorMessage = err.message;
          }
          return thunkAPI.rejectWithValue(errorMessage);
        }
  }
);



//
// export const getOtp = createAsyncThunk<UserState, string, { rejectValue: string }>(
//     'User/getOtp',
//     async (mobile, thunkAPI) => {
//         try {
//             const response: AxiosResponse<UserState> = await api.post('Register/otp', { mobile });
//             console.log(response);
//             return response.data; // Return the data property directly
//         } catch (err) {
//             let errorMessage = 'An unknown error occurred';
//             if (isAxiosError(err)) {
//               // Axios-specific error
//               if (err.response && err.response.data) {
//                 errorMessage = err.response.data.message || 'An error occurred while fetching OTP';
//               } else {
//                 errorMessage = err.message;
//               }
//             } else if (err instanceof Error) {
//               // Native JS error
//               errorMessage = err.message;
//             }
//             return thunkAPI.rejectWithValue(errorMessage);
//           }
//     }
// );
// export const Login = createAsyncThunk(
//     'User/Login',
//     async(data,thunkAPI)=>{
//         try {
//             const response = await api.post('Register/mobileRegister',data)
//             console.log(response)
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )
// export const VechicleMap = createAsyncThunk(
//     'User/VechicleMap',
//     async(data,thunkAPI)=>{
//         try {
//             const response = await api.post('Register/VechileMap',data)
//             console.log(response)
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )
// export const KYC = createAsyncThunk(
//     'User/KYC',
//     async(data,thunkAPI)=>{
//         try {
//             const response = await api.post('Register/KYC',data)
//             console.log(response)
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )
// export const personalDetails = createAsyncThunk(
//     'User/personalDetails',
//     async(data,thunkAPI)=>{
//         try {
//             const response = await api.post('Register/personalDetails',data)
//             console.log(response)
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )
// export const bankDetails = createAsyncThunk(
//     'User/bankDetails',
//     async(data,thunkAPI)=>{
//         try {
//             const response = await api.post('Register/bankDetails',data)
//             console.log(response)
//             return response;
//         } catch (error) {
//             console.log(error);
//         }
//     }
// )