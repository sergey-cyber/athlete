import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { RussianRuble } from "lucide-react";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title: string;
  description: string;
  price: number;
}

export function ProductListItem({
  title,
  description,
  price,
  children
}: Props) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-center text-xl line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 min-h-16">
          {description}
        </CardDescription>
        <div className="pt-2 flex items-center text-2xl font-semibold">
          {price}
          <RussianRuble className="pt-1" />
        </div>
      </CardContent>
      <CardFooter className="justify-center">{children}</CardFooter>
    </Card>
  );
}
