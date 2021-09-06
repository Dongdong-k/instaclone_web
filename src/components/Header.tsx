import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import Avatar from "./Avatar";
import useUser from "./hooks/useUser";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const IConContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-left: 15px;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 5px 15px;
  color: white;
  font-weight: 600;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser(); // User data를 어느 곳에서나 불러와서 사용 가능
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            // 여러 요소들을 반환하고 싶으면 상위 tag <></> 로 감싸줘야함.(Component를 반환해야 함)
            <IConContainer>
              <Icon>
                <FontAwesomeIcon icon={faHome} size="lg" />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                {data?.me?.avatar ? (
                  <Link to={`/users/${data?.me?.userName}`}>
                    <Avatar url={data?.me?.avatar} />
                  </Link>
                ) : (
                  <FontAwesomeIcon icon={faUser} size="lg" />
                )}
              </Icon>
            </IConContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Log In</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};
export default Header;
