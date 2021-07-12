import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import { FormError } from "../components/auth/FormError";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Seperator";
import PageTitle from "../components/PageTitle";
import { FatLink } from "../components/shared";
import routes from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount(
    $firstName: String!
    $lastName: String
    $userName: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      userName: $userName
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({ mode: "onChange" });

  const onCompleted = (data: any) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    history.push(routes.home);
  };

  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data: any) => {
    const { id, firstname, username, lastname, password } = getValues();
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        // ...data
        firstName: firstname,
        lastName: lastname,
        userName: username,
        email: id,
        password,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign Up to see photos and videos from your friends
          </Subtitle>
          <Button type="submit" value="Log in with your Facebook" />
        </HeaderContainer>
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("id", {
              required: "Phone or Email is required",
              minLength: {
                value: 10,
                message: "ID shold be longer than 10",
              },
            })}
            type="text"
            placeholder="Phone or Email"
            hasError={Boolean(errors?.id?.message)}
          />
          <FormError message={errors?.id?.message} />
          <Input
            {...register("firstname", {
              required: "First name is required",
              minLength: {
                value: 5,
                message: "First name should be longer than 5",
              },
            })}
            type="text"
            placeholder="First name"
            hasError={Boolean(errors?.firstname?.message)}
          />
          <Input
            {...register("lastname")}
            type="text"
            placeholder="Last name"
          />
          <FormError message={errors?.firstname?.message} />
          <Input
            {...register("username", {
              required: "User name is required",
              minLength: {
                value: 5,
                message: "User name should be longer than 5",
              },
            })}
            type="text"
            placeholder="User Name"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 10,
                message: "Password shold be longer than 10",
              },
            })}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "loading..." : "Sign Up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
};

export default SignUp;
