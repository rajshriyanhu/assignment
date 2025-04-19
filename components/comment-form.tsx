"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddComment } from "@/hooks/use-comment-hook"
import { useState } from "react"

export function CommentForm({ bouquetId }: { bouquetId: string }) {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const {mutateAsync : addComment, isPending} = useAddComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('')
    if(name === '' || message === ''){
      setError('Please fill in all fields')
      return;
    }
    addComment({
      bouquetId,
      name,
      message,
    }).then(() => {
      setMessage('')
      setName('')
    })
    .catch((e) => {
    setError(e.message)
   }) 
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Textarea
        placeholder="Write a comment..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {error && (
        <div className="text-red-500">{error}</div>
      )}
      <Button disabled={isPending} type="submit">Post Comment</Button>
    </form>
  )
}