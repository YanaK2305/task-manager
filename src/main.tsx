import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </DndProvider>
  </Provider>
);
