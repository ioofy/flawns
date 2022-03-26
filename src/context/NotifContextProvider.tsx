// import { usePostQuery } from "generated/graphql";
import React, { createContext, useState } from "react";

interface NotifContextProps {
  children: React.ReactNode;
}

// data from gql
interface NotifContext {
  id: string;
  text: string;
  __typename: "Comment";
  user: {
    id: string;
    username: string;
    name: string;
    __typename: "User";
  };
  post: {
    id: string;
    content: string;
    __typename: "Post";
  };
}

interface NotifContextValues {
  dataCommentNotif: NotifContext[];
  setDataCommentNotif?: React.Dispatch<
    React.SetStateAction<NotifContext[] | []>
  >;
}

const InitialState: NotifContextValues = {
  dataCommentNotif: [],
};

export const NotifContext = createContext<NotifContextValues>(InitialState);

const NotifContextProvider: React.FC<NotifContextProps> = ({ children }) => {
  const [dataCommentNotif, setDataCommentNotif] = useState<NotifContext[] | []>(
    []
  );

  // const { data } = usePostQuery;

  // useEffect(() => {}, []);

  return (
    <NotifContext.Provider
      value={{
        dataCommentNotif,
        setDataCommentNotif,
      }}
    >
      {children}
    </NotifContext.Provider>
  );
};

export default NotifContextProvider;
