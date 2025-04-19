"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Bouquet } from "@/types"
import { useShareBouquet } from "@/hooks/use-share-hook"
import { Check, Copy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export function SelectBouquetsModal({ bouquets }: { bouquets: Bouquet[] }) {
  const [selectedBouquets, setSelectedBouquets] = useState<string[]>([])
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [shareLink, setShareLink] = useState("")
  const [copied, setCopied] = useState(false)
  const { mutateAsync: share } = useShareBouquet()

  const handleSelect = (bouquetId: string) => {
    setSelectedBouquets(prev => 
      prev.includes(bouquetId) 
        ? prev.filter(id => id !== bouquetId)
        : [...prev, bouquetId]
    )
  }

  const handleSubmit = async () => {
    try {
      const res = await share(selectedBouquets)
      setShareLink(`${window.location.origin}/share/${res.id}`)
      setStep(2)
    } catch (error) {
      console.log(error)
      toast.error("Failed to create share link")
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClose = (newOpen : boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset state only when closing
      setStep(1)
      setSelectedBouquets([])
      setShareLink("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="outline">Select Bouquets</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle>Select Bouquets ({selectedBouquets.length})</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[400px] overflow-y-auto">
              {bouquets.map((bouquet) => (
                <div key={bouquet._id} className="flex items-center space-x-4">
                  <Checkbox
                    id={bouquet._id}
                    checked={selectedBouquets.includes(bouquet._id)}
                    onCheckedChange={() => handleSelect(bouquet._id)}
                  />
                  <div className="flex items-center space-x-4">
                    <img
                      src={bouquet.imageUrl}
                      alt={bouquet.title}
                      className="h-12 w-12 rounded object-cover"
                    />
                    <label
                      htmlFor={bouquet._id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {bouquet.title}
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit} disabled={selectedBouquets.length === 0}>
                Create Share Link
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Share Link Created!</DialogTitle>
            </DialogHeader>
            <div className="py-6">
              <div className="flex items-center space-x-2">
                <Input
                  readOnly
                  value={shareLink}
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
            <DialogFooter>
              <Button onClick={() => handleClose(false)}>
                Done
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}