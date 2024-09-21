import { api } from "./axiosApi";
import { emailSchema } from "../components/steppers/FormSchemas";
import { z } from "zod";
type emailType = z.infer<typeof emailSchema>

export const getOtp = async(email : emailType)=>{
    console.log('inside apicallL',email)
    try { 
        const response = await api.post('/Register/otp',email);
        console.log(response)
        return response
    } catch (error) {
        console.log("error in otp req:",error)
        throw error
    }
}

// export const getVechileList = async()=>{
//     try {
//         const response = await api.get('/Register/vehicleList');
//         console.log(response)
//     } catch (error) {
//         console.log(error)
//     }
// }