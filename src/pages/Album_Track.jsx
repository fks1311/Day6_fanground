import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DefaultFrame } from "components/global/DefaultFrame";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import YouTube from "react-youtube";
import styled from "styled-components";

export const Album_Track = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // const youtubeApiUrl = "https://www.googleapis.com/youtube/v3/playlists";
  // const params = {
  //   key: process.env.REACT_APP_API_KEY,
  //   part: "snippet",
  //   channelId: "UCp-pqXsizklX3ZHvLxXyhxw",
  // };
  //   const { isLoading, data, error } = useQuery({
  //     queryKey: ["day6"],
  //     queryFn: async () => {
  //       const response = await axios.get(youtubeApiUrl, { params });
  //       return response;
  //     },
  //   });

  const { isLoading: mvLoading, data: mvData } = useQuery({
    queryKey: ["mv"],
    queryFn: async () => {
      const response = await axios.get("https://fks1311.github.io/day6_cdn_data/public/mv_list.json");
      const filter = response.data.filter((f, i) => f.album === decodeURI(location.state.album));
      return filter;
    },
  });

  const loading = mvLoading;

  return (
    <DefaultFrame>
      {loading ? (
        <></>
      ) : (
        <Layout className="layout">
          <BackBtn onClick={() => navigate(-1)}>
            <IoArrowBackCircleOutline size={20} />
            Back
          </BackBtn>
          <AlbumFrame>
            <AlbumTitle gradients={mvData[0].gradients}>{decodeURI(location.state.album)}</AlbumTitle>
            <AlbumInfo>
              <MvFrame>
                <YouTube
                  videoId={mvData[0].videoId}
                  opts={{
                    width: "800",
                    height: "500",
                  }}
                />
              </MvFrame>
              <TrackLists>
                <img src={`https://fks1311.github.io/day6_cdn_data/public${mvData[0].cover}`} />
                <div>TRACK LIST</div>
                {mvData[0].track_list.map((data, idx) => (
                  <Lists gap={data === mvData[0].title && true}>
                    <span key={idx}>
                      {idx + 1}. {data}
                    </span>
                    <span>{data === mvData[0].title && "✦ Title"}</span>
                  </Lists>
                ))}
              </TrackLists>
            </AlbumInfo>
            <PlayLists>Related playlists</PlayLists>
          </AlbumFrame>
        </Layout>
      )}
    </DefaultFrame>
  );
};
const Layout = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;
const BackBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  // margin-top: 2rem;
  font-family: SUIT-Regular;
  font-size: 1rem;
`;
const AlbumFrame = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  // align-items: center;
  gap: 1rem;
  font-family: SUIT-Bold;
  font-size: 20px;
`;
const AlbumTitle = styled.div`
  width: 100%;
  padding: 2rem;
  font-size: 2.5rem;
  font-family: SUIT-Bold;
  text-align: center;
  color: white;
  background-image: ${({ gradients }) => gradients};
`;
const AlbumInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
`;
const MvFrame = styled.div``;
const TrackLists = styled.div`
  height: 503px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  img {
    width: 40%;
  }
`;
const Lists = styled.div`
  display: flex;
  gap: ${({ gap }) => gap && `1rem`};
  font-family: ${({ gap }) => (gap ? `SUIT-Bold` : `SUIT-Regular`)};
  span {
    font-size: 14px;
  }
`;
const PlayLists = styled.div``;
