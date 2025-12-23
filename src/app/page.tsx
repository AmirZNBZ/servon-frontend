"use client";

import { Button } from "../components/atoms/Button";
import ThemeToggle from "../components/atoms/ThemeToggle";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function Home() {
  const { isAuthenticated, isLoading, login, logout, user, register } = useAuth();

  if (isLoading) return <div>loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="flex gap-4">
        <h1>not logged in</h1>
        <Button onClick={() => login("amir@example.com", "asdfasdf")}>Login</Button>
        <Button onClick={() => register("amir@example.com", "asdfasdf")}>Register</Button>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <h1>Welcome {user?.userId}</h1>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <ThemeToggle />
    </>
  );
}
