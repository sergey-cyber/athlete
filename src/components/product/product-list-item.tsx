import { calcProductPrice } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  title: ReactNode;
  description: string;
  price: number;
  numberInWarehouse?: number;
  ratio?: number;
}

export function ProductListItem({
  title,
  description,
  price,
  children,
  numberInWarehouse,
  ratio,
}: Props) {
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle className="text-center text-xl line-clamp-2 h-14">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 min-h-16">
          {description}
        </CardDescription>
        {numberInWarehouse ? (
          <CardDescription className="flex justify-between">
            <span>На складе</span>
            <span>{numberInWarehouse} шт</span>
          </CardDescription>
        ) : null}
        <div className="flex justify-between items-end">
          <CardDescription>Стоимость</CardDescription>
          <div className="flex text-lg font-semibold">
            {calcProductPrice({ price, ratio })} р
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">{children}</CardFooter>
    </Card>
  );
}
