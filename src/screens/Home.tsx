import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import Photo from "../components/Feed/Photo";
import PageTitle from "../components/PageTitle";
import { seeFeed } from "../__generated__/seeFeed";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "./Fragments";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        userName
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  console.log("Photo data: ", data);
  const history = useHistory(); // SignUp 에서 전달받은 history.locaiton.state 초기화를 위해 설정
  // button click 시 logUserOut() 실행할때 history.replace 실행을 위해 argu 로 전달
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo: any) => (
        <Photo key={photo.id} {...photo} />
      ))}
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
