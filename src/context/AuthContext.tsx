"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

// Model for ContextProps
interface ContextProps {
  isUserValid: boolean; //state prop
  setIsUserValid: Dispatch<SetStateAction<boolean>>; //Hook function to update state
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

// define a type that for the {children}
type AuthContextProviderProps = {
  children: React.ReactNode;
};

// Intial value for isUserValid
const AuthContextInitialValue: ContextProps = {
  isUserValid: false,
  setIsUserValid: (): boolean => false,
  isMenuOpen: false,
  setIsMenuOpen: (): boolean => false,
};

// Create AuthContext of Type ContextProps
const AuthContext = createContext<ContextProps>(AuthContextInitialValue);

/**
 * Function that return AuthContext with the Provider
 * with the values set in the value property, ex: value={{ isUserValid, setIsUserValid }}.
 * @param - all the pages within the app directory
 * @returns - AuthContext
 */
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  // state prop
  const [isUserValid, setIsUserValid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AuthContext.Provider value={{ isUserValid, setIsUserValid,  isMenuOpen, setIsMenuOpen}}>
      {children}
    </AuthContext.Provider>
  );
};

// Create custom Hook to consume the  AuthContext
export const useAuthContext = () => useContext(AuthContext);
