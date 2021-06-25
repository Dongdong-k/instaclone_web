import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;
const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const Home = () => {
  return (
    <Container>
      <Title>Home</Title>
      <button onClick={() => darkModeVar(true)}>To Dark</button>
      <button onClick={() => darkModeVar(false)}>To Light</button>
    </Container>
  );
};

export default Home;
