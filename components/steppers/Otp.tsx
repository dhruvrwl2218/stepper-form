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
  const form = useForm<emailType | OtpForm>({
    resolver: zodResolver(otpSent? otpSchema: emailSchema),
    defaultValues: {  
      email:"",
      otp:""
    }, 
  })

  const changeEmail = () =>{
    setOtpSent(false);
    form.setValue("email",'')
  }
  
  const resendOtp = async() =>{
   const email = form.getValues("email");
   const res = await getOtp(email as any) 
  }
  const onSubmit : SubmitHandler<emailType| OtpForm> = async(values)=>{
      if(otpSent && isOtpForm(values) ){
        dispatch(Register(values as any)) 
      }else{
        const res =  await getOtp(values as any)
        res.status === 200 && setOtpSent(true);
      }
  }

  return (
    <div className='w-3/4'>
    <Form {...form}>
      <form action="" onSubmit={form.handleSubmit(onSubmit)} className='p-4 flex flex-wrap gap-8 text-slate-800'>
        <FormField
        control={form.control}
        name = "email"
        render={({field})=>(
          <FormItem className='w-48'>
            <div className="flex items-center justify-between m-0">
            <FormLabel>Email</FormLabel>
            {otpSent && <Button variant={"ghost"} className='text-xs' size={"sm"} onClick={changeEmail}>change?</Button>}
            </div>
          <FormControl>
            <Input placeholder='xyz@gmail.com' {...field}/>
          </FormControl>
          <FormMessage/>
          </FormItem>
        )}
        />
        {otpSent && <FormField
         control={form.control}
         name = "otp"
         render={({field})=>(
          <FormItem className='w-64'>
            <div className="flex items-center justify-between mb-0">
                <FormLabel>OTP</FormLabel>
                {otpSent && <Button className='text-xs m-0 text-black' variant={"ghost"} size={"sm"} onClick={resendOtp}>Resend OTP</Button>}
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
         <div className='w-full'>
         <Button  type = "submit" variant={"indi"}>{otpSent ? "send otp" : "register"}</Button>
         </div>
      </form>
    </Form>
    </div>   
  )
}

export default Otp

