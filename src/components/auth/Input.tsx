import styled from "styled-components";

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 10px 5px;
  border-radius: 3px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
    color: black;
  }
`;

export default Input;
