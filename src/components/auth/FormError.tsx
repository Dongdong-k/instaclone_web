import styled from "styled-components";

const SFormError = styled.span`
  margin: 5px 0px 1px 0px;
  color: tomato;
  font-size: 12px;
  font-weight: 600;
`;

export const FormError = ({ message }: any) => {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
};
