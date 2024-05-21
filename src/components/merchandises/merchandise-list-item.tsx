import { MerchandiseType } from "@/service/merchandise/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { AddToCartButton } from "./add-to-cart-button";
import { RussianRuble } from "lucide-react";

interface Props {
  item: MerchandiseType;
}

export function MerchendiseListItem({ item }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">{item.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-5">
          {item.description}
        </CardDescription>
        <div className="pt-2 flex  items-center text-2xl font-semibold">
          {item.price}
          <RussianRuble className="pt-1" />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <AddToCartButton item={item} />
      </CardFooter>
    </Card>
  );
}
