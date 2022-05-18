import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultLayout } from "../components/templetes/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { useAuth } from "../Firebase/authFunctions";
import { useRouter } from "next/router";
import { Loading } from "../components/atoms/Loading";

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
  const result = useAuth();
  const router = useRouter();

  if (router.pathname !== "/" && result.isLoading) {
    return <Loading />;
  }

  return router.pathname === "/" || result.signInUser.uid ? (
    children
  ) : (
    <p>サインインしてください..</p>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DefaultLayout>
        <Toaster />
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </DefaultLayout>
    </RecoilRoot>
  );
}

export default MyApp;
