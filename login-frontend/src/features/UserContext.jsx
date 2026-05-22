import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({ loggedIn: false });

const Context = ({ children }) => {
  const [user, setUser] = useState(() => ({ loggedIn: true }));

  //get user
  useEffect(() => {}, []);

  return <UserContext value={user}>{children}</UserContext>;
};

export default Context;
