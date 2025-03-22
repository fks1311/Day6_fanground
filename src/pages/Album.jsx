import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { DefaultFrame } from "components/global/DefaultFrame";
import { useMusicVideoJsonList } from "utils/collectFunctions";
import { useWindowSize } from "react-use";

export const Album = () => {
  const { isLoading, data } = useMusicVideoJsonList("day6");
  const windowSize = useWindowSize();

  const layoutVariants = {
    init: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 3,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <DefaultFrame>
      {isLoading ? (
        <></>
      ) : (
        <Layout variants={layoutVariants} initial="init" animate="show">
          <span>ALBUM LIST</span>
          <Lists window={windowSize}>
            {data.data.map((data, idx) => (
              <Cover
                key={idx}
                to={`/album/${data.album}`}
                state={{
                  album: data.album,
                }}
              >
                <img src={`https://fks1311.github.io/day6_cdn_data/public${data.cover}`} />
                <p>{data.album}</p>
              </Cover>
            ))}
          </Lists>
        </Layout>
      )}
    </DefaultFrame>
  );
};
const Layout = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  span {
    padding: 2rem;
    font-size: 3rem;
  }
`;

const Lists = styled.div`
  width: ${({ window }) => `calc(${window.width}px - 100px)`};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 0.5rem;
  padding: 1rem;
  img {
    height: 300px;
    border-radius: 10px;
  }
`;

const Cover = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: SUIT-Bold;
  text-decoration-line: none;
  color: black;
`;
