import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Bouquet } from "@/types";

interface BouquetCardProps {
  bouquet: Bouquet;
}

export function BouquetCard({ bouquet }: BouquetCardProps) {
  return (
    // <Card className="overflow-hidden hover:shadow-lg transition-shadow">
    //   <Link href={`/bouquet/${bouquet.id}`}>
    //     <CardHeader className="p-0">
    //       <div className="aspect">
    //         <img
    //           src={bouquet.imageUrl}
    //           alt={bouquet.title}
    //           className="w-full h-full object-fill"
    //         />
    //       </div>
    //     </CardHeader>
    //   </Link>
    //   <CardContent className="p-4">
    //     <h2 className="font-semibold text-lg">{bouquet.title}</h2>
    //   </CardContent>
    //   <CardFooter className="p-4 pt-0">
    //     <div className="flex items-center text-gray-600">
    //       <Heart className="w-4 h-4 mr-1" />
    //       {bouquet.votes} votes
    //     </div>
    //   </CardFooter>
    // </Card>

    <Card className="group overflow-hidden transition-all hover:shadow-xl">
    <Link href={`/bouquet/${bouquet._id}`}>
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden">
          <img
            src={bouquet.imageUrl}
            alt={bouquet.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
    </Link>
    <div className="p-4">
      <CardContent className="p-0 mb-3">
        <h2 className="font-semibold text-xl line-clamp-1">{bouquet.title}</h2>
      </CardContent>
      <CardFooter className="p-0 flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Heart className="w-4 h-4" />
          <span className="text-sm font-medium">{bouquet.votes} votes</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
        <div className="text-sm text-muted-foreground">
          {bouquet.comments?.length || 0} comments
        </div>
        </div>
      </CardFooter>
    </div>
  </Card>
  );
}
