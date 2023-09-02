"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({});
  return (
    <div className="bg-black selection:bg-sky-900 ">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
      </QueryClientProvider>
    </div>
  );
};

export default Providers;
