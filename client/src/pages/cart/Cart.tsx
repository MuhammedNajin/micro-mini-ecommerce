import React, { useState } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, name: 'Smartphone', price: 15000, quantity: 1 },
    { id: 2, name: 'Laptop', price: 50000, quantity: 1 },
    { id: 3, name: 'Headphones', price: 2000, quantity: 2 },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flipkart Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-4 pb-2 border-b">
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-gray-600">₹{item.price}</p>
            </div>
            <div className="flex items-center">
              <button 
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button 
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <button 
                className="ml-4 text-red-500"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="mt-4 text-xl font-bold">
          Total: ₹{total}
        </div>
      </div>
    </div>
  );
};

export default Cart;