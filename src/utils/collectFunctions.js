import axios from "axios";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";

// useQuery
export const useQueryYoutube = (api, params, queryKey) => {
  return useQuery({
    queryKey: [`${queryKey}`],
    queryFn: async () => {
      const response = await axios.get(api, { params: params });
      return response.data;
    },
  });
};

// useQueries
// export const useQueriesYoutube = () => {
//   return useQueries({
//     queries:
//   });
// };

// useInfiniteQuery
export const useInfiniteQueryYoutube = (api, params, queryKey) => {
  return useInfiniteQuery({
    queryKey: [`${queryKey}`],
    queryFn: async ({ pageParam = "" }) => {
      const response = await axios.get(api, {
        params: params,
        pageToken: pageParam,
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPageToken;
    },
  });
};

// mvlistJson
export const useMusicVideoJsonList = (queryKey) => {
  return useQuery({
    queryKey: [`${queryKey}`],
    queryFn: async () => {
      const response = await axios.get("https://fks1311.github.io/day6_cdn_data/public/mv_list.json");
      return response;
    },
  });
};
