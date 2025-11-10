export const dynamic = "force-dynamic";

async function getProduct(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  if (!product) return <div>Not found</div>;
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="mb-4">₹{product.price}</p>
      <form action={`/${params.locale}/cart`} method="GET">
        <button className="px-4 py-2 rounded bg-black text-white">
          Add to cart (Redux demo on Cart page)
        </button>
      </form>
    </section>
  );
}
