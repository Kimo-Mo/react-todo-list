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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import Todo from "../Todo/Todo";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { useContext, useEffect, useMemo, useState } from "react";
import { MaterialUISwitch } from "../MaterialUISwitch/MaterialUISwitch";
import Grid from "@mui/material/Grid2";

import { toast } from "react-toastify";
import { TodosContext } from "../../Contexts/TodosContext";

export default function TodoList({ theme, handleThemeMode, themeMode }) {
  const {todos , dispatch} = useContext(TodosContext)

  const [titleInput, setTitleInput] = useState(""); // task title input
  const [todosType, setTodosType] = useState("all"); // all, complete, inComplete
  const [todo, setTodo] = useState({}); // target todo for delete and edit popups

  // dialog states for delete and edit popups
  const [openDelPopUp, setOpenDelPopUp] = useState(false);
  const [openEditPopUp, setOpenEditPopUp] = useState(false);

  const handleTodosType = (event) => {
    setTodosType(event.target.value);
  };

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const inCompletedTodos = useMemo(() => {
    return todos.filter((t) => !t.isCompleted);
  }, [todos]);
  let todosToBeRendered = todos;
  if (todosType == "complete") todosToBeRendered = completedTodos;
  else if (todosType == "incomplete") todosToBeRendered = inCompletedTodos;
  else todosToBeRendered = todos;

  useEffect(() => {
    dispatch({ type: "GET_TODOS" }); // get todos from local storage
  }, [dispatch]);

  function handleAddClick() {
    if (titleInput !== "") {
      dispatch({ type: "ADD_TODO", payload: { titleInput } });
      setTitleInput("");
      toast.success("تم اضافة المهمة بنجاح");
    }
  }
  // ======= Delete Task Confirm Click =======
  function handleDeleteClick() {
    dispatch({ type: "DELETE_TODO", payload: { todo } });
    setOpenDelPopUp(false);
    toast.success("تم حذف المهمة بنجاح");
  }
  // ======= Delete Task Confirm Click =======
  // ======= Task Edit Click =======
  function handleEditClick() {
    if (todo.title.trim() !== "") {
      dispatch({ type: "EDIT_TODO", payload: { todo } });
      setOpenEditPopUp(false);
      toast.success("تم تعديل المهمة بنجاح");
    } else toast.error("من فضلك ادخل عنوان المهمة");
  }
  // ======= Task Edit Click =======

  // ======= Delete popUp =======
  const handleOpenDelPopUp = (todo) => {
    setOpenDelPopUp(true);
    setTodo(todo);
  };
  const handleCloseDelPopUp = () => {
    setOpenDelPopUp(false);
  };
  // ======= Delete popUp =======
  // ======= Edit popUp =======
  const handleOpenEditPopUp = (todo) => {
    setOpenEditPopUp(true);
    setTodo(todo);
  };
  const handleCloseEditPopUp = () => {
    setOpenEditPopUp(false);
  };
  //  ======= Edit popUp =======
  const todosJsx =
    todosToBeRendered.length == 0 ? (
      <h2 style={{ marginBlock: "20px" }}>أضف بعض المهام</h2>
    ) : (
      todosToBeRendered.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            handleOpenDelPopUp={handleOpenDelPopUp}
            handleOpenEditPopUp={handleOpenEditPopUp}
          />
        );
      })
    );
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
          <DialogContentText
            style={{ fontSize: "20px", marginBottom: "10px" }}
            id="alert-dialog-description">
            {todo?.title}
          </DialogContentText>
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
            value={todo?.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
          <TextField
            id="description"
            label="تفاصيل المهمة"
            type="text"
            fullWidth
            variant="standard"
            value={todo?.description}
            onChange={(e) => setTodo({ ...todo, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions sx={{ padding: "15px" }}>
          <Button
            sx={{ marginLeft: "10px" }}
            variant="contained"
            color="primary"
            onClick={handleCloseEditPopUp}>
            إلغاء
          </Button>
          <Button variant="contained" color="error" onClick={handleEditClick}>
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit pup-up  */}
      <Container maxWidth="md">
        <Card sx={{ minWidth: 275, maxHeight: "90vh", overflowY: "scroll" }}>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <FormControlLabel
              sx={{ placeSelf: "start" }}
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  onChange={() => handleThemeMode()}
                  checked={themeMode === "dark"}
                />
              }
              label="المظهر"
            />
            <Typography variant="h3">قائمة المهام</Typography>
            <Divider sx={{ width: "100%", paddingBlock: "10px" }} />
            {todos.length !== 0 && (
              <ToggleButtonGroup
                style={{ marginBlock: "20px", gap: "10px" }}
                value={todosType}
                color="error"
                exclusive
                onChange={handleTodosType}
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
            <Grid
              container
              spacing={2}
              sx={{ width: "100%", marginTop: "20px" }}>
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
                  disabled={titleInput.length == 0}
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
    </>
  );
}
