import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetShareById = (id: string) => {
  return useQuery({
    queryKey: ["share", id],
    queryFn: async () => {
      const response = await axios.get(`/api/share/${id}`);
      return response.data;
    },
  });
};


export const useShareBouquet = () => {
  return useMutation({
    mutationFn: async (bouquetIds: string[]) => {
      const response = await axios.post("/api/share", {
        bouquetIds,
      });
      return response.data;
    },
  });
};