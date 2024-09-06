
import React, { forwardRef, useState } from 'react'
import { SubmitHandler,Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { KycSchema } from './FormSchemas';
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
import { kyc } from '@/redux/features/User/userAsyncThunk';

const Kyc = forwardRef<HTMLFormElement>((props,ref) => {
  const dispatch : AppDispatch = useDispatch();
  const form = useForm<z.infer<typeof KycSchema>>({
    resolver: zodResolver(KycSchema),
    defaultValues :{
      panNo:"",
      panName:"",
      panCard: undefined, 
      addressProofFront: undefined,
      addressProofBack: undefined,
    }
  })

  const onSubmit: SubmitHandler<z.infer<typeof KycSchema>>= (values) =>{
    console.log(values)
    const formData = new FormData();
    Object.entries(values).map(([key,value])=>{
      if(value instanceof File){
        formData.append(key,value);
      }else if(value !== undefined && value !== null){
        formData.append(key,value.toString());
      }
    })
    console.log(formData)
    dispatch(kyc(formData as any))
  }
  return (
    <div className='border-2 rounded-lg'>
      <div className='text-3xl font-bold text-center w-full text-white bg-indigo-400 p-2'>KYC</div>
      <Form {...form}>
          <form ref={ref} encType="multipart/form-data"  onSubmit={form.handleSubmit(onSubmit)} className='flex flex-wrap p-12 gap-6 '>
            <FormField
            control={form.control}
            name='panNo'
            render={({field})=>(
              <FormItem className='w-96'>
                <FormLabel>Pan No</FormLabel>
                <FormControl>
                  <Input placeholder='xXXXXXXXXX' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
            control={form.control}
            name='panName'
            render={({field})=>(
              <FormItem className='w-96'>
                <FormLabel>Pan Name</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <Controller
            control={form.control}
            name="panCard"
            render={({ field }) => (
              <FormItem className="w-72 ">
                <FormLabel>Upload Pan Card</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className='border-2 rounded-md ' />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
             <Controller
            control={form.control}
            name="addressProofFront"
            render={({ field }) => (
              <FormItem className="w-72 ">
                <FormLabel>Address Proof (Front)</FormLabel>
                <FormControl>
                  <input
                    className='border-2 rounded-md '
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Controller
            control={form.control}
            name="addressProofBack"
            render={({ field }) => (
              <FormItem className="w-72 ">
                <FormLabel>Address Proof(Back)</FormLabel>
                <FormControl>
                  <input
                    className='border-2 rounded-md '
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          {/* <Button type="submit" variant="indi">Submit</Button> */}
          </form>
      </Form>
    </div>
  )
})

export default Kyc

// const KycSchema = z.object({
//   panNo : z.string()
//   .length(10, { message: "PAN number must be exactly 10 characters long" })
//   .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "PAN number must follow the pattern AAAAA9999A" }),
//   panName : z.string()
//   .min(1, { message: "PAN name is required" })
//   .max(100, { message: "PAN name must be at most 100 characters long" })
//   .regex(/^[A-Za-z\s]+$/, { message: "PAN name must only contain letters and spaces" }),
//   panCard: z
//   .instanceof(File)
//   .refine((file) => file.size <= 5 * 1024 * 1024, "File size should be less than 5MB")
//   .refine(
//     (file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
//     "Only JPEG, PNG, or PDF files are allowed"
//   ),
// addressProofFront: z
//   .instanceof(File)
//   .refine((file) => file.size <= 5 * 1024 * 1024, "File size should be less than 5MB")
//   .refine(
//     (file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
//     "Only JPEG, PNG, or PDF files are allowed"
//   ),
// addressProofBack: z
//   .instanceof(File)
//   .refine((file) => file.size <= 5 * 1024 * 1024, "File size should be less than 5MB")
//   .refine(
//     (file) => ["image/jpeg", "image/png", "application/pdf"].includes(file.type),
//     "Only JPEG, PNG, or PDF files are allowed"
//   )
// })