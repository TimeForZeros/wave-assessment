import type { SortingState } from '@tanstack/react-table';

export interface TableSlice {
  globalFilter: string;
  setGlobalFilter: (filter: string) => void;
  sorting: SortingState;
  setSorting: (sorting: SortingState) => void;
}

export type SetState<T> = (partial: Partial<T>) => void;

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export interface TableSlice {
  users: User[];
  setUsers: (updatedUsers: User[]) => void;
  addUser: (newUser: User) => void;
}

export const createTableSlice = (set: SetState<TableSlice>): TableSlice => ({
  globalFilter: '',
  sorting: [],
  setGlobalFilter: (filter: string) => set({ globalFilter: filter }),
  users: [],
  setSorting: (sorting: SortingState) => set({ sorting }),
  setUsers: (userArr) =>
    set({
      users: userArr,
    }),

addUser: (userFormData: User) => set((state) => ({
      users: [...state.users, { ...userFormData, id: state.users.length + 1 }],
    })),
});


  // addUser: (userFormData: User) =>
  //   set((state: UsersState) => {
  //     return {
  //       users: [...state.users, { ...userFormData, id: state.users.length + 1 }],
  //     };
  //   }),