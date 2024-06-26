import React, { createContext, useState, useEffect } from 'react';
export interface CartItem {
  images: any;
  id: number;
  title: string;
  price: number;
  quantity: number;
  active: boolean;
}

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: CartItem) => void;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
  addToCart: () => {},
});

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    );
    setCartItems(storedCartItems);
  }, []);

  const addToCart = (item: CartItem) => {
    const newCartItem = { ...item, id: Date.now() };
    const updatedCart = [...cartItems, newCartItem];
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart)); // Update local storage
  };

  const contextValue: CartContextType = {
    cartItems,
    setCartItems,
    addToCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
