import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { AdminProvider } from "./contexts/AdminContext";
import { routeTree } from "./routeTree";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <AdminProvider>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" />
    </AdminProvider>
  );
}
