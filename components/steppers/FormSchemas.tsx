import {  z } from "zod"


export const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const otpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  otp: z.string().min(6, { message: "OTP must be 6 characters long" }),
});


export const KycSchema = z.object({
  panNumber: z.string()
    .length(10, { message: "PAN number must be exactly 10 characters long" })
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, { message: "PAN number must follow the pattern AAAAA9999A" }),
  
  panName: z.string()
    .min(1, { message: "PAN name is required" })
    .max(100, { message: "PAN name must be at most 100 characters long" })
    .regex(/^[A-Za-z\s]+$/, { message: "PAN name must only contain letters and spaces" }),

  panCard: z.instanceof(File).optional().refine(
    (file) => file === undefined || (file.size <= 5 * 1024 * 1024),
    "File size should be less than 5MB"
  ).refine(
    (file) => file === undefined || ["image/jpeg", "image/png", "application/pdf"].includes(file?.type),
    "Only JPEG, PNG, or PDF files are allowed"
  ),

  addressProofFront: z.instanceof(File).optional().refine(
    (file) => file === undefined || (file.size <= 5 * 1024 * 1024),
    "File size should be less than 5MB"
  ).refine(
    (file) => file === undefined || ["image/jpeg", "image/png", "application/pdf"].includes(file?.type),
    "Only JPEG, PNG, or PDF files are allowed"
  ),

  addressProofBack: z.instanceof(File).optional().refine(
    (file) => file === undefined || (file.size <= 5 * 1024 * 1024),
    "File size should be less than 5MB"
  ).refine(
    (file) => file === undefined || ["image/jpeg", "image/png", "application/pdf"].includes(file?.type),
    "Only JPEG, PNG, or PDF files are allowed"
  ),
});

  

  
export const PersonalDetailsSchema = z.object({
    entity: z.enum(['Individual', 'Corporate'], {
      required_error: 'Entity is required',
    }),
  
    firstName: z
      .string()
      .min(1, { message: "First Name is required" })
      .max(50, { message: "First Name can't exceed 50 characters" }),
  
    lastName: z
      .string()
      .min(1, { message: "Last Name is required" })
      .max(50, { message: "Last Name can't exceed 50 characters" }),
  
    email: z
      .string()
      .email({ message: "Invalid email address" }),
  
    mobileNo: z
      .string()
      .regex(/^\d{10}$/, { message: "Invalid mobile number" })
      .optional(),
  
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password can't exceed 20 characters" }),
  
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password can't exceed 20 characters" }),
  
    address1: z
      .string()
      .min(1, { message: "Address 1 is required" })
      .max(100, { message: "Address 1 can't exceed 100 characters" }),
  
    address2: z
      .string()
      .max(100, { message: "Address 2 can't exceed 100 characters" })
      .optional(),
  
   pinCode: z
      .string()
      .regex(/^\d{6}$/, { message: "Invalid pincode" }),
  
    state: z.string().min(1, { message: "State is required" }),
  
    city: z.string().min(1, { message: "City is required" }),
  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['ConfirmPassword'],
        message: 'Passwords do not match',
      });
    }
  });

  
 export const BankDetailsSchema = z.object({
    bankAccountHolderName: z
      .string()
      .min(1, { message: "Account Holder Name is required" })
      .max(100, { message: "Account Holder Name can't exceed 100 characters" }),
  
    bankAccountHolderIfsc: z
      .string()
      .min(11, { message: "Bank IFSC must be 11 characters long" })
      .max(11, { message: "Bank IFSC must be 11 characters long" })
      .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, { message: "Invalid Bank IFSC format" }),
  
    bankAccountHolderNumber: z
      .string()
      .min(9, { message: "Bank Account Number must be at least 9 digits long" })
      .max(18, { message: "Bank Account Number can't exceed 18 digits" })
      .regex(/^\d+$/, { message: "Bank Account Number must contain only digits" }),
  
    ConfirmBankAccNo: z
      .string()
      .min(9, { message: "Bank Account Number must be at least 9 digits long" })
      .max(18, { message: "Bank Account Number can't exceed 18 digits" })
      .regex(/^\d+$/, { message: "Bank Account Number must contain only digits" })
  })
  .refine((data) => data.bankAccountHolderNumber === data.ConfirmBankAccNo, {
    message: "Bank Account no doesn't match",
    path: ["confirm"],
  });