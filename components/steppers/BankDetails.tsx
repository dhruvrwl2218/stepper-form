"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { BankDetailsSchema } from "./FormSchemas";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
import { forwardRef } from "react";
import { bankDetails } from "@/redux/features/User/userAsyncThunk";

const BankDetails = forwardRef<HTMLFormElement>((props,ref) => {
  const dispatch : AppDispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.User.user);

  const form = useForm<z.infer<typeof BankDetailsSchema>>({
    resolver : zodResolver(BankDetailsSchema),
    defaultValues:{
      AccountHolderName:"",
      BankIFSC: "",
      BankAccountNumber:"",
      ConfirmBankAccNo:""
    }
  })

  const onSubmit: SubmitHandler<z.infer<typeof BankDetailsSchema>>= (values) =>{
    console.log(values)
    dispatch(bankDetails(values as any))
  }

  return (
    <div className='border-2 rounded-lg'>
      <div className='text-3xl font-bold text-center w-full text-white bg-indigo-400 p-2'>Bank Details</div>
      <Form {...form}>
          <form action="" ref={ref} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-wrap p-12 gap-6 '>
            <FormField
            control={form.control}
            name='AccountHolderName'
            render={({field})=>(
              <FormItem className='w-96'>
                <FormLabel>AccountHolderName</FormLabel>
                <FormControl>
                  <Input placeholder='Account holder name' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
           <FormField
           control={form.control}
           name='BankIFSC'
           render={({field})=>(
             <FormItem className='w-96'>
               <FormLabel>Bank IFSC No.</FormLabel>
               <FormControl>
                 <Input placeholder='BSBIN0001234' {...field}/>
               </FormControl>
               <FormMessage/>
             </FormItem>
           )}/>
           <FormField
           control={form.control}
           name='BankAccountNumber'
           render={({field})=>(
             <FormItem className='w-96'>
               <FormLabel>Bank Account No</FormLabel>
               <FormControl>
                 <Input placeholder='123456789012' {...field}/>
               </FormControl>
               <FormMessage/>
             </FormItem>
           )}/>
           <FormField
           control={form.control}
           name='ConfirmBankAccNo'
           render={({field})=>(
             <FormItem className='w-96'>
               <FormLabel>Confirm Bank Acc No</FormLabel>
               <FormControl>
                 <Input placeholder='123456789012' {...field}/>
               </FormControl>
               <FormMessage/>
             </FormItem>
           )}/>
             {/* <Button type="submit" variant="indi">Submit</Button> */}
            </form>
      </Form>
    </div>
  )
}
)
export default BankDetails






// const BankDetailsSchema = z.object({
//   AccountHolderName: z
//     .string()
//     .min(1, { message: "Account Holder Name is required" })
//     .max(100, { message: "Account Holder Name can't exceed 100 characters" }),

//   BankIFSC: z
//     .string()
//     .min(11, { message: "Bank IFSC must be 11 characters long" })
//     .max(11, { message: "Bank IFSC must be 11 characters long" })
//     .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid Bank IFSC format" }),

//   BankAccountNumber: z
//     .string()
//     .min(9, { message: "Bank Account Number must be at least 9 digits long" })
//     .max(18, { message: "Bank Account Number can't exceed 18 digits" })
//     .regex(/^\d+$/, { message: "Bank Account Number must contain only digits" }),

//   ConfirmBankAccNo: z
//     .string()
//     .min(9, { message: "Bank Account Number must be at least 9 digits long" })
//     .max(18, { message: "Bank Account Number can't exceed 18 digits" })
//     .regex(/^\d+$/, { message: "Bank Account Number must contain only digits" })
// })
// .refine((data) => data.BankAccountNumber === data.ConfirmBankAccNo, {
//   message: "Bank Account no doesn't match",
//   path: ["confirm"],
// });


// {data: {id: "71f47dde-fa01-4998-9a03-118af487f297", type: "0", companyName: null, mobile2: null,…}}
// data
// : 
// {id: "71f47dde-fa01-4998-9a03-118af487f297", type: "0", companyName: null, mobile2: null,…}
// BuyerVehicleCategoryMapping
// : 
// [{id: "3d097c2f-c28d-4668-955d-bef5ecc356f4", vehicleId: "7957c09b-d601-11ee-b6df-d85ed3db0017",…},…]
// 0
// : 
// {id: "3d097c2f-c28d-4668-955d-bef5ecc356f4", vehicleId: "7957c09b-d601-11ee-b6df-d85ed3db0017",…}
// 1
// : 
// {id: "592b5805-5aed-43f8-b9e6-2420858cf1ef", vehicleId: "7957c6ce-d601-11ee-b6df-d85ed3db0017",…}
// 2
// : 
// {id: "a6e385ce-b6a8-4b27-81ae-45648be09378", vehicleId: "58d4efdc-d601-11ee-b6df-d85ed3db0017",…}
// City
// : 
// {id: "a296a231-c35c-4006-bac9-03fb93c8b9e2", name: "Bengaluru"}
// id
// : 
// "a296a231-c35c-4006-bac9-03fb93c8b9e2"
// name
// : 
// "Bengaluru"
// State
// : 
// {id: "0d0c77e0-9cd1-4141-b6ad-fa51eacbfac8", name: "Karnataka"}
// id
// : 
// "0d0c77e0-9cd1-4141-b6ad-fa51eacbfac8"
// name
// : 
// "Karnataka"
// User
// : 
// {fullName: "Dhurv Rawal", id: "e4d87831-d7be-40de-982a-73c0fe46a660", firstName: "Dhurv",…}
// email
// : 
// null
// firstName
// : 
// "Dhurv"
// fullName
// : 
// "Dhurv Rawal"
// id
// : 
// "e4d87831-d7be-40de-982a-73c0fe46a660"
// lastName
// : 
// "Rawal"
// mobile
// : 
// "9588037258"
// address1
// : 
// "11D,Pindwara,Sirohi,Rajasthan"
// address2
// : 
// null
// addressProofBack
// : 
// null
// addressProofFront
// : 
// null
// amcStatus
// : 
// "0"
// bankAccountHolderIfsc
// : 
// null
// bankAccountHolderName
// : 
// null
// bankAccountHolderNumber
// : 
// null
// cityId
// : 
// "a296a231-c35c-4006-bac9-03fb93c8b9e2"
// companyName
// : 
// null
// createdAt
// : 
// "2024-07-26T05:56:21.000Z"
// createdBy
// : 
// null
// deletedAt
// : 
// null
// deletedBy
// : 
// null
// gstNumber
// : 
// null
// id
// : 
// "71f47dde-fa01-4998-9a03-118af487f297"
// mobile2
// : 
// null
// panCard
// : 
// null
// panName
// : 
// "DHRUV RAWAL"
// panNumber
// : 
// "DZIPR4411L"
// pinCode
// : 
// "307022"
// remarks
// : 
// null
// stateId
// : 
// "0d0c77e0-9cd1-4141-b6ad-fa51eacbfac8"
// status
// : 
// "0"
// step
// : 
// "3"
// type
// : 
// "0"
// updatedAt
// : 
// "2024-08-09T05:47:59.000Z"
// updatedBy
// : 
// null
// userId
// : 
// "e4d87831-d7be-40de-982a-73c0fe46a660"
// userName
// : 
// null