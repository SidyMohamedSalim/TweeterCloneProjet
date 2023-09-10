// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Providers from "./Providers";
import Headers from "./header";
import { getServerSession } from "next-auth/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const title = "Next.js Prisma Postgres Auth Starter";
const description =
  "This is a Next.js starter kit that uses Next-Auth for simple email + password login and a Postgres database to persist the data.";

export const metadata: Metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
  themeColor: "black",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Providers>
          <Toaster />
          <Suspense fallback="Loading...">
            <div className="grid grid-cols-10  max-w-6xl mx-auto text-white">
              <Headers session={session} />
              <div
                data-te-perfect-scrollbar-init
                data-te-suppress-scroll-x="true"
                className="px-6 col-span-7 max-w-lg min-w-[24rem]  overflow-y-scroll h-screen  "
              >
                {children}
              </div>
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
