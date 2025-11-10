import Image from "next/image";

export const revalidate = 60;

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`,
    { next: { revalidate: 60 } }
  );
  return res.json();
}

export default async function Home({ params }) {
  const products = await getProducts();
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((p) => (
        <a
          key={p.id}
          href={`/${params.locale}/products/${p.id}`}
          className="rounded-2xl shadow bg-white overflow-hidden"
        >
          <div className="relative h-48">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(max-width:768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-600">₹{p.price}</p>
          </div>
        </a>
      ))}
    </div>
  );
}
