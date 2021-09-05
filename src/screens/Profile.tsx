import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { seeProfileVariables } from "../__generated__/seeProfile";
import { PHOTO_FRAGMENT } from "./Fragments";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($userName: String!) {
    seeProfile(userName: $userName) {
      id
      firstName
      lastName
      userName
      bio
      avatar
      photos(page: 1) {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  #import Fragment
  ${PHOTO_FRAGMENT}
`;

const Profile = () => {
  const { userName } = useParams<seeProfileVariables>();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      userName,
    },
  });
  console.log("data", data);
  return <h1>Profile</h1>;
};

export default Profile;
