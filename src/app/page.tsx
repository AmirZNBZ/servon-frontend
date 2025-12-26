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
        <Button onClick={() => login("admin@example.com", "asdfasdf")}>Login as Admin</Button>
        <Button onClick={() => login("amir@example.com", "asdfasdf")}>Login as User</Button>
        <Button onClick={() => register("admin@example.com", "asdfasdf")}>Register as Admin</Button>
        <Button onClick={() => register("amir@example.com", "asdfasdf")}>Register as User</Button>
      </div>
    );
  }

  return (
    <>
      <div className="p-8">
        <h1>Welcome {user?.email}</h1>
        <button onClick={() => logout()}>Logout</button>
      </div>
      <ThemeToggle />
    </>
  );
}
