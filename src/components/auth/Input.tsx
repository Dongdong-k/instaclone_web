import styled from "styled-components";

// tag 내 임의의 props 설정시 타입 설정 필요
interface IForm {
  hasError?: boolean;
}

const Input = styled.input<IForm>`
  width: 100%;
  padding: 10px 5px;
  border-radius: 3px;
  background-color: #fafafa;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;
