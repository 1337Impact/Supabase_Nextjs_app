"use client";
import { supabaseForClientComponent } from "@/lib/supabase.client";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export type User = {
  id: String;
  email: String;
  full_name: String;
  created_at: String;
};

export const UserContext = createContext<User | undefined>(undefined);

export const UpdateUserContext = createContext<
  Dispatch<SetStateAction<User | undefined>> | undefined
>(undefined);


export function SessionToUse(session : Session) : User {
    const user = {
      id: session.user.id,
      email: session.user.email as string,
      full_name: session.user.user_metadata.full_name,
      created_at: session.user.created_at,
    };
    return user;
}


export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {

    supabaseForClientComponent.auth.getSession().then(({ data }) => {
      const session: Session | null = data.session;
      if (session) {
        setUser(SessionToUse(session));
      }
      router.refresh();
    });

  }, []);

  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={setUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
}
