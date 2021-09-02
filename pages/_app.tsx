import styles from "@styles/_app.module.css";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTheme } from "../features/hooks/useTheme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  const {} = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider session={pageProps.session}>
        <div className={styles.container}>
          <Component {...pageProps} />
        </div>
      </Provider>
    </QueryClientProvider>
  );
}
export default MyApp;
