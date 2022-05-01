import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { PageButton } from "../../components/atoms/button/PageButton";

type Props = {
  isSearch: boolean;
  selectKey: string;
  pageNumber: number;
  total_pages: number;
  isFirstPage: boolean;
  isMaxPage: boolean;
};

// eslint-disable-next-line react/display-name
export const PageNation = React.memo((props: Props) => {
  const {
    isSearch,
    selectKey,
    pageNumber,
    total_pages,
    isFirstPage,
    isMaxPage,
  } = props;
  const router = useRouter();

  //preボタン押下時の処理
  const onClickBack = () => {
    isSearch
      ? router.push(
          `/home/movielist/search=${selectKey}&page=${pageNumber - 1}`
        )
      : router.push(`/home/movielist/${selectKey}&page=${pageNumber - 1}`);
  };

  //Nextボタン押下時の処理
  const onClickNext = () => {
    isSearch
      ? router.push(
          `/home/movielist/search=${selectKey}&page=${pageNumber + 1}`
        )
      : router.push(`/home/movielist/${selectKey}&page=${pageNumber + 1}`);
  };

  return (
    <Container>
      <PageNumberArea>
        {pageNumber}/{total_pages}
      </PageNumberArea>
      <ButtonArea>
        {isFirstPage ? null : (
          <PageButton onClick={onClickBack}>Pre</PageButton>
        )}
        {isMaxPage ? null : <PageButton onClick={onClickNext}>Next</PageButton>}
      </ButtonArea>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageNumberArea = styled.div`
  margin: 20px;
  color: #444444;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
