// your code here for S2 to display a single user profile after having clicked on it
// each user has their own slug /[id] (/1, /2, /3, ...) and is displayed using this file
// try to leverage the component library from antd by utilizing "Card" to display the individual user
// import { Card } from "antd"; // similar to /app/users/page.tsx

"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useApi } from "@/hooks/useApi";
import { User } from "@/types/user";
import type { ApplicationError } from "@/types/error";
import { Button, Card, Table } from "antd";
import React from "react";
// For components that need React hooks and browser APIs,
// SSR (server side rendering) has to be disabled.
// Read more here: https://nextjs.org/docs/pages/building-your-application/rendering/server-side-rendering


const Profile: React.FC = () => {
  const router = useRouter();
  const apiService = useApi();
  const params = useParams<{id: string}>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const id = params?.id;
    if(!id) return;

    const fetchUser = async () => {
      try {
        const user = await apiService.get<User>(`/users/${id}`);
        setUser(user);
        console.log("Fetched user:", user);
      } catch (error) {
        if (error instanceof Error) {
          alert(`Something went wrong while fetching users:\n${error.message}`);
        } else {
          console.error("An unknown error occurred while fetching users.");
        }
      }
    };

    fetchUser();
  }, [apiService]);  

  return (
    <div className="card-container" style={{ padding: 24 }}>
      <Button onClick={() => router.push("/users")} style={{ marginBottom: 16 }}>
        Back to users
      </Button>

      <Card title="User Profile">
        {user && (
          <div style={{ display: "grid", gap: 8 }}>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Status:</strong> {user.status}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {user.creationDate ? new Date(user.creationDate).toLocaleString() : "-"}
            </p>
            <p>
              <strong>Bio:</strong> {user.bio || "-"}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};


export default Profile;
