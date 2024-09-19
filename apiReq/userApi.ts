import { api } from "./axiosApi";
import { emailSchema } from "../components/steppers/FormSchemas";
import { z } from "zod";
type mobileType = z.infer<typeof emailSchema>

export const getOtp = async(email:mobileType)=>{
    try {
        const response = await api.post('/Register/otp',email);
        // console.log(response)
        return response.data
    } catch (error) {
        console.log("error in otp req:",error)
    }
}

export const getVechileList = async()=>{
    try {
        const response = await api.get('/Register/vehicleList');
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}