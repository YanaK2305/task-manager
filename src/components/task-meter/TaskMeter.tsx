import { useAppSelector } from "../../redux/store";
import st from "./TaskMeter.module.scss";

type Props = { doneCount: number };

export default function TaskMeter({ doneCount }: Props) {
  const { tasks } = useAppSelector((state) => state.task);
  function calcPersent(done: number, total: number) {
    if (total === 0) {
      return "0%";
    }
    return `${(done / total) * 100}%`;
  }

  return (
    <div className={st.root}>
      <div className={st.top}>
        <h2>Task Meter</h2>
        <p>
          <span className={st.blue}>{doneCount}</span>/{tasks.length}
        </p>
      </div>
      <div className={st.progress}>
        <div
          className={st.line}
          style={{ width: calcPersent(doneCount, tasks.length) }}
        ></div>
      </div>
    </div>
  );
}
