"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useToast } from "../ui/use-toast";
import { OrderType } from "@/service/order/types";
import { MerchandiseType } from "@/service/merchandise/types";
import { AmenitiesType } from "@/service/amenities/types";

/**
 * Контекст для хранения данных заявки до момента её оформления.
 * Данные хранятся в localStarage и синхронизируются со стэйтом при инициализации приложения
 * Данные удаляются при оформлении заявки.
 */
type StoredOrder = Partial<OrderType>;

interface OrderStorage {
  get: <K extends keyof StoredOrder>(key: K) => StoredOrder[K];
  set: <K extends keyof StoredOrder>(key: K, value: StoredOrder[K]) => void;
  addMerchandise: (value: MerchandiseType) => void;
  deleteMerchandise: (id: number) => void;
  addAmenities: (value: AmenitiesType) => void;
  deleteAmenities: (id: number) => void;
  clear: () => void;
}

const ORDER_STORAGE_KEY = "order";

const OrderContext = createContext<OrderStorage | null>(null);

export const useOrderStorage = () => {
  const value = useContext(OrderContext);

  if (!value) {
    throw new Error("Order context error!");
  }
  return value;
};

export function OrderContextProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const [order, setOrder] = useState<StoredOrder>({});

  const orderOnChange = (key: keyof OrderType, value: any) => {
    const newOrder = { ...order, [key]: value };
    window.localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(newOrder));
    setOrder(newOrder);
  };

  function getStoredOrder(): StoredOrder {
    try {
      const item = window.localStorage.getItem(ORDER_STORAGE_KEY);
      return item ? JSON.parse(item) : {};
    } catch (error) {
      // Обработка ошибок парсинга JSON
      console.error("Ошибка при получении значения из Local Storage:", error);
      toast({
        title: "Произошла ошибка.",
        description:
          "Попробуйте очистить историю браузера и перезагрузить страницу.",
        variant: "destructive"
      });
      return {};
    }
  }

  useEffect(() => {
    setOrder(getStoredOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OrderContext.Provider
      value={{
        get: (key) => order[key],
        set: (key, value) => {
          orderOnChange(key, value);
        },
        addMerchandise: (merchendise) =>
          orderOnChange("merchandises", [
            ...(order.merchandises || []),
            merchendise
          ]),
        deleteMerchandise: (id: number) =>
          orderOnChange(
            "merchandises",
            (order.merchandises || []).filter((item) => item.id !== id)
          ),
        addAmenities: (amenities) =>
          orderOnChange("amenities", [...(order.amenities || []), amenities]),
        deleteAmenities: (id: number) =>
          orderOnChange(
            "amenities",
            (order.amenities || []).filter((item) => item.id !== id)
          ),
        clear: () => {
          window.localStorage.removeItem(ORDER_STORAGE_KEY);
          setOrder({});
        }
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
