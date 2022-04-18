import styled, { keyframes } from 'styled-components';

export const Loading = () => {
  return (
    <SBody>
      <SDiv />
    </SBody>
  );
};

const fadeIn = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
}
`;

const SBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const SDiv = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 150px;
  border: 15px solid #4444;
  border-top-color: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -80px;
  margin-left: -80px;
  animation: loading 1.2s linear infinite;
  -webkit-animation: loading 1.2s linear infinite;

  animation: ${fadeIn} 0.75s infinite linear;
`;
