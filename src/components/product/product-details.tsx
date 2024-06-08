import { OrderType } from "@/service/order/types";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Separator } from "../ui/separator";
import { AddProductToCartButton } from "./add-product-to-cart-button";
import { Product } from "./types";

interface Props {
  product: Product;
  productType: keyof Pick<OrderType, "merchandises" | "amenities">;
}

export function ProductDetails({ product, productType }: Props) {
  return (
    <Card>
      <CardContent className="flex flex-row p-6">
        <div className="basis-3/4 ">
          <p className="text-xl font-semibold">{product.title}</p>
          <CardDescription>{product.description}</CardDescription>
        </div>
        <div className="border-r border-gray-300 mx-4"></div>
        <div className="basis-1/4 space-y-4">
          {product.numberInWarehouse ? (
            <div className="flex justify-between">
              <span>Количество на складе:</span>
              <span>{product.numberInWarehouse} шт</span>
            </div>
          ) : null}
          <div className="flex justify-between">
            <span>Цена:</span>
            <span className="text-lg font-semibold ">{product.price} Р</span>
          </div>
          <AddProductToCartButton
            className="w-full"
            product={product}
            productType={productType}
          />
        </div>
      </CardContent>
    </Card>
  );
}
