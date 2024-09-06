"use client"

import React, { useState } from 'react'
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema,emailSchema } from './FormSchemas';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import { getOtp } from '@/apiReq/userApi';
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Button } from '../ui/button';
import { Register } from '@/redux/features/User/userAsyncThunk';

//tyeps 
type emailType = z.infer<typeof emailSchema>;
type OtpForm = z.infer<typeof otpSchema>;
 
const isOtpForm = (data: any): data is z.infer<typeof otpSchema> => {
  return otpSchema.safeParse(data).success;
};

const Otp = () => {
  const[otpSent,setOtpSent] = useState(false);
  const dispatch : AppDispatch = useDispatch();
  // const user = useSelector((state: RootState) => state.User.user);
  const form = useForm<emailType | OtpForm>({
    resolver: zodResolver(otpSent? otpSchema: emailSchema),
    defaultValues: {  
      email:"",
      otp:""
    }, 
  })

  const changeNum = () =>{
    setOtpSent(false)
  }
  
  const onSubmit : SubmitHandler<emailType| OtpForm> = async(values)=>{
      console.log(values)

      if(otpSent && isOtpForm(values) ){
        console.log("otp and mobileno")
        console.log(values)
        dispatch(Register(values as any))
        
      }else{
        console.log("only mobile no.")
        console.log(values)
        const res =  await getOtp(values as any)
        console.log(res)
        res.status === 200 && setOtpSent(true);

      }
  }

  return (
    <div className='w-1/2 p-8'>
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(onSubmit)} className='p-4 flex flex-wrap gap-8'>
        <FormField
        control={form.control}
        name = "email"
        render={({field})=>(
          <FormItem className='w-1/2'>
            <div className="flex items-center justify-between m-0">
            <FormLabel>Email</FormLabel>
            {otpSent && <Button variant={"ghost"} className='text-xs' size={"sm"}>change?</Button>}
            </div>
          <FormControl>
            <Input placeholder='Enter mobile no' {...field}/>
          </FormControl>
          <FormMessage/>
          </FormItem>
        )}
        />
        {otpSent && <FormField
         control={form.control}
         name = "otp"
         render={({field})=>(
          <FormItem className='w-1/2'>
            <div className="flex items-center justify-between mb-0">
                <FormLabel>OTP</FormLabel>
                {otpSent && <Button className='text-xs m-0' variant={"ghost"} size={"sm"}>Resend OTP</Button>}
              </div>
            <FormControl>
            <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
            </FormControl>
            <FormMessage/>
          </FormItem>
         )}/> }
         <Button type = "submit" variant={"indi"}>{otpSent ? "send otp" : "register"}</Button>
      </form>
    </Form>
    </div>  
    
  )
}

export default Otp

