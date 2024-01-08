"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { UpdateUserContext, UserContext } from "./UserContext";

export default function Navbar() {
  const router = useRouter();
  const user = useContext(UserContext);
  const UpdateUser = useContext(UpdateUserContext);

  function singOut() {
    supabaseForClientComponent.auth.signOut();
    UpdateUser!(undefined);
    router.push("/");
  }

  return (
    <div className="mx-4 h-[80px] flex justify-between items-center text-gray-100">
      <Link className="text-lg hover:underline" href={"/"}>
        Home
      </Link>
      {user ? (
        <button
          className="border-2 rounded-md border-gray-100 px-3 py-1 hover:bg-gray-600"
          onClick={singOut}
        >
          Logout
        </button>
      ) : (
        <Link
          href="/auth/login"
          className="border-2 rounded-md border-gray-100 px-3 py-1 hover:bg-gray-600"
        >
          Login
        </Link>
      )}
    </div>
  );
}
