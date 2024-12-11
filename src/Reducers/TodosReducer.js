import { v4 as uuidv4 } from "uuid";

export default function TodosReducer(currentTodos, action) {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.titleInput,
        description: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "DELETE_TODO": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id !== action.payload.todo.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "EDIT_TODO": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.todo.id) {
          return {
            ...t,
            title: action.payload.todo.title,
            description: action.payload.todo.description,
          };
        } else return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "TOGGLE_TODOS": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id == action.payload.id) {
          const updatedTodo = { ...t, isCompleted: !t.isCompleted };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "GET_TODOS": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return storageTodos;
    }
    default: {
      throw Error("Invalid action type " + action.type);
    }
  }
}
