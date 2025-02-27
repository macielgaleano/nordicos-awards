import { useEffect, useState } from "react";

export default function useSession() {
  interface User {
    name?: string;
    image_url?: string;
    lastname?: string;
  }

  const keySession = "session";
  const [dataUser, setDataUser] = useState<User>({});
  useEffect(() => {
    const session = localStorage.getItem(keySession);
    if (session) {
      setDataUser(JSON.parse(session));
    }
  }, []);

  const setUser = (user: User) => {
    localStorage.setItem(keySession, JSON.stringify(user));
    setDataUser(user);
  };

  const clearSession = () => {
    setDataUser({});
    localStorage.removeItem(keySession);
  };

  return { dataUser, clearSession, setUser };
}
