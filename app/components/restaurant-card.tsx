import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Restaurant } from "@/data/types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  return (
    <Link href={`/${restaurant.slug}`}>
      <Card className="min-w-[300px] overflow-hidden transition-all hover:scale-105 hover:shadow-lg">
        <div className="relative h-[150px] w-full">
          <Image
            src={restaurant.coverImageUrl}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="relative flex flex-col items-center pt-12 pb-6">
          <div className="absolute top-[-35px] h-[70px] w-[70px] rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-lg font-bold">{restaurant.name}</h3>
          <p className="text-center text-sm text-muted-foreground line-clamp-2 mt-2 px-2">
            {restaurant.description}
          </p>
          <div className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90">
            Ver Cardápio
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
