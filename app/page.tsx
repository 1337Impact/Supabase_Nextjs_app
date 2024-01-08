import Link from "next/link";
import { createSupabaseForServerAction } from "@/lib/supabase.server";
import Businesses, { Business } from "./Businesses";

export default async function Home() {
  const supabase = createSupabaseForServerAction();
  const { data, error } = await supabase.from("businesses").select("*");
  const businesses: Business[] = data!.reverse();

  return (
    <main className="m-3 text-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold underline">Businesses:</h1>
        <Link
          type="button"
          href={"/create"}
          className="border-2 border-gray-100 rounded-md text-center py-1 px-2 mt-2 float-right"
        >
          Create New Business
        </Link>
      </div>
      <Businesses businesses={businesses} />
    </main>
  );
}
