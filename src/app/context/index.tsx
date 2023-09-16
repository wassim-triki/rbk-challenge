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

export type LinkItem = {
  // platform: "Github" | "Youtube" | "LinkedIn";
  platform: string;
  link: string;
  initIndex: number;
  id: string;
};

type ProfileState = ProfileFormData | null;

type UserState = {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
};
type ItemsState = {
  list: LinkItem[];
  savedList: LinkItem[];
  setList: React.Dispatch<React.SetStateAction<LinkItem[]>>;
  setSavedList: React.Dispatch<React.SetStateAction<LinkItem[]>>;
};

const initialState: AppState = {
  user: {
    profile: null,
    setProfile: () => {},
  },
  items: {
    list: [],
    savedList: [],
    setList: () => {},
    setSavedList: () => {},
  },
};

export const AppContext = createContext<AppState>(initialState);

type AppState = {
  user: UserState;
  items: ItemsState;
};

export const AppProvider = (props: PropsWithChildren) => {
  const [profile, setProfile] = useState<ProfileState>(null);
  const [list, setList] = useState<LinkItem[]>([]);
  const [savedList, setSavedList] = useState<LinkItem[]>([]);

  const user = {
    profile,
    setProfile,
  };

  const items = {
    list,
    setList,
    savedList,
    setSavedList,
  };

  return (
    <AppContext.Provider value={{ user, items }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useUser = (): UserState => useContext(AppContext).user;
export const useItems = (): ItemsState => useContext(AppContext).items;
