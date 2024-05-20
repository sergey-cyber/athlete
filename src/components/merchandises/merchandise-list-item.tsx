import { MerchandiseType } from "@/service/merchandiseService/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { AddToCartButton } from "./add-to-cart-button";

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
        <CardDescription>{item.description}</CardDescription>
        <p>{item.price}</p>
      </CardContent>
      <CardFooter className="justify-center">
        <AddToCartButton item={item} />
      </CardFooter>
    </Card>
  );
}
