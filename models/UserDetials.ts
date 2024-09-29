import mongoose, { Schema, model, models } from "mongoose";

const UserDetails = new Schema({
    fullName: String,
    firstName: String,
    lastName: String,
    otp: {
      type: String,
      default: null,
    },
    otpExpiration: Date,
    email: {
      type: String,
      required: false,
      unique : true,
      validate: {
        validator: (v: string) => /.+\@.+\..+/.test(v),
        message: (props: { value: string }) =>
          `${props.value} is not a valid email address!`,
      },
    },
    password : {
      type : String
    },
    mobileNo: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^\d{10}$/, "Mobile number must be 10 digits"],
    },
    entity: {
      enum: ["Corporate", "Individual"],
    },
    companyName:  {
      type: String,
      default: null,
    },
    address1: {
      type: String,
      default: null,
    },
    address2: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    vechileMap: {
      type: [String],
    },
    panName: {
      type: String,
      default: null,
    },
    panNumber: {
      type: String,
      default: null,
    },
    panCard: {
      type: String,
      default: null,
    },
    addressProofFront: {
      type: String,
      default: null,
    },
    addressProofBack: {
      type: String,
      default: null,
    },
    bankAccountHolderName: {
      type: String,
      default: null,
    },
    bankAccountHolderNumber: {
      type: String,
      default: null,
    },
    bankAccountHolderIfsc: {
      type: String,
      default: null,
    },
    pinCode: {
      type: String,
      default: null,
    },
    status: {
      type: Number,
      default: null,
    },
    step: {
      type: Number,
      default: null,
    },
    highestStep :{
      type : Number,
      default : null
    }
  },
  { timestamps: true }
);

const User = models.User || model("User", UserDetails);
export default User;
