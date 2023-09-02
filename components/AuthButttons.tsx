"use client";
import { LogOut, UserMinusIcon, UserPlus2 } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButtons({ session }: { session: Session | null }) {
  return session?.user?.email ? (
    <div className="bg-sky-500 my-4   to-white hover:bg-sky-600 flex justify-evenly max-w-[9rem] md:px-3 rounded-full p-4">
      <button
        className="  flex gap-1 text-white transition-all"
        onClick={() => signOut()}
      >
        <LogOut color="white" />
      </button>
    </div>
  ) : (
    <div className="text-white">
      <Link
        href={"/login"}
        className="bg-sky-500 my-4  hover:bg-sky-600 flex justify-evenly max-w-[9rem] md:px-3 rounded-full p-4"
      >
        <UserPlus2 color="white" />
      </Link>
    </div>
  );
}
