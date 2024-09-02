/* eslint-disable react/prop-types */
import "./Todo.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import IconButton from "@mui/material/IconButton";
import { TodosContext } from "../../Contexts/TodosContext";
import { useContext, useState } from "react";

const Todo = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [openDelPopUp, setOpenDelPopUp] = useState(false);
  const [openEditPopUp, setOpenEditPopUp] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    description: todo.description,
  });

  // ======= Task Done Click =======
  function handleDoneClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
  }
  // ======= Task Done Click =======
  // ======= Delete Task Confirm Click =======
  function handleDeleteClick() {
    setTodos(todos.filter((t) => t.id !== todo.id));
  }
  // ======= Delete Task Confirm Click =======
  // ======= Task Edit Click =======
  function handleEditClick() {
    if (updatedTodo.title.trim() !== "") {
      const updatedTodos = todos.map((t) => {
        if (t.id == todo.id) {
          return {
            ...t,
            title: updatedTodo.title,
            description: updatedTodo.description,
          };
        } else return t;
      });
      setTodos(updatedTodos);
      setOpenEditPopUp(false);
    }
  }
  // ======= Task Edit Click =======

  // ======= Delete popUp =======
  const handleOpenDelPopUp = () => {
    setOpenDelPopUp(true);
  };
  const handleCloseDelPopUp = () => {
    setOpenDelPopUp(false);
  };
  // ======= Delete popUp =======
  // ======= Edit popUp =======
  const handleOpenEditPopUp = () => {
    setOpenEditPopUp(true);
  };
  const handleCloseEditPopUp = () => {
    setOpenEditPopUp(false);
  };
  //  ======= Edit popUp =======

  return (
    <>
      {/* Delete pup-up */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={openDelPopUp}
        onClose={handleCloseDelPopUp}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          هل انت متأكد من رغبتك في حذف هذه المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "15px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseDelPopUp}>
            إغلاق
          </Button>
          <Button
            sx={{ marginRight: "10px" }}
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
            autoFocus>
            نعم, قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete pup-up  */}
      {/* Edit pup-up  */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={openEditPopUp}
        onClose={handleCloseEditPopUp}>
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            style={{ marginBottom: "10px" }}
            id="title"
            label="عنوان المهمة"
            name="taskTitle"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, title: e.target.value })
            }
          />
          <TextField
            id="description"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={updatedTodo.description}
            onChange={(e) =>
              setUpdatedTodo({ ...updatedTodo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPopUp}>إلغاء</Button>
          <Button onClick={handleEditClick}>تعديل</Button>
        </DialogActions>
      </Dialog>
      {/* Edit pup-up  */}
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
              <Typography variant="h5">{todo.title}</Typography>
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
                onClick={handleOpenEditPopUp}
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
                onClick={handleOpenDelPopUp}
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
