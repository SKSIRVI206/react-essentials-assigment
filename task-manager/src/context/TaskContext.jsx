import { createContext, useContext, useReducer } from "react";

export const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within TaskContextProvider");
  }
  return context;
};

const initialState = {
  tasks: [
    {
      id: 1,
      title: "learn context api",
      description: "This is global state",
      completed: false,
      priority: "high",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "learn useReducer hook",
      description: "This is manage a complex state logic",
      completed: false,
      priority: "high",
      createdAt: new Date().toISOString()
    }
  ]
  
};

export const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  DELETE_TASK:"DELETE_TASK",
  EDIT_TASK: "EDIT_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  CLEAR_TASK:"CLEAR_TASK"
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case ACTIONS.DELETE_TASK:
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) };

    case ACTIONS.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        )
      };

    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        )
      };

    case ACTIONS.CLEAR_TASK:
      return { ...state, tasks: [] };

    default:
      return state;
  }
};

export const TaskContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const value = {
    state,
    dispatch
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};