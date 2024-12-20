/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";
import TodosReducer from "../Reducers/TodosReducer";

export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(TodosReducer, []);
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
export default TodosProvider;
