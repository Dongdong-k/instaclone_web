import { gql, useQuery } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        userName
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
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
`;

const Likes = styled(FatText)`
  display: block;
  margin-top: 15px;
`;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  const history = useHistory(); // SignUp 에서 전달받은 history.locaiton.state 초기화를 위해 설정
  // button click 시 logUserOut() 실행할때 history.replace 실행을 위해 argu 로 전달
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: any) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} lg={true} />
            <Username>{photo.user.userName}</Username>
          </PhotoHeader>
          <PhotoImage src={photo.file} />
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <FontAwesomeIcon
                    style={{ color: photo.isLiked ? "red" : "inherit" }}
                    icon={photo.isLiked ? SolidHeart : faHeart}
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
            <Likes>
              {photo.likes === 1 ? "1 like" : `${photo.likes} likes`}
            </Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
