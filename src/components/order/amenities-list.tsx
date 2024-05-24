"use client";

import { Minus, Plus } from "lucide-react";
import { Empty } from "../empty";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Price } from "./price";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";
import { AmenitiesType } from "@/service/amenities/types";

interface Props {
  title: ReactNode;
  amenities: AmenitiesType[];
  onChange: (value: AmenitiesType[]) => void;
}

export function AmenitiesList({ title, amenities, onChange }: Props) {
  function getAmenitiesCount(id: number) {
    return amenities.filter((el) => el.id === id).length;
  }

  const uniqueAmenities: typeof amenities = [];

  for (const product of amenities) {
    if (!uniqueAmenities.some(({ id }) => id === product.id)) {
      uniqueAmenities.push(product);
    }
  }

  uniqueAmenities.sort((a, b) => a.title.localeCompare(b.title));

  function getTotalPrice() {
    return amenities.reduce((acc, item) => acc + item.price, 0);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {uniqueAmenities.length ? (
          uniqueAmenities.map((product, i) => (
            <>
              <div key={product.id} className="grid grid-cols-5 gap-4 min-h-20">
                <div className="col-span-3">
                  <p className="text-xl font-semibold">{product.title}</p>
                  <p className="text-gray-500 line-clamp-3">
                    {product.description}
                  </p>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                  <Button
                    onClick={() => {
                      const indexOfRemove = amenities.findIndex(
                        ({ id }) => id === product.id
                      );
                      onChange(
                        amenities.filter((_, index) => index !== indexOfRemove)
                      );
                    }}
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Minus size={12} />
                  </Button>
                  {getAmenitiesCount(product.id)}
                  <Button
                    onClick={() => onChange([...amenities, product])}
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <Price
                    price={product.price * getAmenitiesCount(product.id)}
                  />
                </div>
              </div>
              <Separator />
            </>
          ))
        ) : (
          <>
            <Empty />
            <Separator />
          </>
        )}
        <div className="grid grid-cols-5 gap-4">
          <span className="text-xl font-bold">Итого</span>
          <span className="col-start-5 col-end-5 flex justify-center">
            <Price price={getTotalPrice()} />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
