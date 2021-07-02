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
     background-color: #FAFAFA;
     font-size: 14px;
     font-family: 'Open Sans', sans-serif;
     color: rgb(38, 38, 38);
   }
   a {
    text-decoration: none; /* link underline delete */
   }
`;
