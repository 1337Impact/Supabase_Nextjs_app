"use client";
import { signupUsingPassword } from "@/lib/supabase.auth.client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormData = {
  full_name: string;
  email: string;
  password: string;
};

export default function SignUpPage() {
  const router = useRouter();

  function handleSubmit(event: any) {
    event.preventDefault();

    const formData: FormData = {
      full_name: event.target.full_name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    signupUsingPassword(formData).then((res) => {
      if (res.error) {
        toast.error(res.error.message);
        return;
      }
      toast.success("We've sent you an email to confirm your account!");
      router.push("/auth/login");
    });
  }

  return (
    <main className="max-w-[400px] m-auto text-gray-100 flex flex-col items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-full gap-2"
      >
        <div className="w-full">
          <h4>Full Name:</h4>
          <input
            required
            type="text"
            name="full_name"
            className="w-full border-2 border-gray-800 text-gray-700 rounded-md p-1"
          />
        </div>
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
            Sign Up
          </button>
        </div>
      </form>
      <Link
        className="text-sm text-gray-300 mt-2 underline"
        href={"/auth/login"}
      >
        Login
      </Link>
    </main>
  );
}
