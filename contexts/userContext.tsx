import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

interface userContextData {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  ordinalsAddress: string;
  setOrdinalsAddress: React.Dispatch<React.SetStateAction<string>>;
  signOut: () => void;
}

const defaultContextData: userContextData = {
  isConnected: false,
  setIsConnected: () => {},
  ordinalsAddress: "",
  setOrdinalsAddress: () => {},
  signOut: () => {},
};

const UserContext = createContext<userContextData>(defaultContextData);

export const useUserContext = () => useContext(UserContext);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [ordinalsAddress, setOrdinalsAddress] = useState<string>("");

  const signOut = () => {
    setIsConnected(false);
    setOrdinalsAddress("");
    Cookies.remove("ordinalsAddress");
  };

  return (
    <UserContext.Provider
      value={{
        isConnected,
        setIsConnected,
        ordinalsAddress,
        setOrdinalsAddress,
        signOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
