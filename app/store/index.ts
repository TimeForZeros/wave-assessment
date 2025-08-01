import { create } from 'zustand';
import { createTableSlice, type TableSlice } from './table-slice';
export { type User } from './table-slice';
export type GlobalState = TableSlice;

const useStore = create<GlobalState>()((set, get, store) => ({
  ...createTableSlice(set, get, store),
}));

export default useStore;
