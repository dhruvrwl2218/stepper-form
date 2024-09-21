
import React, { forwardRef, useEffect, useState } from 'react'
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
import { kyc } from '@/redux/features/User/userAsyncThunk';
import LoadingDots from '../loader/LoadingDots';

const Kyc = forwardRef<HTMLFormElement>((props,ref) => {
  const dispatch : AppDispatch = useDispatch();
  const {status,error,user} = useSelector((state: RootState) => state.User);
    
  const form = useForm<z.infer<typeof KycSchema>>({
    resolver: zodResolver(KycSchema),
    defaultValues :{
      panNumber: user?.panNumber || '',
      panName:user?.panName || '',
      panCard: undefined, 
      addressProofFront: undefined,
      addressProofBack: undefined,
    }
  })

  const onSubmit: SubmitHandler<z.infer<typeof KycSchema>>= async(values) =>{
    const formData = new FormData();
    Object.entries(values).map(([key,value])=>{
      if(value instanceof File){
        formData.append(key,value);
      }else if(value !== undefined && value !== null){
        formData.append(key,value.toString());
      }
    })
    await dispatch(kyc(formData as any))
  }
  return (
    <div className='border-2 rounded-lg'>
      <div className='text-3xl font-bold text-center w-full text-neutral-100 bg-slate-800 p-2 '>KYC</div>
      {status === 'loading' ? <div className='flex justify-center mt-16'><LoadingDots/></div>:
      <Form {...form}>
          <form ref={ref} encType="multipart/form-data"  onSubmit={form.handleSubmit(onSubmit)} className='flex flex-wrap p-12 justify-start gap-12 text-slate-800'>
            <FormField
            control={form.control}
            name='panNumber'
            render={({field})=>(
              <FormItem className='w-1/3'>
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
              <FormItem className='w-1/3'>
                <FormLabel>Pan Name</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <div className='w-1/4'>
            <Controller
            control={form.control}
            name="panCard"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Upload Pan Card</FormLabel>
                <FormControl>
                  <input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                    className=' rounded-md border-2 p-1 w-full'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
            </div>
            <div className='w-1/4'>
            <Controller
            control={form.control}
            name="addressProofFront"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className='text-nowrap'>Address Proof (Front)</FormLabel>
                <FormControl>
                  <input
                     className=' rounded-md border-2 p-1 w-full'
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
            </div>
          <div className='w-1/4'>
          <Controller
            control={form.control}
            name="addressProofBack"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Address Proof(Back)</FormLabel>
                <FormControl className=''>
                  <input
                     className=' rounded-md border-2 p-1 w-full'
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          </div>
          {error && <p>{error}</p>}
          </form>
      </Form>

      }
    </div>
  )
})

export default Kyc


