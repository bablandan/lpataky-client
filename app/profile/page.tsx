"use client";

import { useRouter } from "next/navigation";
import { ApiService } from "@/api/apiService";
import { useState } from "react";
import type { ApplicationError } from "@/types/error";

export default function ProfilePage() {
  const router = useRouter();
  const api = new ApiService();
  const [error, setError] = useState<string | null>(null);

  async function handleLogout(){
    setError(null);

    try {
      await api.put<void>("/logout");
      localStorage.removeItem("token");
      router.push("/login"); 
    } catch(err) {
      setError("Logout failed");
    }
    
  }

  async function handlePasswordChange(){
    router.push("/password-change");
  }

  async function handleUserProfiles(){
    router.push("/users");
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
        You are logged in.
      </p>

      <button onClick={handleLogout}>Logout</button>
      <button onClick={handlePasswordChange}>Change Password</button>
      <button onClick={handleUserProfiles}>User profiles</button>
    </div>
  );
}