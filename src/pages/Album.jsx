import axios from "axios";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DefaultFrame } from "components/global/DefaultFrame";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Album = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["day6"],
    queryFn: async () => {
      const response = await axios.get("https://fks1311.github.io/day6_cdn_data/public/mv_list.json");
      return response;
    },
  });

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
          <Lists>
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  img {
    height: 300px;
    width: 300px;
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
