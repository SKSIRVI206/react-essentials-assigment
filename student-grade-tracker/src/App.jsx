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
      },
      filterType: "ALL",
      sortBy: "none"
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
  
  handleDeleteStudent =(studentId)=>{
    this.setState({
      students:this.state.students.filter(student=>{
        return student.id !==studentId
      })
    })
  }

  handleToggleStudent = (studentId) =>{
    this.setState({
      students:this.state.students.map(student=>{
        if(student.id === studentId){
          return {
            ...student,
            passed:!student.passed
          }
        }
        return student

      })
    })
  }
  handleGradeChange = (studentId, newGrade) => {
    if (newGrade === "" || newGrade.trim() === "") {
      this.setState({
        students: this.state.students.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              grade: "",
              passed: false
            };
          }
          return student;
        })
      });
      return;
    }
    const gradeNum = Number(newGrade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      alert("Grade must be between 0 and 100!");
      return; 
    }
    this.setState({
      students: this.state.students.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            grade: gradeNum,
            passed: gradeNum >= 60
          };
        }
        return student;
      })
    });
  }

  render(){
    const { students, filterType, sortBy } = this.state;
    let processedStudents = students;
    if (filterType === "PASSED") {
      processedStudents = students.filter(student => student.passed);
    } else if (filterType === "FAILED") {
      processedStudents = students.filter(student => !student.passed);
    }
    if (sortBy === "highest") {
      processedStudents = [...processedStudents].sort((a, b) => b.grade - a.grade);
    } else if (sortBy === "lowest") {
      processedStudents = [...processedStudents].sort((a, b) => a.grade - b.grade);
    }
    const totalStudents = students.length;
    const passedCount = students.filter(student => student.passed).length;
    const failedCount = totalStudents - passedCount;
    const totalGrades = students.reduce((sum, s) => sum + s.grade, 0);
    const averageGrade = totalStudents > 0 ? (totalGrades / totalStudents).toFixed(1) : 0;
    return(
      <div className="app">
        <header className="app-header">
          <h1>Student Grade Tracker</h1>
          <p>Manage, track, and calculate student performance effortlessly.</p>
        </header>
        <main className="app-main">
          <section className="dashboard-stats">
            <div className="stat-card">
              <h4>Total Studnents</h4>
              <p>{totalStudents}</p>
            </div>
            <div className="stat-card passed">
              <h4>Passed</h4>
              <p>{passedCount}</p>
            </div>
            <div className="stat-card failed">
              <h4>Failed</h4>
              <p>{failedCount}</p>
            </div>
            <div className="stat-card average">
              <h4>Avg Grade</h4>
              <p>{averageGrade}%</p>
            </div>
          </section>
          <section className="controls-section">
            <div className="filter-group">
              <label>Filter By Status: </label>
              <select
                value={filterType}
                onChange={(e)=>this.setState({filterType:e.target.value})}>
                <option value="ALL">All Student</option>
                <option value="PASSED">Passed Only</option>
                <option value="FAILED">Failed Only</option>
              </select>
            </div>
            <div className="sort-group">
              <label>Sort By Grade: </label>
              <button className={sortBy === 'highest' ? 'active' : ''} onClick={()=>this.setState({sortBy: 'highest'})}>Highest First</button>
              <button className={sortBy === 'lowest' ? 'active' : ''} onClick={()=>this.setState({sortBy: 'lowest'})}>Lowest First</button>
              <button className="reset-btn" onClick={()=>this.setState({sortBy: 'none'})}>Reset</button>
            </div>
          </section>
          <section className="students-section">
            <div className="student-grid">
              <StudentsList students={processedStudents} handleDeleteStudent={this.handleDeleteStudent} handleToggleStudent={this.handleToggleStudent} handleGradeChange = {this.handleGradeChange}/>
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
