import {
  faFacebook,
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid rgb(219, 219, 219);
  width: 100%;
`;

// 스타일 상속받아 활용하기
const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    input {
      border: none;
      width: 100%;
      padding: 10px 5px;
      border-radius: 3px;
      background-color: #fafafa;
      border: 0.5px solid rgb(219, 219, 219);
      margin-top: 5px;
      box-sizing: border-box;
      &::placeholder {
        font-size: 12px;
      }
      &:last-child {
        margin-top: 12px;
        background-color: #0095f6;
        color: white;
        text-align: center;
        padding: 8px 0px;
        font-weight: 600;
      }
    }
  }
`;
const BottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    color: #0095f6;
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Serperator = styled.div`
  margin: 20px 0px 30px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin: 10px;
    font-weight: 600;
  }
`;

const Login = () => {
  return (
    <Container>
      <Wrapper>
        <TopBox>
          <div>
            <FontAwesomeIcon icon={faInstagram} size="3x" />
          </div>
          <form>
            <input type="text" placeholder="User Name" />
            <input type="password" placeholder="Password" />
            <input type="submit" value="Log In" />
          </form>
          <Serperator>
            <div></div>
            <span>Or</span>
            <div></div>
          </Serperator>
          <FacebookLogin>
            <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            <span>Log In with Facebook</span>
          </FacebookLogin>
        </TopBox>
        <BottomBox>
          <span>Don't have an account?</span>
          <a href="#">Sign Up</a>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default Login;
