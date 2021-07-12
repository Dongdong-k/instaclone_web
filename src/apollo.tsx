import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar(false);
export const darkModeVar = makeVar(false);

// 백엔드와 프런트엔드 연결하기
export const client = new ApolloClient({
  // uri : GraphQl application 위치 알려주는 기능
  uri: "http://localhost:4000/graphql/",
  // Cache : Apollo에서 가져온 정보를 기억
  cache: new InMemoryCache(),
});
