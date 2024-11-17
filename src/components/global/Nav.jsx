import styled from "styled-components";
import day6 from "assets/day6Nav.png";
import { useNavigate } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";

export const Nav = () => {
  const navigate = useNavigate();

  return (
    <NavContainer>
      <Img src={day6} onClick={() => navigate("/day6")} />
      <Icon>
        <RiMenuFill size={50} />
      </Icon>
    </NavContainer>
  );
};

const NavContainer = styled.div`
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
