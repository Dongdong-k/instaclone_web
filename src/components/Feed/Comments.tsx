import styled from "styled-components";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import Comment from "./Comment";

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.6;
  margin: 10px 0 10px 0;
  display: block; // margin top 적용시 반응 없음 => block 형태로 바꿔주기
  font-size: 10px;
  font-weight: 600;
`;

interface seeFeedComments {
  author: string;
  caption: string | null;
  commentNumber: number;
  comments: (seeFeed_seeFeed_comments | null)[];
}

const Comments = ({
  author,
  caption,
  commentNumber,
  comments,
}: seeFeedComments) => {
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment: any) => (
        <Comment
          key={comment.id}
          author={comment?.user?.userName}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
};

export default Comments;
