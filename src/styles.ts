import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const ourTheme: DefaultTheme = {
  bgColor: "Blue",
  fontColor: "White",
  borderColor: "red",
};

export const darkTheme: DefaultTheme = {
  bgColor: "gray",
  fontColor: "White",
  borderColor: "black",
};
export const lightTheme: DefaultTheme = {
  bgColor: "lightgreen",
  fontColor: "black",
  borderColor: "black",
};

export const GlobalTheme = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  input{
    all:unset
  }
  body{
    /* Theme 내부에 위치시 theme - props 이용 가능 */
     background-color: #FAFAFA;
     font-size: 14px;
     font-family: 'Roboto Mono', monospace;
   }
   a {
    text-decoration: none;
   }
`;
