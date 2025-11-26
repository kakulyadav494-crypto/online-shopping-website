import React, { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, Banknote, Landmark, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

export const Checkout: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useApp();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    // Simulate API call
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
    }, 1500);
  };

  if (orderPlaced) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center animate-fade-in">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CreditCard className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Placed Successfully!</h1>
        <p className="text-slate-500 mb-8">Thank you for shopping with SHOPEE. Your order ID is #SHOPEE-{Math.floor(Math.random() * 10000)}.</p>
        <Link to="/shop" className="inline-block bg-[var(--color-primary)] text-white px-8 py-3 rounded-lg font-bold hover:brightness-110">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Your Cart is Empty</h1>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link to="/shop" className="text-[var(--color-primary)] font-medium hover:underline">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Review */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6">Review Order</h2>
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center space-x-4 border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-slate-100" />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.category}</p>
                    <div className="flex items-center mt-2">
                       <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
                        disabled={item.quantity <= 1}
                       >
                         <Minus className="w-4 h-4" />
                       </button>
                       <span className="mx-3 font-medium text-slate-900">{item.quantity}</span>
                       <button 
                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
                         className="p-1 rounded-md hover:bg-slate-100 text-slate-500"
                       >
                         <Plus className="w-4 h-4" />
                       </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm mt-2 flex items-center ml-auto hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary & Payment */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (5%)</span>
                <span>₹{(cartTotal * 0.05).toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-lg text-slate-900">
                <span>Total</span>
                <span>₹{(cartTotal * 1.05).toFixed(2)}</span>
              </div>
            </div>

            <h3 className="font-bold mb-4 mt-8">Payment Method</h3>
            <div className="space-y-3 mb-8">
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[var(--color-primary)] bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <CreditCard className="w-5 h-5 ml-3 mr-3 text-slate-600" />
                <span className="font-medium text-slate-700">Credit / Debit Card</span>
              </label>
              
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[var(--color-primary)] bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <Wallet className="w-5 h-5 ml-3 mr-3 text-slate-600" />
                <span className="font-medium text-slate-700">UPI / Wallet</span>
              </label>
              
              <label className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-[var(--color-primary)] bg-blue-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <Banknote className="w-5 h-5 ml-3 mr-3 text-slate-600" />
                <span className="font-medium text-slate-700">Cash on Delivery</span>
              </label>
            </div>

            <button 
              onClick={handlePlaceOrder}
              className="w-full bg-[var(--color-primary)] text-white py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-md"
            >
              Pay ₹{(cartTotal * 1.05).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};