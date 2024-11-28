import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DefaultFrame } from "components/global/DefaultFrame";
import styled from "styled-components";

export const Album = () => {
  const youtubeApiUrl = "https://www.googleapis.com/youtube/v3/playlists";
  const params = {
    key: process.env.REACT_APP_API_KEY,
    part: "snippet",
    channelId: "UCp-pqXsizklX3ZHvLxXyhxw",
  };

  const { isLoading, data } = useQuery({
    queryKey: ["day6"],
    queryFn: async () => {
      const response = await axios.get("https://fks1311.github.io/day6_cdn_data/public/mv_list.json");
      return response;
    },
  });

  //   const { isLoading, data, error } = useQuery({
  //     queryKey: ["day6"],
  //     queryFn: async () => {
  //       const response = await axios.get(youtubeApiUrl, { params });
  //       return response;
  //     },
  //   });

  //   console.log(data);
  //   if (error) return <p>{console.log(error)}</p>;

  return (
    <DefaultFrame>
      {isLoading ? (
        <></>
      ) : (
        <Layout>
          <span>ALBUM LIST</span>
          <Lists>
            {data.data.map((data, idx) => (
              <Cover>
                <img key={idx} src={`https://fks1311.github.io/day6_cdn_data/public${data.cover}`} />
                <p>{data.album}</p>
              </Cover>
            ))}
          </Lists>
        </Layout>
      )}
    </DefaultFrame>
  );
};
const Layout = styled.div`
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

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  font-family: SUIT-Bold;
`;
