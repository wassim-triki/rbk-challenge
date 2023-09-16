"use client";
import { type } from "os";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
// define the props

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: File | null;
};

type ProfileState = ProfileFormData | null;

type UserState = {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
};

const initialState: AppState = {
  user: {
    profile: null,
    setProfile: () => {},
  },
};
const AppContext = createContext<AppState>(initialState);

type AppState = {
  user: UserState;
};

export const AppProvider = (props: PropsWithChildren) => {
  const [profile, setProfile] = useState<ProfileState>(null);

  const user = {
    profile,
    setProfile,
  };

  return (
    <AppContext.Provider value={{ user }}>{props.children}</AppContext.Provider>
  );
};

export const useUser = (): UserState => useContext(AppContext).user;
