import { Comment } from "@/types"
import { format, isWithinInterval, subHours } from "date-fns"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function CommentList({ comments }: { comments: Comment[] }) {
  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment._id} className="flex gap-4 border-b pb-6">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary">
              {comment.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{comment.name}</h3>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">
                  {isWithinInterval(comment.createdAt, {
                    start: subHours(new Date(), 24),
                    end: new Date(),
                  })
                    ? format(comment.createdAt, "h:mm a")
                    : format(comment.createdAt, "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{comment.message}</p>
          </div>
        </div>
      ))}
    </div>
  )
}