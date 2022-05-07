import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import "../Firebase/firebase";
import toast from "react-hot-toast";
import { auth } from "../Firebase/firebase";

const Login: NextPage = () => {
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  const signIn = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/home");
      })
      .catch((error) => {
        toast.error("ログインに失敗しました。");
      });
  };

  return (
    <Container>
      <Card>
        <Sh1>Welcome to Movieeee!!</Sh1>
        <Sp>~新しい映画に出会いましょう~</Sp>
        <SDiv onClick={signIn}>
          <SImg src="/icons8-googleのロゴ-48.png" alt="icon" />
          <Sp>Sign in with Google</Sp>
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
  z-index: 10;
`;

const Card = styled.div`
  position: relative;
  width: 30vw;
  height: 60%;
  padding: 4%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  box-shadow: #ddd 0px 0px 4px 2px;

  @media (max-width: 560px) {
    width: 80vw;
    height: 60%;
    padding: 8%;
  }
`;

const Sh1 = styled.h1`
  margin: 0;
  font-size: 2rem;
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
  @media (max-width: 560px) {
    width: 50vw;
    height: 60%;
    padding: 8%;
  }
`;

const Sp = styled.p`
  font-size: 1rem;
`;

const SImg = styled.img`
  margin-right: 5px;
`;

export default Login;
