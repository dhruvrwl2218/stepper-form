"use client";

import React from "react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const signSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(20, { message: "Password can't exceed 20 characters" }),
})

const page = () => {
  
  const {register,handleSubmit, formState: { errors }} = useForm<z.infer<typeof signSchema>>({
      resolver : zodResolver(signSchema),
      defaultValues:{
        email : "",
        password : ""
      }
    })

  const signIn:SubmitHandler<z.infer<typeof signSchema>> = async(value)=>{
    console.log(value)
  }

  return (
    <div className="mt-10  item-center flex justify-center ">
      <Card className="w-96 p-2">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Ghoomiee-Ghoomiee</CardTitle>
          <CardDescription className="text-md">Sign In</CardDescription>
        </CardHeader>
        <CardContent>
          <form id = "signIn" action="" onSubmit={handleSubmit(signIn)}>
            <div className="flex flex-col gap-4">
            <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="xyz@gmail.com" {...register('email')}/>
            {errors?.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="123@321" {...register('password')}/>
            {errors?.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col items-center space-y-2 w-full">
          <Button className="w-full" form="signIn">Sign in</Button>
          <p><span className="text-slate-800 underline"><Link href = "/auth/register">Register</Link></span> before siging in</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
