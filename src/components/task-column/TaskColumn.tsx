import st from "./TaskColumn.module.scss";
import Task from "../task/Task";
import classNames from "classnames";
import { Color, Status, TaskT } from "../../types";
import { useDrop } from "react-dnd";
import { useAppDispatch } from "../../redux/store";
import { changeStatus } from "../../redux/slises/taskReducer";

type Props = { color: Color; status: Status; tasks: TaskT[] };

export default function TaskColumn({ color, status, tasks }: Props) {
  const dispatch = useAppDispatch();
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "status",
      drop: (item: { id: number }) => {
        dispatch(changeStatus({ id: item.id, status }));
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  return (
    <div className={st.root} ref={drop}>
      <div className={classNames(st.top, st[color])}>
        <div className={st.circle}></div>
        <h3>{status}</h3>
        <div className={st.count}>{tasks.length}</div>
      </div>
      <div className={st.body}>
        {tasks.map((task) => (
          <Task task={task} key={task.id} />
        ))}
        {isOver && <div className={st.sceleton}></div>}
      </div>
    </div>
  );
}
