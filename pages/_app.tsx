import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import * as React from "react";
import { useTheme } from "../features/hooks/useTheme";
import "../styles/globals.css";
import styles from "../styles/_app.module.css";

function MyApp({ Component, pageProps }: AppProps) {
  const {} = useTheme();

  return (
    <Provider session={pageProps.session}>
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
export default MyApp;
