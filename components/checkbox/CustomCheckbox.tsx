// import React, { useState } from 'react'
// import { UseFormRegister,UseFormWatch, UseFormSetValue,FieldValues,Path,PathValue } from 'react-hook-form';

// interface CheckboxProps<T extends FieldValues> {
//   vehcile: string,
//   watch : UseFormWatch<T>
//   setValue : UseFormSetValue<T>
// }

// const CustomCheckbox  = <T extends FieldValues>({vehcile,setValue,watch}: CheckboxProps<T>) => { 
 
//   const vehiclesMap = [...(watch("vehiclesMap" as Path<T>) as readonly string[])];
//   const isChecked = vehiclesMap.includes(vehcile);

//   const toggleCheckbox = () => {
//     const currentValues = [...(watch("vehiclesMap" as Path<T>) as readonly string[])]; 
//     if (isChecked) {
//       // Remove vehicle from array
//       setValue(
//         "vehiclesMap" as Path<T>,
//         currentValues.filter((v) => v !== vehcile)
//       );
//     } else {
//       // Add vehicle to array
//       setValue("vehiclesMap" as Path<T>, [...currentValues, vehcile]);
//     }
//   };

//   return (
//     <div className ='' role='button' onClick={toggleCheckbox} key={vehcile}>
//       <div className=''><img src= {`/vehicleIcons/${vehcile}.png`} alt={`${vehcile}img`} /></div>
//       <div>
//       <input type="checkbox"  value={vehcile} className='sr-only'/>
//       <p>{vehcile}</p>
//       </div>
//     </div>
//   )
// }

// export default CustomCheckbox
 
import React from 'react';
import { UseFormWatch, UseFormSetValue, FieldValues, Path, PathValue } from 'react-hook-form';

interface CheckboxProps<T extends FieldValues> {
  vehcile: string;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
}

const CustomCheckbox = <T extends FieldValues>({ vehcile, setValue, watch }: CheckboxProps<T>) => {
  const vehiclesMap = watch("vehiclesMap" as Path<T>) as string[] | undefined;
  const isChecked = vehiclesMap?.includes(vehcile) ?? false;

  const toggleCheckbox = () => {
    // console.log(vehcile,'clicked')
    const currentValues = watch("vehiclesMap" as Path<T>) as string[] | undefined;
    if (isChecked) {
      // Remove vehicle from array
      setValue(
        "vehiclesMap" as Path<T>,
        (currentValues?.filter((v) => v !== vehcile) ?? []) as PathValue<T, Path<T>>
      );
    } else {
      // Add vehicle to array
      setValue(
        "vehiclesMap" as Path<T>,
        ([...(currentValues ?? []), vehcile] as unknown) as PathValue<T, Path<T>>
      );
    }
  };
  return (
    <div className={ isChecked ? `bg-indigo-400 p-2 flex flex-col items-center shadow-md rounded-md w-24 ` : `bg-neutral-50 p-2 flex flex-col items-center shadow-md rounded-md w-24`} role='button' onClick={toggleCheckbox} key={vehcile}>
      <div className=''><img src={`/vehicleIcons/${vehcile}.png`} alt={`${vehcile}img`} /></div>
      <div>
        <input type="checkbox" value={vehcile} className='sr-only' />
        <p>{vehcile}</p>
      </div>
    </div>
  );
};

export default CustomCheckbox;
