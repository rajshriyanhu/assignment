import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface AddCommentRequest {
    name: string;
    message: string;
    bouquetId: string;  
}

export const useAddComment = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async (values: AddCommentRequest) => {
        const response = await axios.post("/api/comment", values);
        return response.data;
      },
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries({ queryKey: ['bouquet', variables.bouquetId] });
      },
    });
  };