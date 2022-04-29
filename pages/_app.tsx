import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { DefaultLayout } from "../components/templetes/DefaultLayout";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      {/* <DefaultLayout> */}
      <Toaster />
      <Component {...pageProps} />
      {/* </DefaultLayout> */}
    </RecoilRoot>
  );
}

export default MyApp;
