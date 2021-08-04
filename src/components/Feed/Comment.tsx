import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

interface CommentInterface {
  author: string;
  payload: string | null;
}

const Comment = ({ author, payload }: CommentInterface) => {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>{payload ? payload : null}</CommentCaption>
    </CommentContainer>
  );
};

export default Comment;
