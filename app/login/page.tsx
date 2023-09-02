import Image from "next/image";
import Form from "@/components/form";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 transition-all shadow-xl">
        <Link href="/" className="absolute top-6 left-6">
          <MoveLeft
            className="font-extrabold hover:scale-150"
            color={"black"}
          />
        </Link>
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <Link href="/">
            <Image
              src="/logo.png"
              priority
              alt="Logo"
              className="h-10 w-10 rounded-full"
              width={20}
              height={20}
            />
          </Link>
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form type="login" />
      </div>
    </div>
  );
}
