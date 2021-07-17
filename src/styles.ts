import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const darkTheme: DefaultTheme = {
  bgColor: "gray",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "black",
  accent: "#0095f6",
};
export const lightTheme: DefaultTheme = {
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  accent: "#0095f6",
  borderColor: "rgb(219,219,219)",
};

export const GlobalTheme = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;
  }
  input{
    all:unset /*all property delete*/
  }
  body{
    /* Theme 내부에 위치시 theme - props 이용 가능 */
     background-color: ${(props) => props.theme.bgColor};
     font-size: 14px;
     font-family: 'Open Sans', sans-serif;
     color: ${(props) => props.theme.fontColor};
   }
   a {
    text-decoration: none; /* link underline delete */
   }
`;
