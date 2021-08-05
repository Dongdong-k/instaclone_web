import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

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
  photoId: number;
  author: string;
  caption: string | null;
  commentNumber: number;
  comments: (seeFeed_seeFeed_comments | null)[];
}

const Comments = ({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: seeFeedComments) => {
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION
  );

  const { register, handleSubmit, setValue } = useForm();
  const onValid = (data: any) => {
    // form 입력된 값을 data argu로 가져올 수 있음
    console.log(data);
    const { payload } = data;
    // loading
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
    setValue("payload", "");
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption === null ? null : caption} />
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
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload", {
              required: "comment is required",
            })}
            type="text"
            placeholder="Please write a comment... "
          />
        </form>
      </div>
    </CommentsContainer>
  );
};

export default Comments;
