import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-neutral-50">
      <div className="flex gap-5">
      <h1 className="text-indigo-400 text-4xl font-extrabold">
        Stepper form
      </h1>
      <Link href = "/auth" className={buttonVariants({ variant: "indi" })}>Click here</Link>
      </div>
      
    </main>
  );
}
