import { fetchData } from "./utils";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://hydnouhhsiepvjmpetxv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5ZG5vdWhoc2llcHZqbXBldHh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MjY1NjQsImV4cCI6MjA1MjIwMjU2NH0.5K14-F-RX9XrK6Zti7vB7K6-d9GH-IzGnEC--52mpDg"
);

export interface User {
  id: number;
  created_at: string;
  username: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  role: string;
  image_url: string;
  caption: string;
}

const getUsers = async () => {
  const users: User[] = await fetchData("/users");
  return users;
};

export { getUsers };
