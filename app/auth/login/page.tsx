"use client";
import { authenticateUsingPassword } from "@/lib/supabase.auth.client";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { SessionToUse, UpdateUserContext } from "@/app/UserContext";

type FormData = {
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter();
  const UpdateUser = useContext(UpdateUserContext);

  function handleSubmit(event: any) {
    event.preventDefault();
    const formData: FormData = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    authenticateUsingPassword(formData).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }
      toast.success("Welcom back :)");
      if (res.data.session) {
        UpdateUser!(SessionToUse(res.data.session));
      }
      router.push("/");
    });

    event.target.reset();
  }

  return (
    <main className="max-w-[400px] m-auto text-gray-100 flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full gap-2"
      >
        <div className="w-full">
          <h4>Email:</h4>
          <input
            required
            type="email"
            name="email"
            className="w-full border-2 border-gray-800 text-gray-700 rounded-md p-1"
          />
        </div>
        <div className="w-full">
          <h4>Password:</h4>
          <input
            required
            type="password"
            name="password"
            className="w-full border-2 border-gray-800 text-gray-700 rounded-md p-1"
          />
        </div>
        <div className="w-full flex justify-between">
          <button
            type="submit"
            className="border-2 border-gray-800 text-gray-700 rounded-md bg-white w-full py-1"
          >
            Login
          </button>
        </div>
      </form>
      <Link
        className="text-sm text-gray-300 mt-2 underline"
        href={"/auth/sign-up"}
      >
        Sing Up
      </Link>
    </main>
  );
}
