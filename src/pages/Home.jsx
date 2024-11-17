import { DefaultFrame } from "components/global/DefaultFrame";
import day6 from "assets/day6.jpg";
import styled from "styled-components";
import { useOpenContext } from "components/global/ContextProvider";

export const Home = () => {
  const { isOpen, setIsOpen } = useOpenContext();

  return (
    <DefaultFrame>
      <NavView />
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

const NavView = styled.div`
  position: absolute;
  top: 0;
  background-color: skyblue;
  height: 100%;
  width: 100%;
  // z-index: 1;
  // opacity: 0.8;
`;
