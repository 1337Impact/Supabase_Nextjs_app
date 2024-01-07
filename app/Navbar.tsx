"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [islogedIn, setIslogedIn] = useState(false);
  const router = useRouter();
  function singOut() {
    console.log("singout");
    supabaseForClientComponent.auth.signOut();
    setIslogedIn(false);
  }
  useEffect(() => {
    supabaseForClientComponent.auth.getSession().then(({ data }) => {
      if (data.session) {
        setIslogedIn(true);
        router.refresh();
      }
    });
  }, [router, islogedIn]);
  return (
    <div className="mx-4 h-[80px] flex justify-between items-center text-gray-100">
      <Link className="text-lg" href={"/"}>Home</Link>
      {islogedIn ? (
        <button
          className="border-2 rounded-md border-gray-100 px-3 py-1"
          onClick={singOut}
        >
          Logout
        </button>
      ) : (
        <Link
          href="/auth/login"
          className="border-2 rounded-md border-gray-100 px-3 py-1"
        >
          Login
        </Link>
      )}
    </div>
  );
}
