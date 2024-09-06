import { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"
import StoreProvider from "@/redux/store-provider";

interface AuthLayoutProps{
    children : ReactNode
}
export default function AuthLayout({children}:AuthLayoutProps){
    return(
        <div> 
        <div className="w-full h-24 items-center flex bg-indigo-400">   
        <p className="text-4xl font-extrabold text-white">Register</p> 
         <div>
            
         </div>
        </div>
        <div className="flex justify-center mt-8 ">
        {/* <Link href = "/register" className={buttonVariants({ variant: "indi" })}>Register</Link>
        <Link href = "/login" className={buttonVariants({ variant: "indi" })}>Login</Link> */}
        <p className={`text-3xl bg-indigo-400 p-4 rounded-l-full text-white`}><Link href={'/register'}>Register</Link></p>
        <p className={`text-3xl bg-indigo-400 p-4 rounded-r-full text-white`}><Link href={'/login'}>Login</Link></p>
        </div>
        <main>
            <StoreProvider>{children}</StoreProvider>
        </main>
        </div>
    )
}