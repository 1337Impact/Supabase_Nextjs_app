"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseForClientComponent as supabase } from "@/lib/supabase.client";
import { toast } from "react-toastify";

export default function Edit() {
  const router = useRouter();

  const [name, setName] = useState("");

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
    };
    supabase
      .from("businesses")
      .insert(formData)
      .then((res) => {
        const { data, error } = res;
        if (error) {
          toast.error("Error creating business :(");
          return;
        }
        toast.success("Business created successfully!");
        router.push("/");
      });
  }

  return (
    <main className="max-w-[400px] m-auto text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full h-screen gap-2"
      >
        <div className="w-full">
          <h4>Business Name:</h4>
          <input
            required
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-gray-800 text-gray-700 rounded-md p-1"
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            onClick={() => router.push("/")}
            className="border-2 border-gray-800 text-gray-700 rounded-md bg-red-400 w-[100px] py-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="border-2 border-gray-800 text-gray-700 rounded-md bg-white w-[100px] py-1"
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
