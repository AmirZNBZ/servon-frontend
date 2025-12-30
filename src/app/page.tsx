"use client";

import ThemeToggle from "../components/atoms/ThemeToggle";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function Home() {
  const { isLoading, logout, user } = useAuth();

  if (isLoading) return <div>loading...</div>;

  return (
    <>
      {user && (
        <div className="p-8">
          <h1>Welcome {user?.email}</h1>
          <button onClick={() => logout()}>Logout</button>
        </div>
      )}
      <ThemeToggle />
    </>
  );
}
