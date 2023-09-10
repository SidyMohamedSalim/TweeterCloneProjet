import React from "react";

import AuthButtons from "../components/AuthButttons";
import { navList } from "../src/config/siteConfig";
import { X } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import Image from "next/image";

function Headers({ session }: { session: Session | null }) {
  return (
    <header className="col-span-2 h-screen  md:col-span-3 flex w-fit px-3 flex-col justify-between  max-md:items-center  border-r ">
      <div className="font-mono font-bold">
        <div className="flex flex-col  max-md:justify-center items-center pb-4">
          <Image src={"/logo.png"} width={60} height={60} alt={"logo"} />
        </div>
        <div className="w-full">
          <div className="flex flex-col justify-center items-center gap-5 text-lg w-full">
            {navList.map((nav, i) => (
              <Link
                href={nav.link}
                key={i}
                className="flex gap-3 px-3 py-2 justify-start hover:bg-gray-700  max-md:hover:rounded-full w-full items-center"
              >
                <nav.icon className="w-6 h-6" />
                <span className="max-md:hidden">{nav.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AuthButtons session={session} />
    </header>
  );
}

export default Headers;
