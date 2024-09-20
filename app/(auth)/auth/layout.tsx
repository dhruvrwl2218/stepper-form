import { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import StoreProvider from "@/redux/store-provider";

interface AuthLayoutProps{
    children : ReactNode
}
export default function AuthLayout({children}:AuthLayoutProps){
    return(
        <div className="bg-neutral-100"> 
        <div className="w-full h-24 items-center flex bg-slate-800">   
        <p className="text-4xl font-extrabold text-white w-full text-center">Register</p> 
         <div>
            
         </div>
        </div>
        <div className="flex justify-center mt-8 ">
        {/* <Link href = "/register" className={buttonVariants({ variant: "indi" })}>Register</Link>
        <Link href = "/login" className={buttonVariants({ variant: "indi" })}>Login</Link> */}
        <p className={`text-3xl bg-slate-800 p-4 rounded-l-full text-white`}><Link href={'/register'}>Register</Link></p>
        <p className={`text-3xl bg-slate-800 p-4 rounded-r-full text-white`}><Link href={'/login'}>Login</Link></p>
        </div>
        <main className="md:mx-64 sm:mx-32 sm:shrink-0">
            <StoreProvider>{children}</StoreProvider>
        </main> 
        </div>
    )
}