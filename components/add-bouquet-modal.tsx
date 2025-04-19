"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon, Plus, X } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { toast } from "sonner";
import { useAddBouquet } from "@/hooks/use-bouquet-hook";

export function AddBouquetModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const {mutateAsync : addBouquet, isPending} = useAddBouquet()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !image) {
      toast("Please fill all fields");
      return;
    }

    try {
      // 1. Convert file to base64
      const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
        });

      const base64Image = await toBase64(image);

      const res = await addBouquet({
        title,
        image : base64Image
      });
      console.log("Upload success:", res.data);
      setOpen(false);
      toast("Bouquet addded.");
      setTitle('');
      setImage(null);
      setImagePreview(null)
    } catch (err) {
      toast("Something went wrong.");
      console.log("Upload failed:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4" />
          Add New Bouquet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Bouquet</DialogTitle>
          <DialogDescription>
            Create a new bouquet to share with the community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                placeholder="Enter bouquet title"
              />
            </div>
            <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <div className="relative">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              {imagePreview ? (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute right-2 top-2 rounded-full bg-black/60 p-1 text-white hover:bg-black/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 hover:bg-gray-50"
                >
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Click to upload image
                  </span>
                </label>
              )}
            </div>
          </div>
          </div>
          <DialogFooter>
            <Button disabled={isPending} type="submit">Create Bouquet</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
