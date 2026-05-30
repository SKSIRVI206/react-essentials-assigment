import { TaskContext, useTaskContext } from "./context/TaskContext"
// import './App.css'
import './App.css';
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"

function App(){
    return(
        <div className="App">
            <div className="app-header">
                <h1>Task Manager Application</h1>
                <p>manage your task here...</p>
            </div>
            <div className="app-main">
                <TaskForm/>
                <TaskList/>
            </div>
            
        </div>
    )
}
export default App
