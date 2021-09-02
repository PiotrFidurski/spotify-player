import { Main } from "@components/Main";
import { Sidebar } from "@components/Sidebar";
import styles from "@styles/home.module.css";
import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import * as React from "react";

const Home: NextPage = () => {
  const [activeSong, setActiveSong] = React.useState(null);

  const [session] = useSession();
  return (
    <div className={styles.container}>
      <Sidebar setActiveSong={setActiveSong} />
      <Main activeSong={activeSong} />
    </div>
  );
};

export default Home;
