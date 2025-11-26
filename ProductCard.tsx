import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const { addToCart } = useApp();

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-row border border-slate-100 group">
        <div className="w-48 h-48 shrink-0 overflow-hidden">
           <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="text-xs font-semibold text-[var(--color-primary)] mb-1 uppercase tracking-wider">{product.category}</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{product.name}</h3>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-slate-900">₹{product.price.toFixed(2)}</span>
            <button 
              onClick={() => addToCart(product)}
              className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary)] transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-slate-100 group">
      <div className="relative h-64 overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center shadow-sm">
          <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
          <span className="text-xs font-bold text-slate-700">{product.rating}</span>
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={() => addToCart(product)}
              className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-slate-900 px-6 py-2 rounded-full font-medium shadow-lg hover:bg-[var(--color-primary)] hover:text-white"
            >
              Quick Add
            </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="text-xs font-semibold text-[var(--color-primary)] mb-1 uppercase tracking-wider">{product.category}</div>
        <h3 className="text-base font-bold text-slate-800 mb-2 line-clamp-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-slate-900">₹{product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="text-slate-400 hover:text-[var(--color-primary)] transition-colors"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};