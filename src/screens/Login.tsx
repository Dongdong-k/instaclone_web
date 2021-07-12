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
import { useForm } from "react-hook-form";
import * as React from "react";
import { FormError } from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";

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

const LOGIN_MUTATION = gql`
  # mutation '이름' (argu)
  # 여기서 적는 '이름'은  백엔드와 달라도 무관
  # argu 검증을 위해 원하는 백엔드의 resolver의 argu를 확인하고 똑같이 넣어주기
  mutation login($username: String!, $password: String!) {
    # 여기에 적는 이름과 argu명은 graphql에서 정의한 것과 동일하게 입력 필요
    login(userName: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
  } = useForm({ mode: "onChange" });

  // mutation 결과값
  // function 이지만 동시에 argu로 데이터 제공해줌
  const onCompleted = (data: any) => {
    console.log("onCompleted data : ", data);
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      setError("result", {
        message: error,
      });
    }
  };
  // 첫번째 요소 : Mutation 활성화 시키는 function
  // 두번째 요소 : loading, data, called 등
  const [loginTrigger, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data: any) => {
    // 로딩중인 경우에는 실행하지 않음
    if (loading) {
      return;
    }
    // input 데이터 값 가져오기 & mutation 연결하기
    const { username, password } = getValues();
    loginTrigger({
      variables: { username, password },
    });
  };
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
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5",
              },
            })}
            type="text"
            placeholder="User Name"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log In"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
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
