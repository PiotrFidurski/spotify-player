import { Main } from "@components/Main";
import { Sidebar } from "@components/Sidebar";
import { TrackProvider } from "@components/TrackProvider/Provider";
import styles from "@styles/home.module.css";
import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import * as React from "react";

const Home: NextPage = () => {
  const [session, loading] = useSession();

  const router = useRouter();

  React.useEffect(() => {
    if (!loading && !session) router.push("/login");
  }, [router, session, loading]);

  if (!session) return null;

  return (
    <div className={styles.container}>
      <TrackProvider>
        <Sidebar />
        <Main />
      </TrackProvider>
    </div>
  );
};

export default Home;
