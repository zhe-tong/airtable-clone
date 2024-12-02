import { SignedIn, SignedOut } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";


async function Text() {
  return (
    <div>
      <div className="flex flex-wrap gap-4">THIS IS HOME PAGE</div>
      <Link href="/dashboard">
        <button style={{ padding: '10px', background: 'orange', color: 'white', border: 'none', borderRadius: '5px' }}>
          Go to Dashboard Page
        </button>
      </Link>
    </div>
  )
}


export default async function HomePage() {
  

  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-2xl">Please sign in to view this page</div>
      </SignedOut>
      <SignedIn>
        <Text/>
      </SignedIn>
      </main>
  );
}
