import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Seperator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { Helmet } from "react-helmet";

// 스타일 상속받아 활용하기

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin: 10px;
    font-weight: 600;
  }
`;

const IconContainer = styled.div`
  margin-bottom: 20px;
`;

const Login = () => {
  return (
    <AuthLayout>
      <PageTitle title="Log In" />
      <FormBox>
        <IconContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </IconContainer>
        <form>
          <Input type="text" placeholder="User Name" />
          <Input type="password" placeholder="Password" />
          <Button type="submit" value="Log In" />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
          <span>Log In with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  );
};

export default Login;
