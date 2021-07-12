import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

// 새로고침시 로그아웃 되는것을 방지하기 위해 디폴드 값을 token 유무에 따라 결정되도록 설정
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

// 로그인시 토큰 저장하기
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token); // locatstorage에 토큰 저장
  isLoggedInVar(true); // 로그인 상태로 변경
};

// 로그아웃시 토큰 삭제하기
export const logUserOut = () => {
  localStorage.removeItem(TOKEN); // locatstorage에 토큰 삭제
  isLoggedInVar(false); // 로그아웃 상태로 변경
};

export const darkModeVar = makeVar(false);

// 백엔드와 프런트엔드 연결하기
export const client = new ApolloClient({
  // uri : GraphQl application 위치 알려주는 기능
  uri: "http://localhost:4000/graphql/",
  // Cache : Apollo에서 가져온 정보를 기억
  cache: new InMemoryCache(),
});
