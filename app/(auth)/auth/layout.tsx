"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import StoreProvider from "@/redux/store-provider";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname(); // Returns the current path

  console.log(pathname.includes("login"));
  return (
    <div className="bg-neutral-100 w-full h-full">
      <div className="w-full h-24 items-center flex bg-slate-800">
        <p className="text-4xl font-extrabold text-white w-full text-center">
          Stepper Form
        </p>
      </div>
      <div className="flex justify-center mt-8 ">
        <p
          className={
            pathname.includes("register")
              ? `text-3xl bg-slate-800 p-5 rounded-l-full text-neutral-100`
              : `text-slate-800 bg-neutral-100 text-3xl p-5 rounded-l-full border-2`
          }
        >
          <Link href={"/auth/register"}>Register</Link>
        </p>
        <p
          className={
            pathname.includes("login")
              ? `text-3xl bg-slate-800 p-5 rounded-r-full text-neutral-100`
              : `text-slate-800 bg-neutral-100 text-3xl p-5 rounded-r-full border-2`
          }
        >
          <Link href={"/auth/login"}>Login</Link>
        </p>
      </div>
      <main className="md:mx-64 sm:mx-32 mx-0 sm:shrink-0">
        <StoreProvider>{children}</StoreProvider>
      </main>
    </div>
  );
}
