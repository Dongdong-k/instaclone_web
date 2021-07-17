import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../../apollo";

const ME_QUERY = gql`
  query Me {
    me {
      userName
      avatar
    }
  }
`;

const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasToken, // 로그인이 되어있지 않는 경우 실행하지 않음
  });
  console.log("my profile data : ", data, error);

  // data 출력시 data = null, 백엔드에서 값을 가져오지 못하는 상황 (client에서 활용하지 못하는 상황)
  // 백엔드에서 token 유효하지 않는 경우 null 반환 => useEffect 사용
  // useEffect : hook 마운트시 한번 실행되면, 데이터가 변경될때마다 실행됨
  useEffect(() => {
    // 기능 : 백엔드 data 없는 경우 로그아웃 실행
    if (data?.me === null) {
      // null 값도 false로 인식하므로 undefined로 설정해야 없는 경우 대응 가능
      console.log("There is data on LS but the token did not work on back-end");
      logUserOut();
    }
  });
  return;
};

export default useUser;
