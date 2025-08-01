import { create } from 'zustand';
import { createTableSlice } from './table-slice';

const useStore = create((set) => ({
  ...createTableSlice(set),
}));

export default useStore;
