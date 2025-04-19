"use client";

import { BouquetCard } from "@/components/bouquet-card";
import { Button } from "@/components/ui/button";
import { useAddVote } from "@/hooks/use-bouquet-hook";
import { useHeader } from "@/hooks/use-header";
import { useGetShareById } from "@/hooks/use-share-hook";
import { Share } from "@/types";
import { Heart } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ErrorComponent } from "@/components/error-component";
import { LoadingCard } from "@/components/loading";

export default function SharePage() {
  const params = useParams();
  const { data, isLoading, isError } = useGetShareById(params.id as string);
  const { mutateAsync: addVote } = useAddVote();
  const { setTitle } = useHeader();

  useEffect(() => {
    setTitle(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Shared bouquets details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }, []);

  if (isLoading) {
    return <LoadingCard />
  }

  if (isError) {
    return <ErrorComponent />
  }

  const share: Share = data;

  const handleVotes = async (bouquetId : string) => {
    const votedKey = `voted-${bouquetId}`;
    const alreadyVoted = sessionStorage.getItem(votedKey);

    if (alreadyVoted) {
      toast("You've already voted for this bouquet.");
      return;
    }

    try {
      await addVote(bouquetId);
      sessionStorage.setItem(votedKey, "true");
      toast.success('Vote added successfully!')
    } catch (error) {
      console.log("Error voting:", error);
      toast.error('Error adding vote.')
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shared Bouquets Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {share.bouquets.map((bouquet) => (
          <div key={bouquet._id}>
            <BouquetCard bouquet={bouquet} />
            <div className="mt-2 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => handleVotes(bouquet._id)}
              >
                <Heart className="w-4 h-4" />
                Vote ({bouquet.votes})
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
