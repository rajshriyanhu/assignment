import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type AddBouquetRequest = {
    title: string;
    image : string;
}

export const useAddBouquet = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values : AddBouquetRequest) => {
      const response = await axios.post("/api/bouquet", values);
      return response.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["allBouquets"] });
      },
  });
};

export const useGetBouquetById = (id: string) => {
  return useQuery({
    queryKey: ['bouquet', id],
    queryFn: async () => {
      const response = await axios.get(`/api/bouquet/${id}`);
      return response.data;
    },
    staleTime: 0,
  });
};

export function useGetAllBouquets() {
    return useQuery({
      queryKey: ["allBouquets"],
      queryFn: async () => {
        const response = await axios.get('/api/bouquet');
        return response.data;
      },
      staleTime: 0,
    });
  }

  export const useAddVote = () => {
    const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id : string) => {
      const response = await axios.put(`/api/bouquet/${id}`);
      return response.data;
    },
    onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['allBouquets'] });
        queryClient.invalidateQueries({ queryKey: ["share"] });
        queryClient.invalidateQueries({ queryKey: ['bouquet', variables], });
      },
  });
};