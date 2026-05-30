import React from "react";
import './App.css';
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      students:[
        {
          id:1,
          name:'Alice johnson',
          subject:'Mathematics',
          grade:92,
          passed: true
        },
        {
          id:2,
          name:'Bob smith',
          subject:'Physics',
          grade:78,
          passed: true
        },
        {
          id:3,
          name:'Charlie davis',
          subject:'chemistry',
          grade:45,
          passed: false
        },
      ],
      newStudent:{
        name:'',
        subject:'',
        grade:''
      }
    }  
  }

  handleInputChange =(event) =>{
    const {name, value} = event.target;

    this.setState({
      newStudent:{
        ...this.state.newStudent,
        [name]:value
      }
    })
  }

  handleAddSubmit = (event) =>{
    event.preventDefault();
    const {name, subject, grade} = this.state.newStudent;
    if(!name.trim() || !subject || !grade){
      alert("please fill in all fields")
      return;
    }
    const gradeNumber = parseInt(grade,10);
    if(isNaN(gradeNumber)|| gradeNumber <0 || gradeNumber > 100){
      alert('Please enter a valid grade between 0 and 100!')
      return;
    }
    const newStudent = {
      id: Date.now(),
      name: name.trim(),
      subject: subject,
      grade: gradeNumber,
      passed: gradeNumber >= 60
    }
    this.setState({
      students:[...this.state.students, newStudent],
      newStudent:{
        name:'',
        subject:'',
        grade:''
      }
    })

  }

  handleDeleteStudent = (studentID) =>{
    if(window.confirm('Are you sure you want to delete this student')){
      this.setState({
        students: this.state.students.filter(student => student.id !== studentId)
      })
    }
  }


  renderStudentList(){
    if(this.state.students.length === 0){
      return(
        <div className="no-student">
          <p>No Students added yet. Add your first student below!</p>
        </div>
      )
    }
    return this.state.students.map(student=>{
      return (
        <div key={student.id} className={`student-card ${student.passed ? 'passed': 'failed'}`}>
        <div className="student-info">
          <h3>{student.name}</h3>
          <p><strong>Subject:</strong> {student.subject}</p>
          <p><strong>Grade:</strong> {student.grade}%</p>
        </div>
        <div className="student-status">
          <span className={`status ${student.passed ? "status-passed" :'status-failed'}`}>
            {student.passed ? "PASSED": "FAILED"}
          </span>
        </div>
        <div className="student-actions">
          <button onClick={()=>this.handleDeleteStudent(student.id)}
            className="delete-btn"
            title="Delete Student"
            >
            Delete
          </button>
        </div>
      </div>
      )
    })
  }

  render(){
    return(
      <div className="app">
        <header className="app-header">
          <h1>Student Grade Tracker</h1>
          <p>Class Component Design</p>
        </header>

        <main className="app-main">
          <section className="students-section">
            <h2>Students list [{this.state.students.length}]</h2>
            <div className="students-grid">
              {this.renderStudentList()}
            </div>
          </section>

          <section className="add-student-section">
            <h2>Add New Student</h2>

            <form onSubmit={this.handleAddSubmit} className="add-student-form">
              <div className="form-group">
                <label htmlFor="studentName">Student Name:</label>
                <input 
                  type="text"
                  id="studentName"
                  name="name"
                  value={this.state.newStudent.name}
                  onChange={this.handleInputChange}
                  placeholder="Enter Student's full name" />
              </div>
              <div className="form-group">
                <label htmlFor="studentSubject">Subject:</label>
                <select 
                  name="subject"
                  id="studentSubject"
                  value={this.state.newStudent.subject}
                  onChange={this.handleInputChange}>
                    <option value="">Select a subject</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="English">English</option>
                    <option value="history">History</option>
                  </select>
              </div>
              <div className="form-group">
                <label htmlFor="studentGrade">Grade (0 - 100):</label>
                <input 
                  type="number" 
                  name="grade" 
                  id="studentGrade"
                  value={this.state.newStudent.grade}
                  onChange={this.handleInputChange}
                  placeholder="Enter garde (0 - 100)" 
                  min='0'
                  max='100'
                  />
              </div>

              <button type="submit" className="submit-btn">
                Add Student
              </button>
            </form>
          </section>

        </main>
      </div>
    )
  }

}
export default App