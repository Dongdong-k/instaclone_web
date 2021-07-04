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
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import * as React from "react";

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

type FormValues = {
  username: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmitValid = (data: any) => console.log(data);
  const onSubmitInvaild = (data: any) => console.log("Invalid", data);

  return (
    <AuthLayout>
      <PageTitle title="Log In" />
      <FormBox>
        <IconContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </IconContainer>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvaild)}>
          <Input
            {...register("username", { required: true, minLength: 5 })}
            type="text"
            placeholder="User Name"
          />
          <Input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
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
