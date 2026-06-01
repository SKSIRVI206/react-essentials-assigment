import React from "react"
import './App.css'
import StudentsList from "./components/StudentsList";
import StudentAdd from "./components/StudentAdd";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      students:[
        {
          id:1,
          name:'Alice Johnson',
          subject:'Mathematics',
          grade:92,
          passed:true
        },
        {
          id:2,
          name:'Rakesh kumar',
          subject:'Chemistry',
          grade:40,
          passed:false
        },
        {
          id:3,
          name:'Neha kumari',
          subject:'Biology',
          grade:68,
          passed:true
        },
        {
          id:4,
          name:'Ashok kumar',
          subject:'Physics',
          grade:36,
          passed:false
        },
        {
          id:5,
          name:'Vishal',
          subject:'English',
          grade:78,
          passed:true
        }
      ],
      newStudent:{
        name:'',
        subject:'',
        grade:''
      }
    }
  }
  handleInputChange =(event)=>{
    const {name, value} = event.target;
    this.setState({
      newStudent:{
        ...this.state.newStudent,
        [name]:value
      }
    })
  }

  handleSubmit =(event) =>{
    event.preventDefault()
    const {name, subject, grade} = this.state.newStudent;
    if(!name.trim() || !subject || !grade){
      alert("please fill in all fields ")
      return
    }
    const newAddStudent = {
      id:Date.now(),
      name:name,
      subject: subject,
      grade: Number(grade),
      passed: Number(grade) >=60
    }
    this.setState({
      students:[...this.state.students, newAddStudent],
      newStudent:{
        name:'',
        subject:'',
        grade:''
      }
    })
  }

  render(){
    return(
      <div className="app">
        <header className="app-header">
          <h1>Student Grade Tracker</h1>
          <p>Manage, track, and calculate student performance effortlessly.</p>
        </header>
        <main className="app-main">
          <section className="students-section">
            <h2>Total Student: {this.state.students.length}</h2>
            <div className="student-grid">
              <StudentsList students={this.state.students}/>
            </div>
          </section>
          <section className="student-add-section">
            <h2>Add new Student</h2>
            <StudentAdd newStudent={this.state.newStudent} handleInputChange={this.handleInputChange} handleSubmit={this.handleSubmit}/>
          </section>
        </main>
      </div>
    )
  }
}
export default App
