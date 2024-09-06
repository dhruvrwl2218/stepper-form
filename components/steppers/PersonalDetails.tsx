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
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { personalDetails } from "@/redux/features/User/userAsyncThunk"

const baseSchema = PersonalDetailsSchema._def.schema; // Extract the base schema
const Updatedschema = baseSchema.partial({ ConfirmPassword : true });//without confirm pass
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
  const user = useSelector((state: RootState) => state.User.user);
  const[cities,setCities] = useState<string[]>([]);
  const form = useForm<z.infer<typeof PersonalDetailsSchema>>({
    resolver : zodResolver(PersonalDetailsSchema),
    defaultValues:{
      
    }
  })
  const onSubmit: SubmitHandler<z.infer<typeof PersonalDetailsSchema>>= (values) =>{
    console.log("formvalues",values);
    delete (values as any).ConfirmPassword;
    Updatedschema.parse(values);
    dispatch(personalDetails(values as any))
  }

  return (
    <div className='border-2 rounded-lg'>
      <div className='text-3xl font-bold text-center w-full text-white bg-indigo-400 p-2'>Personal Details</div>
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
            name='FirstName'
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
            name='LastName'
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
            name='Email'
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
            name='SecondaryMobileNo'
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
            name='Password'
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
            name='ConfirmPassword'
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
            name='Address1'
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
            name='Address2'
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
            name='Pincode'
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
            name='State'
            render={({field})=>(
              <FormItem className='w-48'>
                <FormLabel>State</FormLabel>
                <Select onValueChange={(value) => {
                    field.onChange(value);
                    setCities(StateList[value as keyof typeof StateList] || []);
                    form.setValue("City", ""); // Reset city when state changes
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
            name='City'
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
    </div>
  )
})

export default PersonalDetails


////onValueChange={field.onChange}

// setCities(StateList[value] || []);
// form.setValue("City", ""); // Reset city when state changes
// }}

{/* <RadioGroup
                onValueChange = {field.onChange} value = {field.value}
                className = "">
                  <FormControl>
                    <RadioGroupItem value = "Individual" id = "Individual"/>
                    <Label htmlFor="Individual">Individual</Label>
                  </FormControl>
                  <FormControl>
                    <RadioGroupItem value = "Corporate" id = "Corporate"/>
                    <Label htmlFor="Corporate">Corporate</Label>
                  </FormControl>
                </RadioGroup> */}





                

// const PersonalDetailsSchema = z.object({
//   entity: z.enum(['Individual', 'Corporate'], {
//     required_error: 'Entity is required',
//   }),

//   FirstName: z
//     .string()
//     .min(1, { message: "First Name is required" })
//     .max(50, { message: "First Name can't exceed 50 characters" }),

//   LastName: z
//     .string()
//     .min(1, { message: "Last Name is required" })
//     .max(50, { message: "Last Name can't exceed 50 characters" }),

//   Email: z
//     .string()
//     .email({ message: "Invalid email address" }),

//   SecondaryMobileNo: z
//     .string()
//     .regex(/^\d{10}$/, { message: "Invalid mobile number" })
//     .optional(),

//   Password: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" })
//     .max(20, { message: "Password can't exceed 20 characters" }),

//   ConfirmPassword: z
//     .string()
//     .min(8, { message: "Password must be at least 8 characters long" })
//     .max(20, { message: "Password can't exceed 20 characters" }),

//   Address1: z
//     .string()
//     .min(1, { message: "Address 1 is required" })
//     .max(100, { message: "Address 1 can't exceed 100 characters" }),

//   Address2: z
//     .string()
//     .max(100, { message: "Address 2 can't exceed 100 characters" })
//     .optional(),

//   Pincode: z
//     .string()
//     .regex(/^\d{6}$/, { message: "Invalid pincode" }),

//   State: z.string().min(1, { message: "State is required" }),

//   City: z.string().min(1, { message: "City is required" }),
// }).superRefine((data, ctx) => {
//   if (data.Password !== data.ConfirmPassword) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       path: ['ConfirmPassword'],
//       message: 'Passwords do not match',
//     });
//   }
// });

