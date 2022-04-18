import { useCallback, useEffect } from "react";
// import { useHistory, useLocation } from "react-router";
// import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
// import { sp, tab } from "../../../Media";
// import { loginFlg, searchFlg } from "../../../store/movieSearchState";
import { NavBar } from "../../organisms/NavBar";
import "../../../firebase";
import { getAuth, signOut } from "firebase/auth";
import { Search } from "../../molecules/Search";

type Props = {
  active: boolean;
  onClick: () => void;
};

export const Header = () => {
  // const history = useHistory();
  // const location = useLocation();
  // let homeAvtive = false;
  // let myPageAvtive = false;

  // if (location.pathname === '/home') {
  //   homeAvtive = true;
  // } else if (location.pathname === '/home/mypage') {
  //   myPageAvtive = true;
  // }

  // const [isSignedIn, setIsSignedIn] = useRecoilState(loginFlg);
  // const onClickHome = useCallback(() => {
  //   history.push('/home');
  // }, []);
  // const onClickWriting = useCallback(() => history.push('/home/mypage'), []);

  // const auth = getAuth();
  // const onClickSignOut = () => {
  //   signOut(auth)
  //     .then(() => {
  //       setIsSignedIn(false);
  //       history.push('/');
  //     })
  //     .catch((error) => {
  //       console.log('Sign-out error.');
  //     });
  // };

  return (
    <SHeader>
      <STitile>Moiveeee</STitile>
      <SContainer>
        <SLink>Home</SLink>
        <SLink>MyPage</SLink>
      </SContainer>
      <UserContainer>
        <Search />
        <SingOut>サインアウト</SingOut>
      </UserContainer>

      <NavBar />
    </SHeader>
  );
};

const SHeader = styled.nav`
  display: flex;
  background-color: #eeeeee;
  width: 100%;
  height: 8vh;
  align-items: center;
  font-weight: bold;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 5vw;
  width: 50%;
`;

const STitile = styled.div`
  font-size: 30px;
  margin-left: 4vw;
`;

// const SLink = styled.div<Props>`
//   margin: 25px;
//   :hover {
//     cursor: pointer;
//     color: #0066ff;
//   }

//   ${(props) =>
//     props.active
//       ? css`
//           color: #0066ff;
//           border-bottom: 2px solid #0066ff;
//         `
//       : css``};
//   ${sp`
//         display:none;
//     `}
// `;

const SLink = styled.div`
  margin: 25px;
  :hover {
    cursor: pointer;
    color: #0066ff;
  }
`;

const UserContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
  margin-right: 1rem;
  align-items: center;
`;

const SingOut = styled.div`
  margin: 25px;
  :hover {
    cursor: pointer;
    color: #0066ff;
  }
`;
