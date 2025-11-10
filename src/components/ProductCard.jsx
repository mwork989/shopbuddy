"use client";
import { useQuery } from "@tanstack/react-query";
import { addToCart } from "@/lib/features/cart/cartSlice";
import { useDispatch } from "react-redux";

export default function ProductCard({ id }) {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => (await fetch(`/api/products/${id}`)).json(),
  });

  if (isLoading) return <div className="p-4">Loading…</div>;
  const p = data;
  return (
    <div className="border p-4 rounded-2xl bg-white shadow">
      <h3 className="font-semibold mb-2">{p.title}</h3>
      <button
        onClick={() => dispatch(addToCart(p))}
        className="px-3 py-1 bg-black text-white rounded"
      >
        Add
      </button>
    </div>
  );
}
