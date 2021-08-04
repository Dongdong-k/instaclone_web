import React from "react";
import { Link } from "react-router-dom";
import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface CommentInterface {
  author: string;
  payload: string | null;
}

const Comment = ({ author, payload }: CommentInterface) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      {/* <CommentCaption>{payload ? payload : null}</CommentCaption> */}
      <CommentCaption>
        {payload?.split(" ").map((word, index) =>
          /#[\w]/.test(word) ? (
            // key 를 넣어줘야하는데, <> 같은 경우는 key가 없음 => React.Fragment 활용
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
