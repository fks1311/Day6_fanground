import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import day6Logo from "assets/day6Logo.png";
import instagram from "assets/sns_instagram_b.png";
import twitter from "assets/sns_twitter_b.png";
import youtube from "assets/sns_youtube_b.png";
import show from "assets/sns_shop_b.png";

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

export const NavView = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const navlists = [
    { id: "Profile", link: "/profile" },
    { id: "MV", link: "/mv" },
    { id: "Album", link: "/album" },
    { id: "Youtube", link: "/youtube" },
  ];
  const [isLoad, setIsLoad] = useState(true);
  const [showItems, setShowItems] = useState(false);
  const icons = [
    {
      id: instagram,
      link: "https://www.instagram.com/DAY6kilogram/",
    },
    {
      id: twitter,
      link: "https://x.com/DAY6Official?mx=2",
    },
    {
      id: youtube,
      link: "https://www.youtube.com/DAY6Official",
    },
    {
      id: show,
      link: "https://thejypshop.com/day6.html",
    },
  ];

  const imageVariants = {
    init: {
      WebkitMaskImage: hiddenMask,
      maskImage: hiddenMask,
    },
    show: {
      WebkitMaskImage: visibleMask,
      maskImage: visibleMask,
      transition: { duration: 1 },
    },
  };

  const itemVariants = {
    init: {
      opacity: 0,
      x: 200,
    },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1 },
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoad(false);
      setShowItems(true);
    }, 1500);
  });

  return (
    <Layout>
      <CloseIcon>
        <MdClose size={80} onClick={() => setIsOpen(!isOpen)} />
      </CloseIcon>
      <AnimatePresence>
        <Content>
          {isLoad ? <Image src={day6Logo} variants={imageVariants} initial="init" animate="show" /> : null}
          {showItems ? (
            <ShowContainer>
              <SocialIcons>
                {icons.map((data, idx) => (
                  <Icon key={idx} src={data.id} onClick={() => window.open(data.link, "_blank")} />
                ))}
              </SocialIcons>
              <Item variants={itemVariants} initial="init" animate="show">
                {navlists.map((item, idx) => (
                  <Items
                    key={idx}
                    onClick={() => {
                      navigate(item.link);
                      setIsOpen(false);
                    }}
                  >
                    {item.id.toLocaleUpperCase()}
                  </Items>
                ))}
              </Item>
            </ShowContainer>
          ) : null}
        </Content>
      </AnimatePresence>
    </Layout>
  );
};

const Layout = styled(motion.div)`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  width: 100%;
  z-index: 1;
`;

const CloseIcon = styled.div`
  width: inherit;
  display: flex;
  justify-content: flex-end;
  svg {
    margin-top: 1rem;
    margin-right: 4rem;
    cursor: pointer;
  }
`;

const Content = styled(motion.div)`
  flex: 2;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: inherit;
`;
const Image = styled(motion.img)`
  position: absolute;
`;

const ShowContainer = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
`;
const SocialIcons = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
  gap: 1.5rem;
`;
const Icon = styled(motion.img)`
  height: 25px;
  width: 25px;
`;
const Item = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  font-size: 3rem;
  font-weight: 700;
`;
const Items = styled(motion.div)`
  width: 215px;
`;
