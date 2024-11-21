/* eslint-disable react/prop-types */
import "./Todo.css";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import IconButton from "@mui/material/IconButton";
import { TodosContext } from "../../Contexts/TodosContext";
import { useContext } from "react";

const Todo = ({ todo, handleOpenEditPopUp, handleOpenDelPopUp }) => {
  const { todos, setTodos } = useContext(TodosContext);

  // ======= Task Done Click =======
  function handleDoneClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // ======= Task Done Click =======

  return (
    <>
      <Card
        className="todoCard"
        sx={{ minWidth: 275, width: "100%", marginBlock: "10px" }}>
        <CardContent
          sx={{
            backgroundColor: "#283593",
            color: "white",
            paddingBottom: "16px !important",
          }}>
          <Grid
            container
            spacing={2}
            sx={{ alignItems: "center", flexWrap: "wrap" }}>
            <Grid size={{ xs: 12, md: 8 }} sx={{ textAlign: "right" }}>
              <Typography
                variant="h5"
                style={{
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ color: "#bdbdbd" }}>
                {todo.description}
              </Typography>
            </Grid>

            <Grid
              size={{ xs: 12, md: 4, sm: 6 }}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}>
              <IconButton
                onClick={handleDoneClick}
                className="iconBTn"
                sx={{
                  border: "2px solid #2e7d32",
                  color: todo.isCompleted ? "white" : "#2e7d32",
                  backgroundColor: todo.isCompleted ? "#2e7d32" : "white",
                }}
                aria-label="done">
                <DoneOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={() => handleOpenEditPopUp(todo)}
                className="iconBTn"
                sx={{
                  border: "2px solid #42a5f5",
                  color: "#42a5f5",
                  background: "White",
                }}
                aria-label="edit">
                <ModeEditOutlineOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={() => handleOpenDelPopUp(todo)}
                className="iconBTn"
                sx={{
                  border: "2px solid #d32f2f",
                  color: "#d32f2f",
                  background: "White",
                }}
                aria-label="delete">
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default Todo;
