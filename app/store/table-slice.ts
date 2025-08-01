import type { SortingState } from '@tanstack/react-table';
import { type StateCreator } from 'zustand';

export interface TableSlice {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
}

type Geo = {
  lat: string;
  lng: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
};


export interface TableSlice {
  globalFilter: string;
  localUsers: User[];
  fetchedUsers: User[];
  users: User[];
  sorting: SortingState;
  setGlobalFilter: (filter: string) => void;
  setUsers: (updatedUsers: User[]) => void;
  setSorting: (sorting: SortingState) => void;
  addUser: (newUser: Omit<User, 'id'>) => void;
}

export const createTableSlice: StateCreator<TableSlice> = (set, get, store): TableSlice => ({
  globalFilter: '',
  sorting: [],
  localUsers: [],
  fetchedUsers: [],
  setGlobalFilter: (filter) => set({ globalFilter: filter }),
  users: [],
  setSorting: (sorting) => set({ sorting }),
  setUsers: (userArr) =>
    set({
      fetchedUsers: [...userArr],
      users: [...userArr, ...get().localUsers],
    }),
  addUser: (userFormData) => {
    set({ localUsers: [...get().localUsers, { ...userFormData, id: get().users.length + 1 }] });
    set({
      users: [...get().fetchedUsers, ...get().localUsers],
    });
  },
});
