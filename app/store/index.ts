import { create, type StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createTableSlice, type TableSlice } from './table-slice';
export { type User } from './table-slice';
export type GlobalState = TableSlice;

const aggregateSlices: StateCreator<GlobalState, []> = (set, get, store) => ({
  ...createTableSlice(set, get, store),
});
const useStore = create<GlobalState>()(
  persist(aggregateSlices, {
    name: 'local-users', // This is the key in localStorage
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      fetchedUsers: state.fetchedUsers,
      localUsers: state.localUsers,
    }),
  }),
);

export default useStore;
