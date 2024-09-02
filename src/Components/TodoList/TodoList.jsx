import "./TodoList.css";
/* eslint-disable react/prop-types */
import {
  Button,
  Container,
  FormControlLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import Todo from "../Todo/Todo";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { useContext, useState } from "react";
import { MaterialUISwitch } from "../MaterialUISwitch/MaterialUISwitch";
import Grid from "@mui/material/Grid2";

import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../../Contexts/TodosContext";

export default function TodoList({ theme, handleThemeMode }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [alignment, setAlignment] = useState("left");

  const todosJsx =
    todos.length == 0 ? (
      <h2 style={{ marginBlock: "20px" }}>أضف بعض المهام</h2>
    ) : (
      todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} />;
      })
    );

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  function handleAddClick() {
    if (titleInput !== "") {
      const newTodo = {
        id: uuidv4(),
        title: titleInput,
        description: "",
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      setTitleInput("");
    }
  }

  return (
    <Container maxWidth="md">
      <Card sx={{ minWidth: 275 }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <FormControlLabel
            sx={{placeSelf:"start"}}
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                onChange={() => handleThemeMode()}
              />
            }
            label="المظهر"
            onChange={() => handleThemeMode()}
          />
          <Typography variant="h3">قائمة المهام</Typography>
          <Divider sx={{ width: "100%", paddingBlock: "10px" }} />
          {todos.length == 0 ? (
            <></>
          ) : (
            <ToggleButtonGroup
              style={{ marginBlock: "20px", gap: "10px" }}
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment">
              <ToggleButton
                value="all"
                style={{
                  border: "1px solid ",
                  borderRadius: "4px",
                  padding: "15px 20px",
                  borderColor: theme.palette.text.disabled,
                }}>
                الكل
              </ToggleButton>
              <ToggleButton
                value="complete"
                style={{
                  border: "1px solid ",
                  borderRadius: "4px",
                  padding: "15px 20px",
                  borderColor: theme.palette.text.disabled,
                }}>
                مكتمل
              </ToggleButton>
              <ToggleButton
                value="incomplete"
                style={{
                  border: "1px solid ",
                  borderRadius: "4px",
                  padding: "15px 20px",
                  borderColor: theme.palette.text.disabled,
                }}>
                غير مكتمل
              </ToggleButton>
            </ToggleButtonGroup>
          )}
          {/* ======= All Todos ======= */}
          {todosJsx}
          {/* ======= All Todos ======= */}
          <Grid container spacing={2} sx={{ width: "100%", marginTop: "20px" }}>
            <Grid size={{ xs: 12, sm: 6, md: 8 }}>
              <TextField
                onChange={(e) => setTitleInput(e.target.value)}
                value={titleInput}
                id="outlined-basic"
                name="taskTitle"
                label="عنوان المهمة"
                variant="outlined"
                sx={{ width: "100% !important" }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 4 }}>
              <Button
                onClick={handleAddClick}
                color="primary"
                variant="contained"
                sx={{
                  width: "100% !important",
                  height: "100%",
                }}>
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
