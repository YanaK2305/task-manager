import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface TaskState {
  tasks: any[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
  name: "task",

  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<any>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
