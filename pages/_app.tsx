import "../styles/globals.css";
import type { AppProps } from "next/app";
import { DefaultLayout } from "../components/templetes/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { useAuth } from "../Firebase/authFunctions";
import { useRouter } from "next/router";

type Props = {
  children: JSX.Element;
};

const Auth = ({ children }: Props): JSX.Element => {
  const signInUser = useAuth();
  const router = useRouter();

  return router.pathname === "/" || signInUser.uid ? (
    children
  ) : (
    <p>サインインしてください...</p>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <DefaultLayout>
        <Toaster />
        <Component {...pageProps} />
      </DefaultLayout>
    </RecoilRoot>
  );
}

export default MyApp;
