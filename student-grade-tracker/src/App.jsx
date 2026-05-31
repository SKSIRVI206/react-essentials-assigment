import React from "react"
import './App.css'
import StudentsList from "./components/StudentsList";

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
      ]
    }
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
        </main>
      </div>
    )
  }
}
export default App
