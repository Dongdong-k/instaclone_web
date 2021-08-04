import styled from "styled-components";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PhotoContainer = styled.div`
  background-color: white;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  max-width: 615px;
`;
const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoImage = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    font-size: 20px;
  }
  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

const Comments = styled.div`
  margin-top: 20px;
`;
const Comment = styled.div`
  margin-top: 5px;
  display: flex;
  align-items: center;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
`;

const CommentCount = styled.span`
  opacity: 0.6;
  margin: 10px 0 10px 0;
  display: block; // margin top 적용시 반응 없음 => block 형태로 바꿔주기
  font-size: 10px;
  font-weight: 600;
`;

const CommentContainer = styled.div`
  margin-left: 5px;
`;

const Photo = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}: seeFeed_seeFeed) => {
  // cache update를 위한 변수 생성
  console.log(comments);
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Photo:${id}`;
      const fragment = gql`
        fragment BullShitName on Photo {
          isLiked
          likes
        }
      `;
      // prop 값을 받을 수 없는 경우 - cache read 활용
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      if ("isLiked" in result && "likes" in result) {
        const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isLiked: !cacheIsLiked, //Feed data와 반대로 변경되므로
            likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1, //isLiked 값에 따라 likes 1씩 증감하기
          },
        });
      }
      // prop 값을 받을 수 있는 경우
      // cache.writeFragment({
      //   id: fragmentId,
      //   fragment,
      //   data: {
      //     isLiked: !isLiked, //Feed data와 반대로 변경되므로
      //     likes: isLiked ? likes - 1 : likes + 1, //isLiked 값에 따라 likes 1씩 증감하기
      //   },
      // });
    }
  };
  const [toggleLikeMutation, { loading, data }] = useMutation(
    TOGGLE_LIKE_MUTATION,
    {
      variables: { id }, // mutation 필요로 하는 인자들 불러오기
      update: updateToggleLike,
    }
  );
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar url={user?.avatar === null ? "" : user.avatar} lg={true} />
        <Username>{user.userName}</Username>
      </PhotoHeader>
      <PhotoImage src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "red" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments>
          <Comment>
            <FatText>{user.userName}</FatText>
            <CommentCaption>{caption}</CommentCaption>
          </Comment>
          <CommentCount>
            {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
          </CommentCount>
          {comments?.map((comment: any) => (
            <Comment key={comment.id}>
              <Avatar url={comment.user.avatar} />
              <CommentContainer>
                <FatText>{comment.user.userName}</FatText>
                <CommentCaption>{comment.payload}</CommentCaption>
              </CommentContainer>
            </Comment>
          ))}
        </Comments>
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
