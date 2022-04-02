import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const TOKEN = "TOKEN";
const DARK_MODE = "DARK_MODE";

// 새로고침시 로그아웃 되는것을 방지하기 위해 디폴드 값을 token 유무에 따라 결정되도록 설정
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// 로그인시 토큰 저장하기
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token); // locatstorage에 토큰 저장
  isLoggedInVar(true); // 로그인 상태로 변경
};

// 로그아웃시 토큰 삭제하기
export const logUserOut = (history?: any) => {
  localStorage.removeItem(TOKEN); // locatstorage에 토큰 삭제
  // isLoggedInVar(false); // 로그아웃 상태로 변경 & 로그아웃시 state 살아 있음
  window.location.reload(); // 홈페이지 새로고침
  history?.replace(); // history.location.state 초기화
};

// Sign Up 버튼 클릭시, 서버 creatAccount_error 내역 삭제
export const DeleteCreateAccountError = () => {
  localStorage.removeItem("createAccount_error");
  console.log("createAccount error delete");
};

// client 연결 링크 생성하기
const httpLink = createHttpLink({
  // uri : GraphQl application 위치 알려주는 기능
  // Front End 배포시 NODE_ENV 활용
  uri:
    process.env.NODE_ENV === "production"
      ? "https://instaclone-backend-dongdong.herokuapp.com/graphql"
      : "http://localhost:4000/graphql/",
});

// authLink 생성 - token 값 받아서 header에 추가
const authLink = setContext((_, { headers }) => {
  console.log("excute authLink");
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN), // 백엔드에 설정된 token
    },
  };
});

/////////////////////////////////////////////////////////////////////////

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE))); // 새로고침시에도 값 존재시 다크모드 유지

//다크모드 설정
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "enabled");
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};

// 프런트엔드에 백엔드 값(token) 연결하기
export const client = new ApolloClient({
  // Cache : Apollo에서 가져온 정보를 기억
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        // cache에 표시되는 형식 - Apollo studio 에서 확인가능
        keyFields: (obj) => `User:${obj.userName}`,
      },
    },
  }),
});
