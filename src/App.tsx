import styled, { ThemeProvider } from "styled-components";
import { ourTheme } from "./styles";

const Container = styled.div`
  background-color: ${(prop) => prop.theme.bgColor};
  color: ${(prop) => prop.theme.fontColor};
`;

function App() {
  return (
    <ThemeProvider theme={ourTheme}>
      <Container>Empty</Container>
    </ThemeProvider>
  );
}

export default App;
