"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL!;

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(stored));
  }, [router]);

  async function logout() {
    await fetch(`${BASE}/logout`, {
      method: "PUT",
    });

    localStorage.removeItem("user");
    router.push("/login");
  }

  if (!user) return null;

  return (
    <div>
      <h1>Profile</h1>

      <p>Username: {user.username}</p>
      <p>Bio: {user.bio}</p>
      <p>Created: {user.creationDate}</p>

      <button onClick={logout}>Logout</button>
    </div>
  );
}