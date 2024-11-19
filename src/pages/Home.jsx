import { DefaultFrame } from "components/global/DefaultFrame";
import day6 from "assets/day6.jpg";
import styled from "styled-components";
import { useOpenContext } from "components/global/ContextProvider";
import { NavView } from "components/global/NavView";

export const Home = () => {
  const { isOpen, setIsOpen } = useOpenContext();

  return (
    <DefaultFrame>
      {isOpen && <NavView isOpen={isOpen} setIsOpen={setIsOpen} />}

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
