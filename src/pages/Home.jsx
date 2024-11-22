import { DefaultFrame } from "components/global/DefaultFrame";
import day6_1 from "assets/Day6_1.jpeg";
import day6_2 from "assets/Day6_2.jpeg";
import day6_3 from "assets/Day6_3.jpeg";
import day6_4 from "assets/Day6_4.jpg";
import day6_5 from "assets/Day6_5.jpeg";
import day6_6 from "assets/Day6_6.jpeg";
import styled from "styled-components";
import { useOpenContext } from "components/global/ContextProvider";
import { NavView } from "components/global/NavView";

export const Home = () => {
  const { isOpen, setIsOpen } = useOpenContext();

  return (
    <DefaultFrame>
      {isOpen && <NavView isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Img src={day6_1} />
    </DefaultFrame>
  );
};

const Img = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: contain;
`;
