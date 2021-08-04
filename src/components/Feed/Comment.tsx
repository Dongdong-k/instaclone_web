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
  mark {
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
  const cleanedPayload = payload
    ? sanitizeHtml(payload?.replace(/#[\w]+/g, "<mark>$&</mark>"), {
        allowedTags: ["mark"],
      })
    : undefined;
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      {/* <CommentCaption>{payload ? payload : null}</CommentCaption> */}
      <CommentCaption
        dangerouslySetInnerHTML={
          cleanedPayload ? { __html: cleanedPayload } : undefined
        }
      />
    </CommentContainer>
  );
};

export default Comment;
