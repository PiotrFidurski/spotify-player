import { Main } from "@components/Main";
import { Sidebar } from "@components/Sidebar";
import { TrackProvider } from "@components/TrackProvider/Provider";
import styles from "@styles/HomePage.module.css";
import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import * as React from "react";

const HomePage: NextPage = () => {
  const [session, loading] = useSession();

  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !session) router.push("/login");
  }, [router, session, loading]);

  if (!session) return null;

  return (
    <div className={styles.container}>
      <Head>
        <title>Play any Spotify song!</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Search for a song and play it!"
          key="description"
        />
      </Head>
      <TrackProvider>
        <>
          <Sidebar />
          <Main />
        </>
      </TrackProvider>
    </div>
  );
};

export default HomePage;
