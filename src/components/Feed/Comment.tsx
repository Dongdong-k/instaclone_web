import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../shared";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

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
  id?: number;
  isMine?: boolean;
  photoId?: number;
}

const Comment = ({
  id,
  author,
  payload,
  isMine,
  photoId,
}: CommentInterface) => {
  const updateDeleteComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          commentNumber(prev: any) {
            return prev - 1;
          },
        },
      });
    }
  };

  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id },
    update: updateDeleteComment,
  });

  const onDeleteClick = () => {
    deleteCommentMutation();
  };

  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
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
      {isMine ? <button onClick={onDeleteClick}>❌</button> : null}
    </CommentContainer>
  );
};

export default Comment;
