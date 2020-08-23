import { createContext } from "react";

const AuthContext = createContext({
  id: null,
  setId: null,
});

export default AuthContext;
