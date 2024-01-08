"use client";
import Link from "next/link";
import { Database } from "../lib/database.types";
import { useContext, useEffect, useState } from "react";
import { supabaseForClientComponent as supabase } from "@/lib/supabase.client";
import { UserContext } from "./UserContext";

export type Business = Database["public"]["Tables"]["businesses"]["Row"];

export default function Businesses({ businesses }: { businesses: Business[] }) {
  const [data, setData] = useState<Business[]>(businesses);
  const user = useContext(UserContext);

  useEffect(() => {
    supabase
      .from("businesses")
      .select()
      .then((res) => {
        const { data, error } = res;
        setData(data!.reverse());
      });
  }, [user]);

  return (
    <ul className="flex flex-col gap-2 mt-2">
      {data?.map((business) => (
        <li
          key={business.id}
          className="border-2 border-white rounded-md p-3 mt-2 bg-gray-700 shadow-md shadow-gray-400"
        >
          <h1 className="text-lg font-semibold">{business.name}</h1>
          <h2 className="text-sm text-gray-300 mt-1">{business.email}</h2>
          <div className="flex justify-between items-center mt-1">
            <p className="text-sm text-gray-300">
              {new Date(business.created_at).toLocaleDateString("en-US", {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {business.user_id === user?.id && (
              <Link
                type="button"
                href={`/edit/${business.id}`}
                className="border-2 border-gray-100 rounded-md py-1 px-3 float-right"
              >
                edit
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
