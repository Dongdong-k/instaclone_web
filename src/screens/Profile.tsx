import { useParams } from "react-router-dom";

const Profile = () => {
  const params = useParams();
  console.log("Params ; ", params);
  return <h1>Profile</h1>;
};

export default Profile;
