"use client";

import { Minus, Plus, PlusIcon } from "lucide-react";
import { Empty } from "../empty";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Price } from "./price";
import { Separator } from "../ui/separator";
import { ReactNode, useEffect, useState } from "react";
import { AmenitiesType } from "@/service/amenities/types";
import { AddProductModal } from "../product/add-product-modal";
import { calcProductPrice } from "@/lib/utils";

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
    return amenities.reduce((acc, item) => acc + calcProductPrice(item), 0);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title}
          <AddAmenitiesModal
            disabledItem={(item) => amenities.some(({ id }) => id === item.id)}
            trigger={
              <Button size={"sm"} variant={"outline"}>
                <PlusIcon size={16} className="mr-2" /> Добавить
              </Button>
            }
            onItemAdd={(item) => onChange([...amenities, item])}
          />
        </CardTitle>
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
                    price={
                      calcProductPrice(product) * getAmenitiesCount(product.id)
                    }
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

function AddAmenitiesModal(props: {
  trigger: ReactNode;
  disabledItem: (item: AmenitiesType) => boolean;
  onItemAdd: (item: AmenitiesType) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [amenities, setAmenities] = useState<AmenitiesType[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/amenities")
      .then((res) => res.json())
      .then((data) => setAmenities(data.amenities || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AddProductModal
      trigger={props.trigger}
      title={"Выберите услуги"}
      products={amenities}
      loading={loading}
      onItemAdd={props.onItemAdd}
      disabledItem={props.disabledItem}
    />
  );
}
