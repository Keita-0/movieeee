import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loginFlg } from "../store/movieSearchState";
import { sp } from "../utils/Media";
import "../Firebase/firebase";

const Login: NextPage = () => {
  const [isSignedIn, setIsSignedIn] = useRecoilState(loginFlg);
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/calendar.events");
  const auth = getAuth();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setIsSignedIn(true);
        router.push("/home");
      })
      .catch((error) => {
        alert("認証に失敗しました。");
      });
  };

  return (
    <Container>
      <Card>
        <Sh1>Welcome to Movieeee!!</Sh1>
        <h3>~新しい映画に出会いましょう~</h3>
        <SDiv onClick={signIn}>
          <SImg src="/icons8-googleのロゴ-48.png" alt="icon" />
          <p>Sign in with Google</p>
        </SDiv>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeeeee;
`;

const Card = styled.div`
  position: relative;
  width: 25%;
  height: 60%;
  padding: 4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5%;
  background-color: white;
  box-shadow: #ddd 0px 0px 4px 2px;
`;

const Sh1 = styled.h1`
  margin: 0;
`;

const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  /* width: 25vw; */
  border: 0.2rem solid #dddddd;
  padding: 5px 15px;
  margin: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  :hover {
    cursor: pointer;
    opacity: 80%;
  }
  ${sp`
        width:50vw;
    `}
`;

const SImg = styled.img`
  margin-right: 5px;
`;

export default Login;
