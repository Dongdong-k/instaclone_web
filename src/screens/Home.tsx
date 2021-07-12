import styled from "styled-components";
import { darkModeVar, logUserOut } from "../apollo";
import PageTitle from "../components/PageTitle";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Home = () => {
  return (
    <div>
      <PageTitle title="Home" />
      <h1>Welcome, We did it!!</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
  );
};

export default Home;
