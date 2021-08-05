import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { seeFeed_seeFeed_comments } from "../../__generated__/seeFeed";
import useUser from "../hooks/useUser";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
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

const PostCommentContainer = styled.div`
  margin-top: 10px;
  padding-top: 15px;
  padding-bottom: 10px;
  border-top: 1px solid ${(props) => props.theme.borderColor};
`;

const PostCommentInput = styled.input`
  width: 100%;
  &::placeholder {
    font-size: 12px;
  }
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
  // useUser - commentupdate를 위해 user 데이터 가져오기
  const { data: userData } = useUser();

  // createComment Mutation 이후 update Function
  const createCommentUpdates = (cache: any, result: any) => {
    // payload 값 받아오기
    const { payload } = getValues();
    // comment 입력 후 입력창 값 초기화
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData.me) {
      // fake Comment 생성하기
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "", //number => string
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      // cache 상에 newCacheComment 생성하기
      const newCacheComment = cache.writeFragment({
        fragment: gql`
          fragment BSName on Comment {
            id
            createdAt
            isMine
            payload
            user {
              userName
              avatar
            }
          }
        `,
        data: newComment,
      });
      cache.modify({
        id: `Photo:${photoId}`,
        fields: {
          comments(prev: any) {
            // 이전 comment에 newCacheComment 붙이기
            return [...prev, newCacheComment];
          },
          commentNumber(prev: any) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    { update: createCommentUpdates }
  );

  const { register, handleSubmit, setValue, getValues } = useForm();
  // handleSubmit 경우 createComment 실행함수
  const onValid = (data: any) => {
    // form 입력된 값을 data argu로 가져오기
    // console.log(data);
    const { payload } = data;
    // loading 경우 변동없음
    if (loading) {
      return;
    }
    // loading 아닌 경우 createCommentMutation 실행
    createCommentMutation({
      variables: {
        photoId,
        payload,
      },
    });
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
      <PostCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <PostCommentInput
            {...register("payload", {
              required: "comment is required",
            })}
            type="text"
            placeholder="Please write a comment... "
          />
        </form>
      </PostCommentContainer>
    </CommentsContainer>
  );
};

export default Comments;
