import day6_1 from "assets/Day6_1.jpeg";
import day6_2 from "assets/Day6_2.jpeg";
import day6_3 from "assets/Day6_3.jpeg";
import day6_4 from "assets/Day6_4.jpg";
import day6_5 from "assets/Day6_5.jpg";
import day6_6 from "assets/Day6_6.jpeg";
import day6_7 from "assets/Day6_7.jpeg";

import { useOpenContext } from "components/global/ContextProvider";
import { Nav } from "components/global/Nav";
import { NavView } from "components/global/NavView";
import { motion } from "framer-motion";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Home = () => {
  const { isOpen, setIsOpen } = useOpenContext();
  const settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
  };
  const images = [day6_1, day6_2, day6_3, day6_4, day6_5, day6_6, day6_7];

  return (
    <Layout>
      <Nav />
      {isOpen && <NavView isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Slider {...settings}>
        {images.map((data, idx) => (
          <Img key={idx} src={data} />
        ))}
      </Slider>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  height: ${window.innerHeight}px;
  position: relative;
  display: flex;
  justify-content: center;
  .slick-slider,
  .slick-initialized,
  .slick-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 100%;
    button {
      display: none;
    }
  }
`;

const Img = styled.img`
  width: 80%;
  height: 100vh;
  object-fit: contain;
`;

const Trophy = styled.div`
  position: absolute;
  top: 5rem;
  font-size: 5rem;
  z-index: 1;
`;
