import { gql, useQuery } from "@apollo/client";
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
    }
  }
`;

const PhotoContainer = styled.div`
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
`;
const PhotoHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;

const Username = styled(FatText)`
  margin-left: 10px;
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
            <Avatar url={photo.user.avatar} />
            <Username>{photo.user.userName}</Username>
          </PhotoHeader>
        </PhotoContainer>
      ))}
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
