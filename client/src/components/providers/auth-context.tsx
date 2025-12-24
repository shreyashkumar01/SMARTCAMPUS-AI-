"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import { redirect } from "next/navigation";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  require,
}: {
  children: React.ReactNode;
  require?: boolean | null;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      // Firebase not configured, simulate logged in for demo
      setUser({} as User); // Fake user
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      setLoading(false);
      if (!user && require) {
        redirect("/login");
      }
    });

    return () => unsub();
  }, []);

  const signup = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not configured");
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error("Firebase not configured");
    await signInWithEmailAndPassword(auth, email, password);
  };
  const logout = async () => {
    if (!auth) {
      // Fake logout
      setUser(null);
      redirect("/");
      return;
    }
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
