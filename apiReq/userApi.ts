import { api } from "./axiosApi";
import { mobileSchema } from "@/Schemas/FormSchemas";
import { z } from "zod";
type mobileType = z.infer<typeof mobileSchema>

export const getOtp = async(mobile:mobileType)=>{
    try {
        const response = await api.post('/Register/otp',mobile);
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