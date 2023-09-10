import React from "react";
import Link from "next/link";
import { User2 } from "lucide-react";

const AvatarUser = ({ email }: { email: string }) => {
  return (
    <Link
      href={`/profile/${email}`}
      className=" bg-gray-600 w-14 h-12 rounded-full flex items-center justify-center"
    >
      <User2 size={25} />
    </Link>
  );
};

export default AvatarUser;
