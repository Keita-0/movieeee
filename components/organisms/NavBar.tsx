import { useState } from "react";
import { pc, sp, tab } from "../../utils/Media";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";
import { backfaceFixed } from "../../utils/backfaceFixed";
import { signOut } from "@firebase/auth";
import { auth } from "../../Firebase/firebase";
import toast from "react-hot-toast";

export const NavBar = () => {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);

  const isMenuOpen = () => {
    setMenuOpen(!menuOpen);
    backfaceFixed(true);
  };

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch(() => {
        toast.error("サインアウトに失敗しました。");
      });
  };

  return (
    <SContainer>
      <MenuButton onClick={isMenuOpen} isOpen={menuOpen}>
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>
      <Sdiv isOpen={menuOpen}>
        <ul>
          <li>
            <Link href="/home">
              <a
                onClick={() => {
                  setMenuOpen(false);
                  backfaceFixed(false);
                }}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/mypage">
              <a
                onClick={() => {
                  setMenuOpen(false);
                  backfaceFixed(false);
                }}
              >
                MyPage
              </a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a
                onClick={() => {
                  onClickSignOut();
                  backfaceFixed(false);
                }}
              >
                サインアウト
              </a>
            </Link>
          </li>
        </ul>
      </Sdiv>
    </SContainer>
  );
};

type CustomProps = {
  isOpen?: boolean;
};

const SContainer = styled.div`
  ${pc`
        display:none;
    `}
  ${tab`
        display:none;
    `}
  width:100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const MenuButton = styled.div<CustomProps>`
  z-index: 2;
  & span {
    position: absolute;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: black;
    border-radius: 4px;
    display: inline-block;
    transition: all 0.1s;
    box-sizing: border-box;
    z-index: 1;
  }
  :hover {
    cursor: pointer;
  }
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  width: 40px;
  height: 30px;
  background: none;
  border: none;
  appearance: none;
  margin-right: 10px;

  ${(props) =>
    props.isOpen
      ? css`
          & span:nth-of-type(1) {
            transform: translateY(13px) rotate(-45deg);
          }
          & span:nth-of-type(2) {
            opacity: 0;
          }
          span:nth-of-type(3) {
            transform: translateY(-13px) rotate(45deg);
          }
        `
      : css``}

  & span:nth-of-type(1) {
    top: 0;
  }
  & span:nth-of-type(2) {
    top: 13px;
  }
  & span:nth-of-type(3) {
    bottom: 0;
  }
`;

const Sdiv = styled.div<CustomProps>`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  opacity: 97%;
  background-color: #eeeeee;
  & ul {
    padding: 70px 10px;
  }

  & ul li {
    border-bottom: solid 1px #ffffff;
    list-style: none;
    padding: 10px 10px;
  }

  & ul li a {
    width: 100%;
    font-size: 20px;
    box-sizing: border-box;
    color: black;
    text-decoration: none;
    padding: 9px 15px 10px 0;
    position: relative;
  }
  ${(props) =>
    props.isOpen
      ? css``
      : css`
          visibility: hidden;
        `}
`;
