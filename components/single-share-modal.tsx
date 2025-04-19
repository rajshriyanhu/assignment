"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { toast } from "sonner"

interface SingleShareModalProps {
    open: boolean;
    setOpen : (open: boolean) => void;
    shareUrl: string;
}

export function SingleShareModal({ open, setOpen, shareUrl }: SingleShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    toast.success("Link copied to clipboard!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Link</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <div className="flex items-center space-x-2">
            <Input
              readOnly
              value={shareUrl}
              className="flex-1"
            />
            <Button
              size="icon"
              variant="outline"
              onClick={handleCopy}
              className="shrink-0"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}