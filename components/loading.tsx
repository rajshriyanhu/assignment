"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square" />
      </CardHeader>
      <div className="p-4">
        <CardContent className="p-0 mb-3">
          <Skeleton className="h-6 w-3/4" />
        </CardContent>
        <CardFooter className="p-0 flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </CardFooter>
      </div>
    </Card>
  )
}

export function LoadingGrid() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <LoadingCard key={i} />
        ))}
      </div>
    </div>
  )
}

export function BouquetDetailSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Skeleton */}
        <div className="rounded-lg overflow-hidden border">
          <Skeleton className="aspect-square w-full" />
        </div>

        {/* Details Skeleton */}
        <div className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4 mb-2" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>

          <Card className="p-6">
            <Skeleton className="h-7 w-32 mb-4" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}