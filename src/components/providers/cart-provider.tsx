"use client";

import { MerchandiseType } from "@/service/merchandiseService/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useToast } from "../ui/use-toast";

const CART_STORAGE_KEY = "cart";
const CART_STORAGE_EVENT = "cart-storage-changed";

type ItemType = "merchendise";

type Item = MerchandiseType;

type CartItem = { item: Item; count: number; type: ItemType };

interface CartContextValue {
  addItem: (value: { item: Item; type: ItemType }) => void;
  clearCart: () => void;
  getCartItems: (itemType?: ItemType) => CartItem[];
  getTotalCount: () => number;
  isInCart: (item?: Item) => boolean;
  removeItem: (id: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export const useCartStorage = () => {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("Cart context error!");
  }

  return value;
};

export function CartContextProvider({ children }: PropsWithChildren) {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[] | null>(null);

  const addItem = (value: { item: Item; type: ItemType }) => {
    let newCart: CartItem[];
    if (!cart) {
      newCart = [{ item: value.item, type: value.type, count: 1 }];
    } else {
      const exists = cart.find(({ item }) => item.id === value.item.id)?.item;
      if (exists) {
        newCart = cart.map((el) => {
          if (el.item.id === exists.id) {
            return { ...el, count: el.count + 1 };
          }
          return el;
        });
      } else {
        newCart = [...cart, { ...value, count: 1 }];
      }
    }
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    setCart(newCart);
  };

  const removeItem = (id: number) => {
    if (!cart) {
      return;
    }
    let newCart: CartItem[];
    newCart = cart
      .map((el) => {
        if (el.item.id === id) {
          return { ...el, count: el.count - 1 };
        }
        return el;
      })
      .filter(({ count }) => count > 0);
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    setCart(newCart);
  };

  const clearCart = () => {
    window.localStorage.removeItem(CART_STORAGE_KEY);
    setCart([]);
  };

  function getStoredCart(): CartItem[] | null {
    try {
      const item = window.localStorage.getItem(CART_STORAGE_KEY);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      // Обработка ошибок парсинга JSON
      console.error("Ошибка при получении значения из Local Storage:", error);
      toast({
        title: "Произошла ошибка.",
        description:
          "Попробуйте очистить историю браузера и перезагрузить страницу.",
        variant: "destructive"
      });
      return null;
    }
  }

  useEffect(() => {
    setCart(getStoredCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider
      value={{
        clearCart,
        getCartItems: (type?: ItemType) =>
          cart?.filter((item) => (type ? item.type === type : true)) || [],
        addItem,
        getTotalCount: () =>
          cart?.reduce((acc, item) => item.count + acc, 0) || 0,
        isInCart: (item?: Item) =>
          !!cart?.some((cartItem) => cartItem.item.id === item?.id),
        removeItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
