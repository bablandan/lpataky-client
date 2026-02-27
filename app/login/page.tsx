"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiService } from "@/api/apiService";
import type { ApplicationError } from "@/types/error";

type LoginRequest = {
  username: string;
  password: string;
};


type LoginResponse = {
  token: string;
  id: number;
  username: string;
  bio: string;
  creationDate: string;
  name: string;
};


export default function LoginPage() {
  const router = useRouter();
  const api = new ApiService();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setError(null);

    try {
      const payload: LoginRequest = { username, password };

      const data = await api.post<LoginResponse>("/login", payload);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", String(data.id));

      router.push("/profile");
    } catch (err) {
      const appErr = err as ApplicationError;

      setError(appErr?.message ?? "Login failed.");
    }
  }

  return (
    <div>
      <h1>Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}