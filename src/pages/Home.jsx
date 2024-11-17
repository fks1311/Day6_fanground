import { DefaultFrame } from "components/global/DefaultFrame";
import day6 from "assets/day6.jpg";
import styled from "styled-components";

export const Home = () => {
  return (
    <DefaultFrame>
      <Img src={day6} />
    </DefaultFrame>
  );
};

const Img = styled.img`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  object-fit: contain;
`;
