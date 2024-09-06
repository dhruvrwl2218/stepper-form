import React from 'react'
import { useSelector} from 'react-redux';
import { RootState } from "@/redux/store";
import { Progress } from "@/components/ui/progress"

//for styling
const stepNo = "text-center p-1 rounded-full w-8"
interface CurrStepProp {
  currStep : number;
}
//currStep >= 2 ?`bg-indigo-500 `:`bg-slate-300` 
const CurrStep: React.FC<CurrStepProp> = ({currStep}) => {
  console.log('in CurrStep:',currStep)
  return (
    <div className='flex justify-between p-8 m-4 text-gray-300'>
      <div className='flex flex-col mr-2'>
        <div className='flex justify-center'>
        <div className={`text-center p-1 bg-indigo-500 rounded-full w-8 text-white`}>1</div>
        </div>
        <div className='text-center text-sm text-black'>Login</div>
      </div>
      <div className='w-full mt-3'><Progress value={currStep > 1 ? 100 : -1}/></div>
      <div className='flex flex-col'>
        <div className='flex justify-center'>
        <div className={`${stepNo} ${currStep >= 2 ? `bg-indigo-500` : `bg-slate-300`}`}>2</div>
        </div>
      <div className={`text-center text-sm ${currStep >= 2 && `text-black`}`}>Vechile Category</div>
      </div>
      <div className='w-full mt-3'><Progress value={currStep > 2 ? 100 : -1}/></div>
      <div className='flex flex-col mx-2'>
        <div className='flex justify-center'>
            <div className={`${stepNo} ${currStep >= 3 ? `bg-indigo-500` : `bg-slate-100`}`}>3</div>
        </div>
      <div className={`text-center text-sm ${currStep >= 3 && `text-black`}`}>KYC</div>
      </div>
      <div className='w-full mt-3'><Progress value={currStep > 3 ? 100 : -1}/></div>
      <div className='flex flex-col'>
      <div className='flex justify-center'>
        <div className={`${stepNo} ${currStep >= 4 ? `bg-indigo-500` : `bg-slate-300`}`}>4</div>
      </div>
      <div className={`text-center text-sm ${currStep >= 4 && `text-black`}`}>Personal details</div>
      </div>
      <div className='w-full mt-3'><Progress value={currStep > 4 ? 100 : -1}/></div>
      <div className='flex flex-col'>
        <div className='flex justify-center'>
        <div className={`${stepNo} ${currStep === 5 ? `bg-indigo-500` : `bg-slate-300`}`}>5</div>
        </div>
      <div className={`text-center text-sm ${currStep === 5 && `text-black`}`}>Bank Details</div>
      </div>
    </div>
  )
}

export default CurrStep;
