"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiService } from "@/api/apiService";
import type { ApplicationError } from "@/types/error";

type RegistrationRequest = {
  username: string;
  password: string;
  bio: string;
  name: string;
};

type RegistrationResponse = {
  token: string;
  id: number;
  username: string;
  bio: string;
  creationDate: string;
  name: string;
};

export default function RegistrationPage() {
  const router = useRouter();
  const api = new ApiService();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleRegistration() {
    setError(null);

    try {
      const payload: RegistrationRequest = {
        username,
        password,
        bio,
        name,
      };

      const data = await api.post<RegistrationResponse>("/users", payload);

      localStorage.setItem("token", data.token);

      router.push("/profile");
    } catch (err) {
      const appErr = err as ApplicationError;
      setError(appErr?.message ?? "Registration failed.");
    }
  }

  return (
    <div>
      <h1>Register</h1>

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

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <button onClick={handleRegistration}>Register</button>
    </div>
  );
}