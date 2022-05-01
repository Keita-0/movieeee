import { memo, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

// eslint-disable-next-line react/display-name
export const Search = memo(() => {
  const [keyWord, setKeyWord] = useState("");
  const router = useRouter();

  const onChangeKeyWord = (e: any) => {
    setKeyWord(e.target.value);
  };

  const checkKeyWord = (keyWord: string) => {
    if (keyWord.trim() === "") {
      toast.error("キーワードを入力してください");
      return false;
    }
    return true;
  };

  const onClickSearch = () => {
    if (checkKeyWord(keyWord)) {
      router.push({
        pathname: `/home/movielist/search=${keyWord}&page=1`,
        query: {
          key: 1,
        },
      });
    }
    setKeyWord("");
  };

  const hoge = (e: any) => {
    return e.preventDefault();
  };

  return (
    <>
      <SFrom method="GET" onSubmit={hoge}>
        <InputText
          type="text"
          placeholder="映画を検索"
          value={keyWord}
          onChange={onChangeKeyWord}
        />
        <InputSubmit type="submit" onClick={onClickSearch}>
          <Icon
            src="
          /検索アイコン1.png"
          />
        </InputSubmit>
      </SFrom>
    </>
  );
});

const SFrom = styled.form`
  position: relative;
  box-sizing: border-box;
  border-bottom: 2px solid #999999;
  display: flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 3px;
  height: 2.3em;
  width: 20vw;
  overflow: hidden;
`;
const InputText = styled.input`
  border: none;
  background: rgba(0, 0, 0, 0);
  width: 100%;
  height: 2em;
  :focus {
    outline: 0;
  }
`;
const InputSubmit = styled.button`
  cursor: pointer;
  border: none;
  margin-right: 0;
  padding-right: 0;
`;

const Icon = styled.img`
  height: 2vh;
`;
