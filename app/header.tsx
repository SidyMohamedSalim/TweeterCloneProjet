import React from "react";

import { getServerSession } from "next-auth/next";
import AuthButtons from "../components/AuthButttons";
import { navList } from "../src/config/siteConfig";
import { X } from "lucide-react";
import Link from "next/link";

async function Headers() {
  const session = await getServerSession();
  return (
    <header className="col-span-2 md:col-span-3 flex w-fit px-3 h-screen flex-col justify-between max-md:items-center  border-r ">
      <div className="font-mono font-bold">
        <div className="flex  max-md:justify-center items-center pb-4">
          <X size={40} />
          <p className="ml-2">{session?.user && session.user.name}</p>
        </div>
        <div className="w-full">
          <ul className="flex flex-col justify-center gap-5 text-lg w-full">
            {navList.map((nav, i) => (
              <Link
                href={nav.link}
                key={i}
                className="flex gap-3 px-3 py-2  hover:bg-gray-700  max-md:hover:rounded-full w-full items-center"
              >
                <nav.icon className="w-6 h-6" />
                <span className="max-md:hidden">{nav.title}</span>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      <AuthButtons session={session} />
    </header>
  );
}

export default Headers;
