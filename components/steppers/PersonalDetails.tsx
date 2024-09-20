"use Client"

import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import { SubmitHandler, useForm } from "react-hook-form"
import {  z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetailsSchema } from "./FormSchemas";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { personalDetails } from "@/redux/features/User/userAsyncThunk"

const baseSchema = PersonalDetailsSchema._def.schema; // Extract the base schema
const Updatedschema = baseSchema.partial({ confirmPassword : true });//without confirm pass
type dltConfirmPass = z.infer<typeof Updatedschema>

const StateList = {
  Rajasthan : ["Udaipur","Jaipur","Jodhpur","Ajmer","Jaishalmer","Mount Abu"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bangalore", "Mysore", "Hubli"],
  Gujrat : ["Ahemdabad","Vadodra","Rajkot","Surat","GandhiNagar"],
  Punjab :["Bhatinda","Amaritsar","Chandigarh"]
};

const PersonalDetails = forwardRef<HTMLFormElement>((props,ref) => {
  const dispatch : AppDispatch = useDispatch();
  const {status,error,user} = useSelector((state: RootState) => state.User);
  const[cities,setCities] = useState<string[]>([]);
  const form = useForm<z.infer<typeof PersonalDetailsSchema>>({
    resolver : zodResolver(PersonalDetailsSchema),
    defaultValues:{
      entity : user?.entity || undefined,
      firstName : user?.firstName || '',
      lastName : user?.lastName || '',
      email : user?.email || '',
      mobileNo2 : user?.mobile2 || '',
      address1 : user?.address1 || '',
      address2 : user?.address2 || '',
      pincode : user?.pinCode || '',
      state : user?.state || '',
      city : user?.city || '',
    }
  })
  const onSubmit: SubmitHandler<z.infer<typeof PersonalDetailsSchema>>= async(values) =>{
    console.log("formvalues",values);
    delete (values as any).ConfirmPassword;
    Updatedschema.parse(values);

    await dispatch(personalDetails(values as any))
  }

  return (
    <div className='border-2 rounded-lg'>
      <div className='text-3xl font-bold text-center w-full text-white bg-slate-800 p-2'>Personal Details</div>
      {status === 'loading' ? <h1>loading</h1> :
      <Form {...form}>
          <form  action="" ref = {ref} onSubmit={form.handleSubmit(onSubmit)} className='flex flex-wrap p-12 '>
            <FormField
            control={form.control}
            name="entity"
            render={({field})=> (
              <FormItem className="w-full ">
                <FormLabel>Entity</FormLabel>
                 <FormControl>
                  <RadioGroup onValueChange={field.onChange}
                   defaultValue={field.value}
                    className=" flex gap-4">
                      <FormItem className="">
                        <FormControl>
                          <RadioGroupItem value="Individual"/>
                        </FormControl>
                        <FormLabel className="font-normal ml-2">
                      Individual
                    </FormLabel>
                      </FormItem>
                      <FormItem className="">
                        <FormControl>
                          <RadioGroupItem value="Corporate"/>
                        </FormControl>
                        <FormLabel className="font-normal ml-2">
                      Corporate
                    </FormLabel>
                      </FormItem>
                  </RadioGroup>
                 </FormControl>
              </FormItem>
            )}/>
            <div className="flex flex-wrap my-2 gap-2">   
            <FormField
            control={form.control}
            name='firstName'
            render={({field})=>(
              <FormItem className='w-64'>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='FirstName' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
             <FormField
            control={form.control}
            name='lastName'
            render={({field})=>(
              <FormItem className='w-64'>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='LastName' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
            control={form.control}
            name='email'
            render={({field})=>(
              <FormItem className='w-64'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
             <FormField
            control={form.control}
            name='mobileNo2'
            render={({field})=>(
              <FormItem className='w-64'>
                <FormLabel>Secondary Mobile No</FormLabel>
                <FormControl>
                  <Input placeholder='Secondary Mobile No' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
            control={form.control}
            name='password'
            render={({field})=>(
              <FormItem className='w-64'>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
            control={form.control}
            name='confirmPassword'
            render={({field})=>(
              <FormItem className='w-64'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder='Confirm Password' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            </div>
           <div className="flex flex-wrap my-2 gap-2">
           <FormField
            control={form.control}
            name='address1'
            render={({field})=>(
              <FormItem className='w-96'>
                <FormLabel>Address 1</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
            control={form.control}
            name='address2'
            render={({field})=>(
              <FormItem className='w-96'>
                <FormLabel>Address 2</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField
            control={form.control}
            name='pincode'
            render={({field})=>(
              <FormItem className='w-48'>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder='' {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/> 
             <FormField
            control={form.control}
            name='state'
            render={({field})=>(
              <FormItem className='w-48'>
                <FormLabel>State</FormLabel>
                <Select onValueChange={(value) => {
                    field.onChange(value);
                    setCities(StateList[value as keyof typeof StateList] || []);
                    form.setValue("city", ""); // Reset city when state changes
                  }}
                    defaultValue={field.value}>
                  <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder = "Select State"/>
                </SelectTrigger>
                </FormControl>
                <SelectContent> 
                  {Object.keys(StateList).map(stateName => <SelectItem key= {stateName} value={stateName}>{stateName}</SelectItem>)}
                </SelectContent>
                </Select>
              </FormItem>
            )}/>
            <FormField
            control={form.control}
            name='city'
            render={({field})=>(
              <FormItem className='w-48'>
                <FormLabel>City</FormLabel>
                <Select  onValueChange={(value) => {
                    field.onChange(value);}}
                     defaultValue={field.value}>  
                  <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder = "Select City"/>
                </SelectTrigger>
                </FormControl>
                <SelectContent> 
                 {cities.map(city => <SelectItem key={city} value={city}>{city}</SelectItem>)}
                </SelectContent>
                </Select>
              </FormItem>
            )}/>
           </div>
           
            </form>
      </Form>
      }
    </div>
  )
})

export default PersonalDetails



