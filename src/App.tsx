// import styled, { ThemeProvider } from "styled-components";
// import { ourTheme } from "./styles";
import { useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { darkModeVar, isLoggedInVar } from "./apollo";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkTheme, GlobalTheme, lightTheme, ourTheme } from "./styles";

// const Container = styled.div`
//   background-color: ${(prop) => prop.theme.bgColor};
//   color: ${(prop) => prop.theme.fontColor};
// `;

interface IContainerProp {
  floating: true;
}

const Container = styled.div<IContainerProp>`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.fontColor};
  box-shadow: ${(props) => props.theme.borderColor};
`;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalTheme />
      {/* <Container floating={true}> */}
      {/* 라우터 설정 */}
      <Router>
        {/* Switch : 하나의 라우터만 rendering */}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* exact : path가 완전히 동일할 경우에만 실행 */}
          <Route exact path="/">
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          {/* 없는 페이지 주소 입력시 아래와 같이 출력, 마지막에 입력하기 */}
          <Route>
            {/* 1안) 404 Not Found 페이지 연결하기 */}
            <NotFound />
            {/* 2안) 다른 페이지 주소로 연결하기 */}
            {/* <Redirect to="/" />  */}
          </Route>
        </Switch>
      </Router>
      {/* </Container> */}
    </ThemeProvider>
  );
}

export default App;
