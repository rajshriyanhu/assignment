"use client";

import { CommentForm } from "@/components/comment-form";
import { CommentList } from "@/components/comment-list";
import { Button } from "@/components/ui/button";
import { Heart, Share } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useAddVote, useGetBouquetById } from "@/hooks/use-bouquet-hook";
import { Bouquet } from "@/types";
import { useHeader } from "@/hooks/use-header";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { toast } from "sonner";
import { useShareBouquet } from "@/hooks/use-share-hook";
import { SingleShareModal } from "@/components/single-share-modal";
import { ErrorComponent } from "@/components/error-component";
import { BouquetDetailSkeleton } from "@/components/loading";

export default function BouquetPage() {
  const params = useParams();
  const { data, isLoading, isError } = useGetBouquetById(params.id as string);
  const { setTitle } = useHeader();
  const { mutateAsync: addVote, isPending : voting } = useAddVote();
  const {
    mutateAsync: share,
    isPending,
  } = useShareBouquet();
  const [shareUrl, setShareUrl] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setTitle(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Bouquets details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }, []);

  if (isLoading) {
    return <BouquetDetailSkeleton />
  }

  if (isError) {
    return <ErrorComponent  />
  }

  const bouquet: Bouquet = data;

  const handleShare = async () => {
    try {
      const bouquets = [bouquet._id];
      const res = await share(bouquets);
      setShareUrl(`${window.location.origin}/share/${res.id}`);
      setOpenModal(true);
    } catch (err) {
      console.log("Error sharing bouquet:", err);
      toast.error("Error sharing bouquet.");
    }
  };

  const handleVotes = async (bouquetId: string) => {
    const votedKey = `voted-${bouquetId}`;
    const alreadyVoted = sessionStorage.getItem(votedKey);

    if (alreadyVoted) {
      toast("You've already voted for this bouquet.");
      return;
    }

    try {
      await addVote(bouquetId);
      sessionStorage.setItem(votedKey, "true");
      toast.success("Vote added successfully!");
    } catch (error) {
      console.log("Error voting:", error);
      toast.error("Error adding vote.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="rounded-lg overflow-hidden border">
          <img
            src={bouquet.imageUrl}
            alt={bouquet.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{bouquet.title}</h1>
            <div className="flex items-center gap-4">
              <Button
              disabled={voting}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => handleVotes(bouquet._id)}
              >
                <Heart className="w-4 h-4" />
                Vote ({bouquet.votes})
              </Button>
              <Button disabled={isPending} variant="outline" onClick={() => handleShare()}>
                <Share />
                Share
              </Button>
            </div>
          </div>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <CommentList comments={bouquet.comments} />
            <div className="mt-4">
              <CommentForm bouquetId={bouquet._id} />
            </div>
          </Card>
        </div>
      </div>
      {
        openModal && shareUrl && (
          <SingleShareModal
            open={openModal}
            setOpen={(val) => setOpenModal(val)}
            shareUrl={shareUrl}
          />
        )
      }
    </div>
  );
}
