import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

const BottomBox = ({ cta, link, linkText, onclick }: any) => {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link} onClick={onclick}>
        {linkText}
      </Link>
    </SBottomBox>
  );
};

export default BottomBox;
