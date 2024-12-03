import { SignedIn, SignedOut } from "@clerk/nextjs";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";


async function Text() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold">Digital operations for the AI era</h1>
      <h2 className="mt2 text-lg">Create modern business apps to manage and automate critical processes.</h2>
      <Link href="/dashboard">
        <button style={{ padding: '10px', background: 'black', color: 'white', border: 'none', borderRadius: '5px' }}>
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
