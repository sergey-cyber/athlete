"use client";

import { MerchandiseType } from "@/service/merchandise/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { useToast } from "../ui/use-toast";

const CART_STORAGE_KEY = "cart";

export type CartItemType = "merchendise" | "amenities";

export type Cartable = MerchandiseType;

type CartItem = { item: Cartable; count: number; type: CartItemType };

interface CartContextValue {
  addItem: (value: { item: Cartable; type: CartItemType }) => void;
  clearCart: () => void;
  getCartItems: (itemType: CartItemType) => CartItem[];
  getTotalCount: () => number;
  isInCart: (itemId: number, type: CartItemType) => boolean;
  removeItem: (id: number, type: CartItemType) => void;
  decrementItem: (id: number, type: CartItemType) => void;
  getTotalPrice: (itemType?: CartItemType) => number;
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

  const addItem = (value: { item: Cartable; type: CartItemType }) => {
    let newCart: CartItem[];
    if (!cart) {
      newCart = [{ item: value.item, type: value.type, count: 1 }];
    } else {
      const isExists = !!cart.find(
        ({ item, type }) => item.id === value.item.id && value.type === type
      );
      if (isExists) {
        newCart = cart.map((el) => {
          if (el.item.id === value.item.id && el.type === value.type) {
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

  const decrementItem = (id: number, type: CartItemType) => {
    if (!cart) {
      return;
    }
    const newCart = cart
      .map((el) => {
        if (el.item.id === id && type === el.type) {
          return { ...el, count: el.count - 1 };
        }
        return el;
      })
      .filter(({ count }) => count > 0);
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
    setCart(newCart);
  };

  const removeItem = (id: number, type: CartItemType) => {
    if (!cart) {
      return;
    }
    const newCart = cart.filter(
      (el) => !(el.item.id === id && el.type === type)
    );
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

  const getCartItems = (type?: CartItemType) =>
    cart?.filter((item) => (type ? item.type === type : true)) || [];

  useEffect(() => {
    setCart(getStoredCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CartContext.Provider
      value={{
        clearCart,
        getCartItems,
        getTotalPrice: (type?: CartItemType) =>
          getCartItems(type).reduce(
            (acc, { item, count }) => item.price * count + acc,
            0
          ),
        addItem,
        getTotalCount: () =>
          cart?.reduce((acc, item) => item.count + acc, 0) || 0,
        isInCart: (itemId: number, type: CartItemType) =>
          !!cart?.some(
            (cartItem) => cartItem.item.id === itemId && type === cartItem.type
          ),
        decrementItem,
        removeItem
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
