// import styled, { ThemeProvider } from "styled-components";
// import { ourTheme } from "./styles";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

// const Container = styled.div`
//   background-color: ${(prop) => prop.theme.bgColor};
//   color: ${(prop) => prop.theme.fontColor};
// `;

function App() {
  return (
    <div>
      {/* 라우터 설정 */}
      <Router>
        {/* Switch : 하나의 라우터만 rendering */}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* exact : path가 완전히 동일할 경우에만 실행 */}
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route exact path="/Potato">
            <h1>Potato</h1>
          </Route>
          <Route exact path="/Banana">
            <h1>Banana</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
