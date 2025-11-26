import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ThemeSettings } from '../types';
import { MOCK_PRODUCTS, COLORS } from '../constants';

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  theme: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<ThemeSettings>({
    primaryColor: COLORS.blue,
    fontFamily: 'sans',
    viewMode: 'grid'
  });

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopee_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart and Apply Theme
  useEffect(() => {
    localStorage.setItem('shopee_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // Apply CSS variables for dynamic theming
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    
    // Simple way to map generic font family names to actual Tailwind classes via body class
    document.body.className = ''; // reset
    if (theme.fontFamily === 'serif') document.body.classList.add('font-serif');
    else if (theme.fontFamily === 'mono') document.body.classList.add('font-mono');
    else document.body.classList.add('font-sans');

  }, [theme]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, qty: number) => {
    if (qty < 1) return;
    setCart(prev => prev.map(item => 
      item.id === productId ? { ...item, quantity: qty } : item
    ));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const updateTheme = (settings: Partial<ThemeSettings>) => {
    setTheme(prev => ({ ...prev, ...settings }));
  };

  return (
    <AppContext.Provider value={{
      products,
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      theme,
      updateTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};