import Link from "next/link";
import { createSupabaseForServerAction } from "@/lib/supabase.server";

export default async function Home() {
  const supabase = createSupabaseForServerAction();
  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("*");
  return (
    <main className="m-3 text-gray-100">
      <h1 className="text-xl font-semibold underline">Businesses:</h1>
      <ul className="flex flex-col gap-2 mt-2">
        {businesses?.map((business) => (
          <li
            key={business.id}
            className="border-2 border-white rounded-md p-2 mt-2"
          >
            <h1 className="text-lg font-semibold">{business.name}</h1>
            <h2 className="text-sm text-gray-300 mt-1">{business.email}</h2>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-300">
                {new Date(business.created_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <Link
                type="button"
                href={`/edit/${business.id}`}
                className="border-2 border-gray-100 rounded-md py-1 px-3 float-right"
              >
                edit
              </Link>
            </div>
          </li>
        ))}
        <Link
          type="button"
          href={"/create"}
          className="border-2 border-gray-100 rounded-md text-center py-1 float-right"
        >
          Create New Business
        </Link>
      </ul>
    </main>
  );
}
