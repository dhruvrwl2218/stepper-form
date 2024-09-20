"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BankDetailsSchema } from "./FormSchemas";

import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const {status,error,user} = useSelector((state: RootState) => state.User);

  const form = useForm<z.infer<typeof BankDetailsSchema>>({
    resolver : zodResolver(BankDetailsSchema),
    defaultValues:{
      bankAccountHolderIfsc : user?.bankAccountHolderIfsc || '',
      bankAccountHolderName : user?.bankAccountHolderName || '',
      bankAccountHolderNumber : user?.bankAccountHolderNumber || '',
      ConfirmBankAccNo : ''
    }
  })

  const onSubmit: SubmitHandler<z.infer<typeof BankDetailsSchema>>= async(values) =>{
    console.log(values)
    await dispatch(bankDetails(values as any))
    if(status === 'succeeded'){
      router.push('/auth/login')
    }
  }

  return (
    <div className='border-2 rounded-lg'>
      {status === 'loading' && <h1>Loading</h1>}
      <div className='text-3xl font-bold text-center w-full text-white bg-slate-800 p-2'>Bank Details</div>
      <Form {...form}>
          <form action="" ref={ref} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-wrap p-12 gap-6 '>
            <FormField
            control={form.control}
            name='bankAccountHolderName'
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
           name='bankAccountHolderIfsc'
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
           name='bankAccountHolderNumber'
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
             {error && <p>Error while Saving Bank Details</p>}
            </form>
      </Form>
    </div>
  )
}
)
export default BankDetails





