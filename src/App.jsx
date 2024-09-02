import TodoList from "./Components/TodoList/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { TodosContext } from "./Contexts/TodosContext";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [themeMode, setThemeMode] = useState("light");
  function handleThemeMode() {
    themeMode === "light" ? setThemeMode("dark") : setThemeMode("light");
  }
  const theme = createTheme({
    typography: {
      fontFamily: ["Alexandria", "sans-serif"].join(","),
    },
    palette: {
      mode: themeMode,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <div
          style={{
            paddingBlock: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            direction: "rtl",
            backgroundColor:
              themeMode == "dark" ? "white" : theme.palette.grey[900],
          }}>
          <TodoList theme={theme} handleThemeMode={handleThemeMode} />
        </div>
      </TodosContext.Provider>
    </ThemeProvider>
  );
}
