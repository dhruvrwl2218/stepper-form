
 export interface UserState {
    _id: string;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
    mobile: string | null;
    mobile2: string | null;
    email: string | null;
    address1: string | null;
    address2: string | null;
    pinCode: string | null;
    panName: string | null;
    panNumber: string | null;
    bankAccountHolderName: string | null;
    bankAccountHolderNumber: string | null;
    bankAccountHolderIfsc: string | null;
    cityId: string | null;
    stateId: string | null;
    status: string | null;
    step: Number | null;
    entity : string | null;
    createdAt: string | null;
    updatedAt: string | null;
    vechileMap: string[];
}

// interface VehicleMapping{
//     // id : string,
//     // vehicleId : string,
//     // Vehicle :{
//     //     id:string,
//     //     name:string
//     // };
    
// }
//  export interface UserState{
//     user : User | null,
//     loading :boolean,
//     error : string | null,
// }