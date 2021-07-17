import { useHistory } from "react-router-dom";
import { logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";

const Home = () => {
  const history = useHistory(); // SignUp 에서 전달받은 history.locaiton.state 초기화를 위해 설정
  // button click 시 logUserOut() 실행할때 history.replace 실행을 위해 argu 로 전달
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
