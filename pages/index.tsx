import type { NextPage } from "next";
import { useSession } from "next-auth/client";
import { useTheme } from "../features/hooks/useTheme";

const Home: NextPage = () => {
  const [session, loading] = useSession();

  const { toggleTheme } = useTheme();

  return <div onClick={toggleTheme}>click me</div>;
};

export default Home;
