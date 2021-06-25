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
  body{
     background-color: ${(props) => props.theme.bgColor};
   }
`;
