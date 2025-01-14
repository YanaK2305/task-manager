import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ChangeT, TaskT } from "../../types";
import { getSaveTasks } from "../../getTasks";

interface TaskState {
  tasks: TaskT[];
}

const initialState: TaskState = {
  tasks: getSaveTasks(),
};

export const taskSlice = createSlice({
  name: "task",

  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<TaskT>) => {
      state.tasks.push(action.payload);
    },
    changeStatus: (state, action: PayloadAction<ChangeT>) => {
      const task = state.tasks.find((item) => item.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        state.tasks = state.tasks.filter(
          (item) => item.id !== action.payload.id
        );
        state.tasks.push(task);
      }
    },
  },
});

export const { addTask, changeStatus } = taskSlice.actions;
export default taskSlice.reducer;
