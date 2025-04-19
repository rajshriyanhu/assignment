import { AlertCircle } from "lucide-react"

interface ErrorComponentProps {
  title?: string
  description?: string
}

export function ErrorComponent({
  title = "Something went wrong!",
  description = "There was an error loading the content."
}: ErrorComponentProps) {
  return (
    <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
      <div className="max-w-md w-full text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-destructive">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}