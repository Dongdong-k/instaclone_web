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
import { FEED_QUERY } from "../../screens/Home";

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

interface IPhoto {
  id: number;
  user: {
    userName: string;
    avatar?: string;
  };
  file?: string;
  isLiked: boolean;
  likes: number;
}

const Photo = ({ id, user, file, isLiked, likes }: IPhoto) => {
  const [toggleLikeMutation, { loading, data }] = useMutation(
    TOGGLE_LIKE_MUTATION,
    {
      variables: { id }, // mutation 필요로 하는 인자들 불러오기
      refetchQueries: [{ query: FEED_QUERY }], //Query refetch : query를 다시 실행하는 의미
    }
  );
  console.log(id);
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar url={user.avatar} lg={true} />
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
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
