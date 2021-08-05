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
import Comments from "./Comments";

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
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const photoId = `Photo:${id}`;
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: any) {
            return !prev;
          },
          likes(prev: any) {
            return isLiked ? prev - 1 : prev + 1;
          },
        },
      });
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
        <Comments
          photoId={id}
          author={user.userName}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
