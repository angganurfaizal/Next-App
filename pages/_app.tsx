import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { UserProvider } from "@/contexts/userContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DefaultLayout from "../layouts/Default";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <UserProvider>
        <DefaultLayout>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />

            <Component {...pageProps} />

            <Toaster position="top-right" />
          </QueryClientProvider>
        </DefaultLayout>
      </UserProvider>
    </>
  );
};

export default App;
