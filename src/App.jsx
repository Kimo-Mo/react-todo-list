import TodoList from "./Components/TodoList/TodoList";
import { createTheme, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { TodosContext } from "./Contexts/TodosContext";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [themeMode, setThemeMode] = useState(
    localStorage.getItem("themeMode") || "light"
  );
  useEffect(() => {
    const savedThemeMode = localStorage.getItem("themeMode");
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    }
  }, []);
  function handleThemeMode() {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
    localStorage.setItem("themeMode", newThemeMode);
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
              themeMode == "dark" ? "white" : "#212121"
          }}>
          <TodoList
            theme={theme}
            handleThemeMode={handleThemeMode}
            themeMode={themeMode}
          />
        </div>
      </TodosContext.Provider>
    </ThemeProvider>
  );
}
