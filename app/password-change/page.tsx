"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiService } from "@/api/apiService";
import type { ApplicationError } from "@/types/error";



export default function ChangePasswordPage() {

  const router = useRouter();
  const api = new ApiService();

  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);


  async function handlePasswordChange() {
    setError(null);

    try {
      const payload = {
        newPassword: password
      };
      const userId = localStorage.getItem("userId");
      await api.put<void>("/users/${userId}", payload);
      localStorage.removeItem("token");
      router.push("/login"); 
    } catch(err) {
      const appErr = err as ApplicationError;
      setError(appErr?.message ?? "Password change failed.");
    }
  }

  return (
    <div style={{ textAlign: "center", marginTop: "200px" }}>
      <h1>Profile</h1>
      <p
        style={{
          fontSize: "80px",
          fontWeight: "bold",
          color: "black",
        }}
      >
        You can change your password here.
      </p>

      <input
        placeholder="new password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handlePasswordChange}>Change!</button>


    </div>
  );
}