import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "./routes";
import "./index.css";

async function enableMocking() {
  // MSW desactivado - usando servidor real en localhost:3000
  if (import.meta.env.DEV) {
    // const { worker } = await import("./mocks/browser");
    // return worker.start({
    //   onUnhandledRequest: "bypass",
    // });
    return Promise.resolve();
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </BrowserRouter>,
  );
});
