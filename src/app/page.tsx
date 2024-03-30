"use client";
import { Button } from "@/components/ui/button";
import { SignOutButton, SignedIn } from "@clerk/clerk-react";
import { SignInButton, SignedOut, useSession } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const createFile=useMutation(api.file.createFile)
  const files=useQuery(api.file.getFile)

  const session = useSession();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
           <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" >
        <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {
        files?.map(file=>{
          return <div key={file._id}>{file.name}</div>
        })
      }

      <Button onClick={()=>createFile({name:"hello world"})}>Click me</Button>
     
    </main>
  );
}
