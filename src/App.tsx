import { useEffect, useState } from "react";
import st from "./App.module.scss";
import PlusIcon from "./assets/icons/PlusIcon";
import FormModal from "./components/form-modal/FormModal";
import TaskColumn from "./components/task-column/TaskColumn";
import TaskMeter from "./components/task-meter/TaskMeter";

import { useAppSelector } from "./redux/store";
import { Color, Status } from "./types";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const { tasks } = useAppSelector((state) => state.task);
  const blockTasks = tasks.filter((task) => task.status === Status.Block);
  const todoTasks = tasks.filter((task) => task.status === Status.Todo);
  const progressTasks = tasks.filter(
    (task) => task.status === Status.Onprogress
  );
  const doneTasks = tasks.filter((task) => task.status === Status.Done);
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }

  return (
    <div className={st.root}>
      <div className={st.top}>
        <TaskMeter doneCount={doneTasks.length} />
        <button className={st.btn} onClick={openModal}>
          <PlusIcon />
          <span>Add Task</span>
        </button>
      </div>
      <div className={st.columns}>
        <TaskColumn
          color={Color.Red}
          status={Status.Block}
          tasks={blockTasks}
        />
        <TaskColumn
          color={Color.Purple}
          status={Status.Todo}
          tasks={todoTasks}
        />
        <TaskColumn
          color={Color.Orange}
          status={Status.Onprogress}
          tasks={progressTasks}
        />
        <TaskColumn
          color={Color.Green}
          status={Status.Done}
          tasks={doneTasks}
        />
      </div>
      <FormModal open={open} closeModal={closeModal} />
    </div>
  );
}

export default App;
