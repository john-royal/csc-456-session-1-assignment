import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

import Navbar from "./navbar";
import { Toaster } from "./ui/sonner";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
