import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function TopNav () {
    return (
    <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border h-[60]">
      <Link href="/dashboard" className="text-black hover:underline">
        Airtable
      </Link>
  
      <div>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
      </div>
    </nav>
    )
  }