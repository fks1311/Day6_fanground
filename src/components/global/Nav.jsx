import { useNavigate } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";
import styled from "styled-components";
import day6 from "assets/day6Nav.png";
import { useOpenContext } from "./ContextProvider";

export const Nav = () => {
  const { isOpen, setIsOpen } = useOpenContext(false);
  const navigate = useNavigate();

  return (
    <NavContainer>
      <Img src={day6} onClick={() => navigate("/day6")} />
      <Icon>
        <RiMenuFill
          size={50}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </Icon>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  cursor: pointer;
`;
const Icon = styled.div`
  padding: 0px 70px;
  cursor: pointer;
`;
