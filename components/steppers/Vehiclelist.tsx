import React, { forwardRef,useEffect,useState} from 'react'
import { getVechileList } from '@/apiReq/userApi'
const Vehiclelist = forwardRef((ref) => {

  // const [vehicleTypes,setVehicleType] = useState([])
  // useEffect(()=>{
  //     const getList = async() =>{
  //       const response = await(getVechileList());
  //       setVehicleType(response as any);
  //     }
  //     getList();
  // },[])
  return (
    <div>
      {/* {vehicleTypes.map((v)=><h3>{v}</h3>)} */}
      list will be here
    </div>
  )
})

export default Vehiclelist
