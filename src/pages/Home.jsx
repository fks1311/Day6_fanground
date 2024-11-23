import { DefaultFrame } from "components/global/DefaultFrame";
import day6_1 from "assets/Day6_1.jpeg";
import day6_2 from "assets/Day6_2.jpeg";
import day6_3 from "assets/Day6_3.jpeg";
import day6_4 from "assets/Day6_4.jpg";
import day6_5 from "assets/Day6_5.jpg";
import day6_6 from "assets/Day6_6.jpeg";
import day6_7 from "assets/Day6_7.jpeg";

import styled from "styled-components";
import { useOpenContext } from "components/global/ContextProvider";
import { NavView } from "components/global/NavView";
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
    <DefaultFrame>
      {isOpen && <NavView isOpen={isOpen} setIsOpen={setIsOpen} />}
      <Slider {...settings}>
        {images.map((data, idx) => (
          <Img key={idx} src={data} />
        ))}
      </Slider>
    </DefaultFrame>
  );
};

const Img = styled.img`
  width: 80%;
  height: 100vh;
  object-fit: contain;
`;
