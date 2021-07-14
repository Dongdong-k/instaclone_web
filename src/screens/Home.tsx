import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";

const Home = () => {
  const history = useHistory();
  console.log("Home history", history);
  return (
    <div>
      <PageTitle title="Home" />
      <h1>Welcome, We did it!!</h1>
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
