import { fetchData } from "./utils";

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
