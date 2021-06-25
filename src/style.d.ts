import "styled-components";

declare module "styled-components" {
  // DefaultTheme - styled components에서 지원하는 인터페이스
  export interface DefaultTheme {
    bgColor: string;
    fontColor: string;
    borderColor: string;
  }
}
