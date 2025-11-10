import {   verifyJWT, COOKIE_NAME, ROLES } from "@/lib/auth";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'; 
export const dynamic = "force-dynamic";

export default async function Dashboard({ params }) {
 const { locale } = await params;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  const user = token ? verifyJWT(token) : null;
  if (!user || user.role !== ROLES.ADMIN) {
    return <div>Forbidden</div>;
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <form
        action={async (formData) => {
          "use server";
          const title = formData.get("title");
          const price = Number(formData.get("price"));
          await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/products`,
            {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                title,
                price,
                image: "https://picsum.photos/seed/new/600/400",
              }),
            }
          );
        }}
      >
        <div className="flex gap-2">
          <input name="title" placeholder="Title" className="border p-2" />
          <input name="price" placeholder="Price" className="border p-2" />
          <button className="px-4 py-2 bg-green-700 text-white rounded">
            Add
          </button>
        </div>
      </form>
    </section>
  );
}
