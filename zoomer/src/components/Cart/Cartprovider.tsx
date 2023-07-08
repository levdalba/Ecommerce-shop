import React, { createContext, useState } from "react";

export interface CartItem {
  id: number;
  title: string;
  price: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (product: CartItem) => void;
}

export const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
});

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const cartContextValue: CartContextProps = {
    cartItems,
    addToCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
