import st from "./FormModal.module.scss";
import XIcon from "../../assets/icons/XIcon";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import TextField from "@mui/material/TextField";
import classNames from "classnames";
import { FormT, Status, Tag } from "../../types";
import * as Yup from "yup";
import { ErrorMessage, Form, Formik } from "formik";
import { useAppDispatch } from "../../redux/store";
import { addTask } from "../../redux/slises/taskReducer";
import { Dayjs } from "dayjs";

type Props = { open: boolean; closeModal: () => void };

export default function FormModal({ open, closeModal }: Props) {
  const dispatch = useAppDispatch();
  const initialValues: FormT = {
    name: "",
    project: "",
    lead: "",
    deadline: null,
    creator: "",
    status: Status.Todo,
    description: "",
    tags: [],
    startTime: null,
    endTime: null,
    id: Date.now(),
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    project: Yup.string().required("Project is required"),
    lead: Yup.string().required("Lead is required"),
    creator: Yup.string().required("Creator is required"),
  });
  function onSubmit(values: FormT, { resetForm }: { resetForm: () => void }) {
    const todo = { ...values };
    if (values.deadline && values.endTime) {
      const date = new Date(values.deadline as Date);
      const endTime = new Date(values.endTime as Date);
      const deadline = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${endTime.getHours()}:${endTime.getMinutes()}`;
      todo.deadline = deadline;
    }
    delete todo.startTime;
    delete todo.endTime;
    todo.id = Date.now();
    dispatch(addTask(todo));
    closeModal();
    resetForm();
  }

  return (
    <div className={classNames(st.root, open ? st.rootActive : "")}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ values, handleChange, setFieldValue }) => {
          return (
            <Form className={st.form}>
              <div className={st.top}>
                <button onClick={closeModal} type="button">
                  <XIcon />
                </button>
              </div>
              <div className={st.heading}>
                <h2>Add Task</h2>
                <p>Today {new Date().toLocaleDateString()}</p>
              </div>
              <div className={st.body}>
                <div className={st.fild}>
                  <label htmlFor="name">Name the task</label>
                  <TextField
                    name="name"
                    id="name"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                  />
                  <ErrorMessage
                    className={st.error}
                    name="name"
                    component={"span"}
                  />
                </div>
                <div className={st.row}>
                  <div className={st.fild}>
                    <label>Choose project</label>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Project name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Project name"
                        fullWidth
                        value={values.project}
                        name="project"
                        onChange={handleChange}
                      >
                        <MenuItem value="Website">Website</MenuItem>
                        <MenuItem value="Admin panel">Admin panel</MenuItem>
                        <MenuItem value="Landing">Landing</MenuItem>
                      </Select>
                    </FormControl>
                    <ErrorMessage
                      className={st.error}
                      name="project"
                      component={"span"}
                    />
                  </div>
                  <div className={st.fild}>
                    <label htmlFor="name">Lead</label>
                    <TextField
                      name="lead"
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      value={values.lead}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      className={st.error}
                      name="lead"
                      component={"span"}
                    />
                  </div>
                </div>
                <div className={st.row}>
                  <div className={st.fild}>
                    <label>Due Date/Time</label>
                    <DatePicker
                      label="Date"
                      value={values.deadline as Dayjs}
                      onChange={(value) => {
                        setFieldValue("deadline", value, true);
                      }}
                      name="deadline"
                    />
                  </div>
                  <div className={st.time}>
                    <TimePicker
                      label="Time"
                      sx={{ width: "100px" }}
                      value={values.startTime as Dayjs}
                      name="startTime"
                      onChange={(value) => {
                        setFieldValue("startTime", value, true);
                      }}
                    />
                    <span>-</span>
                    <TimePicker
                      label="Time"
                      sx={{ width: "100px" }}
                      value={values.endTime as Dayjs}
                      name="endTime"
                      onChange={(value) => {
                        setFieldValue("endTime", value, true);
                      }}
                    />
                  </div>
                </div>
                <div className={st.row}>
                  <div className={st.fild}>
                    <label>Task Priority</label>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Critical
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Critical"
                        value={values.tags}
                        onChange={handleChange}
                        name="tags"
                        multiple
                      >
                        <MenuItem value={Tag.Low}>Low</MenuItem>
                        <MenuItem value={Tag.High}>High</MenuItem>
                        <MenuItem value={Tag.Completed}>Completed</MenuItem>
                        <MenuItem value={Tag.InProgress}>In progress</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className={st.fild}>
                    <label htmlFor="name">Task Assigne</label>
                    <TextField
                      id="outlined-basic"
                      label="Outlined"
                      variant="outlined"
                      placeholder="Name Surname"
                      value={values.creator}
                      onChange={handleChange}
                      name="creator"
                    />
                    <ErrorMessage
                      className={st.error}
                      name="creator"
                      component={"span"}
                    />
                  </div>
                </div>
              </div>
              <div className={st.bottom}>
                <button className={st.save}>Save</button>
                <button className={st.cancel}>Cancel</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
