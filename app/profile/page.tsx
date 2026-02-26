"use client";

import { useRouter } from "next/navigation";
import { ApiService } from "@/api/apiService";

export default function ProfilePage() {
  const router = useRouter();
  const api = new ApiService();

  async function handleLogout() {
    try {
      await api.put("/logout");

      localStorage.removeItem("token");

      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
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
        You are logged in.
      </p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}