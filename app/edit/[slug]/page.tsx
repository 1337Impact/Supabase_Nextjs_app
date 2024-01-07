"use client";
import { supabaseForClientComponent as supabase } from "@/lib/supabase.client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Edit({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const [name, setName] = useState("");
  useEffect(() => {
    supabase
      .from("businesses")
      .select()
      .eq("id", params.slug)
      .then((res) => {
        const { data, error } = res;
        setName(data![0].name);
      });
  }, []);

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData = {
      name: event.target.name.value,
    };
    supabase
      .from("businesses")
      .update(formData)
      .eq("id", params.slug)
      .then((res) => {
        const { data, error } = res;
        if (error) {
          toast.error("Error updating business :(");
          return;
        }
        toast.success("Business updated successfully!");
        console.log(res);
        router.push("/");
      });
  }
  function deleteBusiness() {
    supabase
    .from("businesses")
    .delete()
    .eq("id", params.slug)
    .then((res) => {
      const { data, error } = res;
      if (error) {
        toast.error("Error deleting business :(");
        return;
      }
      toast.success("Business deleted successfully!");
      console.log(res);
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
            className="border-2 border-gray-800 text-gray-700 rounded-md bg-green-400 w-[100px] py-1"
          >
            Cancel
          </button>
          <button
            onClick={deleteBusiness}
            className="border-2 border-gray-800 text-gray-700 rounded-md bg-red-400 w-[100px] py-1"
          >
            Delete
          </button>
          <button
            type="submit"
            className="border-2 border-gray-800 text-gray-700 rounded-md bg-white w-[100px] py-1"
          >
            Edit
          </button>
        </div>
      </form>
    </main>
  );
}
