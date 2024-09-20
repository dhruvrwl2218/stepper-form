import React, { forwardRef,useEffect,useState} from 'react'
import { getVechileList } from '@/apiReq/userApi';
import { SubmitHandler, useForm } from "react-hook-form";
import CustomCheckbox from '../checkbox/CustomCheckbox';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/redux/store";
import { z } from 'zod'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { VehicleMap } from '@/redux/features/User/userAsyncThunk';

const vehicleList: string[] = ['2wheeler','3wheeler','4wheeler','tractor','truck'];

const schema = z.object({
  vehiclesMap: z.array(z.string()).refine((val) => val.length > 0, {
    message: "You must select at least one vehicle.",
  }).refine((val) => val.every((v) => vehicleList.includes(v)), {
    message: "Invalid vehicle selected.",
  })
});

interface FormData {
  vehiclesMap: string[]; // Store selected vehicles as an array of strings
}

const Vehiclelist = forwardRef<HTMLFormElement>((props,ref) => {
  const dispatch : AppDispatch = useDispatch();
  const {status,error,user} = useSelector((state: RootState) => state.User);
  
 const {register,setValue,watch,handleSubmit,formState: { errors }} = useForm<FormData>({
  resolver: zodResolver(schema), 
  defaultValues : {vehiclesMap : user?.vechileMap || []}
 });
  
 const onSubmit:SubmitHandler<FormData> = async(data)=>{
  await dispatch(VehicleMap(data as any))
 }

  return (
     <div>
      {status === 'loading' ? <h1>Loading</h1> :
      <form action="" ref={ref} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex p-4 justify-evenly flex-wrap '>
          {}
          {vehicleList.map((vehcile)=>(<CustomCheckbox key = {vehcile} vehcile = {vehcile} setValue={setValue} watch={watch}/>))}
        </div> 
        {errors.vehiclesMap && (
          <p className="text-red-500">{errors.vehiclesMap.message}</p>
        )}
      </form>
      }
    </div> 
  )
})

export default Vehiclelist



// const [vehicleTypes,setVehicleType] = useState([])
//   useEffect(()=>{
//       const getList = async() =>{
//         const response = await(getVechileList());
//         setVehicleType(response as any);
//       }
//       getList();
//   },[])


// interface CheckboxProps{
//   name :
// }
// const CustomCheckbox = () =>{
//   return(
//     <>
      
//     </>
//   )
// }