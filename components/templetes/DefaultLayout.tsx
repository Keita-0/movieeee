import { Header } from '../atoms/layout/Header';
import styled from 'styled-components';
import { Footer } from '../atoms/layout/Footer';

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
