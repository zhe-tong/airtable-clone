import "~/styles/globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";

import { TopNav } from "./_components/topnav";


const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata= {
  title: "Airtable",
  description: "Generated by T",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};



export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={`font-sans ${inter.variable} h-screen flex flex-col`}>
        <TopNav />
        <div className="flex-1">{children}</div>
        </body>
    </html>
    </ClerkProvider>
  );
}
