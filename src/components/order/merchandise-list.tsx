"use client";

import { Minus, Plus, PlusIcon } from "lucide-react";
import { Empty } from "../empty";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Price } from "./price";
import { Separator } from "../ui/separator";
import { ReactNode, useEffect, useState } from "react";
import { MerchandiseType } from "@/service/merchandise/types";
import { AddProductModal } from "../product/add-product-modal";

interface Props {
  title: ReactNode;
  merchandises: MerchandiseType[];
  onChange: (value: MerchandiseType[]) => void;
}

export function MerchandiseList({ title, merchandises, onChange }: Props) {
  function getMerchandiseCount(id: number) {
    return merchandises.filter((el) => el.id === id).length;
  }

  const uniqueMerchandises: typeof merchandises = [];

  for (const product of merchandises) {
    if (!uniqueMerchandises.some(({ id }) => id === product.id)) {
      uniqueMerchandises.push(product);
    }
  }

  uniqueMerchandises.sort((a, b) => a.title.localeCompare(b.title));

  function getTotalPrice() {
    return merchandises.reduce((acc, item) => acc + item.price, 0);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title}
          <AddMerchandiseModal
            disabledItem={(item) =>
              merchandises.some(({ id }) => id === item.id)
            }
            trigger={
              <Button size={"sm"} variant={"outline"}>
                <PlusIcon size={16} className="mr-2" /> Добавить
              </Button>
            }
            onItemAdd={(item) => onChange([...merchandises, item])}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {uniqueMerchandises.length ? (
          uniqueMerchandises.map((product, i) => (
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
                      const indexOfRemove = merchandises.findIndex(
                        ({ id }) => id === product.id
                      );
                      onChange(
                        merchandises.filter(
                          (_, index) => index !== indexOfRemove
                        )
                      );
                    }}
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Minus size={12} />
                  </Button>
                  {getMerchandiseCount(product.id)}
                  <Button
                    onClick={() => onChange([...merchandises, product])}
                    size={"mini"}
                    variant={"outline"}
                  >
                    <Plus size={12} />
                  </Button>
                </div>
                <div className="flex justify-center items-center">
                  <Price
                    price={product.price * getMerchandiseCount(product.id)}
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

function AddMerchandiseModal(props: {
  trigger: ReactNode;
  disabledItem: (item: MerchandiseType) => boolean;
  onItemAdd: (item: MerchandiseType) => void;
}) {
  const [loading, setLoading] = useState(true);
  const [merchandises, setMerchandises] = useState<MerchandiseType[]>([]);

  useEffect(() => {
    setLoading(true);
    fetch("/api/merchandise")
      .then((res) => res.json())
      .then((data) => setMerchandises(data.merchandises || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AddProductModal
      trigger={props.trigger}
      title={"Выберите товары"}
      products={merchandises}
      loading={loading}
      onItemAdd={props.onItemAdd}
      disabledItem={props.disabledItem}
    />
  );
}
