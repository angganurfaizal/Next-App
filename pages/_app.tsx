import { AppProps } from "next/app";
import "../styles/globals.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DefaultLayout from "../layouts/Default";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <DefaultLayout>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Component {...pageProps} />
        </QueryClientProvider>
      </DefaultLayout>
    </>
  );
};

export default App;
