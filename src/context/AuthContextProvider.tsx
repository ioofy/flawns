import React, { createContext, useState, useEffect } from "react";
import { useMeQuery } from "generated/graphql";

// same as gql data
interface UserContext {
  __typename: "User";
  id: string;
  username?: string;
  name: string;
  email?: string;
  bio?: string;
  slug?: string;
  avatarUrl?: string;
  isCreator: boolean;
  profession?: {
    __typename?: "Profession";
    id: string;
    role: string;
  }[];
}

interface Props {}
interface AuthContextValues {
  authAction: Actions;
  handleAuthAction: HandleAuthAction;
  loggedInUser: UserContext | null;
  setAuthUser: (user: UserContext | null) => void;
}

type Actions = "signin" | "signup" | "close";
type HandleAuthAction = (action: Actions) => void;

// initial state first
const InitialState: AuthContextValues = {
  authAction: "close",
  handleAuthAction: () => {},
  loggedInUser: null,
  setAuthUser: () => {},
};

export const AuthContext = createContext<AuthContextValues>(InitialState);

const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [authAction, setAuthAction] = useState<Actions>("close");
  const [loggedInUser, setLoggedInUser] = useState<UserContext | null>(null);

  const { data } = useMeQuery();

  useEffect(() => {
    // if data exist
    if (data?.me) setLoggedInUser(data?.me);
  }, [data?.me]);

  const handleAuthAction: HandleAuthAction = (action) => {
    setAuthAction(action);
  };

  const setAuthUser = (user: UserContext | null) => {
    setLoggedInUser(user);
  };

  // console.log("User as ", loggedInUser);

  return (
    <AuthContext.Provider
      value={{ authAction, handleAuthAction, loggedInUser, setAuthUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
