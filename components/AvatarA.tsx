import React from "react";
import { User2 } from "lucide-react";
import Link from "next/link";

const AvatarA = ({
  name,
  email,
  isLink = false,
}: {
  email?: string;
  name?: string;
  isLink?: boolean;
}) => {
  return isLink ? (
    <Link
      href={`/profile/${email}`}
      className="flex gap-2 justify-start items-start"
    >
      {" "}
      <div className=" bg-gray-600 w-10 h-10 rounded-lg flex items-center justify-center">
        <User2 size={20} />
      </div>
      <div>
        <h1 className="font-extrabold">{name}</h1>
        <p>{email}</p>
      </div>
    </Link>
  ) : (
    <div className="flex gap-2 justify-start items-start mb-2">
      <div className=" bg-gray-600 w-10 h-10 rounded-lg flex items-center justify-center">
        <User2 size={20} />
      </div>
      <div>
        <h1 className="font-extrabold">{name}</h1>
        <p className="text-gray-500 text-sm ">{email}</p>
      </div>
    </div>
  );
};

export default AvatarA;
