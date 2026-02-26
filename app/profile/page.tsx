"use client";

import { useRouter } from "next/navigation";
import { ApiService } from "@/api/apiService";

export default function ProfilePage() {
  const router = useRouter();
  const api = new ApiService();

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
    </div>
  );
}