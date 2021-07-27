import styled from "styled-components";

// tag 내 임의의 props 설정시 타입 설정 필요
interface ISavatar {
  lg?: boolean;
}

const SAvatar = styled.div<ISavatar>`
  width: ${(props) => (props.lg ? "35px" : "20px")};
  height: ${(props) => (props.lg ? "35px" : "20px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar = ({ url = "", lg = false }) => {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
};

export default Avatar;
