import type { GetServerSideProps } from "next";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/client";
import { Button } from "../components/Button";
import styles from "../styles/login.module.css";

interface Props {
  providers: Record<string, ClientSafeProvider>;
}

const LoginPage: React.FC<Props> = ({ providers }) => {
  return (
    <div className={styles.container}>
      {Object.values(providers).map((provider) => (
        <Provider key={provider.id} provider={provider} />
      ))}
    </div>
  );
};

const Provider: React.FC<{ provider: ClientSafeProvider }> = ({ provider }) => {
  return (
    <div>
      <Button
        style={{ fontWeight: 900 }}
        onClick={() => signIn(provider.id, { callbackUrl: "/" })}
      >
        Continue with {provider.name}
      </Button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const providers = await getProviders();
  return { props: { providers } };
};

export default LoginPage;
