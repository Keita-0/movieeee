import styled from "styled-components";
import { Footer } from "../Layout/Footer";
import { Header } from "../Layout/Header";

type Props = {
  children?: React.ReactNode;
};

export const DefaultLayout = (props: Props) => {
  const { children } = props;
  return (
    <SDiv>
      <Header />
      {children}
      <Footer />
    </SDiv>
  );
};

const SDiv = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;
