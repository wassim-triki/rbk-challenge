"use client";
import { type } from "os";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { SocialPlatforms } from "../components/LinksForm";
// define the props

export type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: File | null;
};

type LinkItem = {
  platform: SocialPlatforms;
  link: string;
};

type ProfileState = ProfileFormData | null;

type UserState = {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState>>;
};
type ItemsState = {
  list: LinkItem[];
  setList: React.Dispatch<React.SetStateAction<LinkItem[]>>;
};

const initialState: AppState = {
  user: {
    profile: null,
    setProfile: () => {},
  },
  items: {
    list: [],
    setList: () => {},
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

  const user = {
    profile,
    setProfile,
  };

  const items = {
    list,
    setList,
  };

  return (
    <AppContext.Provider value={{ user, items }}>
      {props.children}
    </AppContext.Provider>
  );
};

export const useUser = (): UserState => useContext(AppContext).user;
export const useItems = (): ItemsState => useContext(AppContext).items;
