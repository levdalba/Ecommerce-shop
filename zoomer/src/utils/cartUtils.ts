import { toast } from 'react-toastify';

export interface Product {
  id: number;
  title: string;
  images: string[];
  price: number;
  quantity?: number;
}

export const handleAddToCart = (
  product: Product,
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  let cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  const existingItemIndex = cartItems.findIndex(
    (item: Product) => item.id === product.id
  );

  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += 1; // Increase the quantity if the product already exists
  } else {
    product.quantity = 1; // Set initial quantity if new product
    cartItems.push(product);
  }

  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  setCartItems(cartItems); // Update state
  toast.success('Product added to cart!');
};
