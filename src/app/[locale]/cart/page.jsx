"use client";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, clearCart } from "@/lib/features/cart/cartSlice";

export default function CartPage() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Cart</h1>
      <div className="flex gap-2">
        <button
          onClick={() =>
            dispatch(addToCart({ id: "p3", title: "LED Lamp", price: 1299 }))
          }
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add Lamp
        </button>
        <button
          onClick={() => dispatch(clearCart())}
          className="px-3 py-1 bg-gray-800 text-white rounded"
        >
          Clear
        </button>
      </div>
      <ul className="list-disc pl-6">
        {items.map((i) => (
          <li key={i.id}>
            {i.title} × {i.qty} — ₹{i.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
