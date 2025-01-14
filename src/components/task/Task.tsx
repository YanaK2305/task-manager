import st from "./Task.module.scss";
import CommentIcon from "../../assets/icons/CommentIcon";
import FilesIcon from "../../assets/icons/FilesIcon";
import classNames from "classnames";
import { TaskT } from "../../types";
import { useDrag } from "react-dnd";

type Props = { task: TaskT };
const tagColor = {
  "In progress": "green",
  Low: "orange",
  High: "red",
  Completed: "green",
};
export default function Task({ task }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    item: { id: task.id },
    type: "status",
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      className={st.root}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    >
      <div className={st.project}>{task.project}</div>
      <div className={st.top}>
        <button className={st.more}>. . .</button>
      </div>
      <h3>{task.name}</h3>
      <p>{task.description}</p>
      <div className={st.tags}>
        {task.tags.map((tag) => (
          <div className={classNames(st.tag, st[tagColor[tag]])} key={tag}>
            {tag}
          </div>
        ))}
      </div>
      <div className={st.bottom}>
        <div className={st.users}>{task.deadline as string}</div>
        <div className={st.info}>
          <div className={st.item}>
            <CommentIcon />
            <span>{task.lead}</span>
          </div>
          <div className={st.item}>
            <FilesIcon />
            <span>{task.creator}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
