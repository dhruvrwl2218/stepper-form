"use client"
import React, { useState,useRef } from 'react'
import BankDetails from '@/components/steppers/BankDetails';
import Kyc from '@/components/steppers/Kyc';
import Otp from '@/components/steppers/Otp';
import PersonalDetails from '@/components/steppers/PersonalDetails';
import Vehiclelist from '@/components/steppers/Vehiclelist';
import { useSelector,useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import { Button } from '@/components/ui/button';
import CurrStep from '@/components/currStep/CurrStep';
import { previousStep } from '@/redux/features/User/userSlice';


const page = () => {
  const userstep = (useSelector((state: RootState) => state.User.user?.step) ?? 5) as number
  const formSubmitRef = useRef<HTMLFormElement>(null);
  const dispatch: AppDispatch = useDispatch();
  
  const renderStage = (): JSX.Element | null => {
    switch (userstep) {
      case 1: 
        return <Otp />;
      case 2: 
        return <Vehiclelist ref={formSubmitRef}/>;
      case 3:
        return <Kyc ref={formSubmitRef}/>;
      case 4: 
        return <PersonalDetails ref={formSubmitRef}/>;
      case 5:
        return <BankDetails ref={formSubmitRef}/>;
      default:
        return null;//here we can show the processing compnent when the request is sent so that user can't click do any other action
    }
  };
  const handleNext = () =>{
     if(formSubmitRef.current){
      formSubmitRef.current.requestSubmit();
     }
  }
  const handlePrevious = () =>{
    console.log("clicked prev")
    dispatch(previousStep());
  }
  return (
    <div className='w-full min-w-[300px] mt-8 shadow-xl p-4'>
      <div><CurrStep currStep = {userstep}/></div>
      <div className=''>
        {renderStage()}
      </div>
      <div className='mt-8 flex justify-between gap-2'>
        <div>{userstep > 1 ? <Button variant={"indi"} size={"lg"} onClick={handlePrevious}>Previous</Button>:null}</div>
        <div>{userstep > 1 ? <Button variant={"indi"} size={"lg"} onClick={handleNext}>{userstep < 5 ?`Save & Proceed`:`Save & Submit`}</Button>:null}</div> 
      </div>
    </div>
  )
}
export default page
