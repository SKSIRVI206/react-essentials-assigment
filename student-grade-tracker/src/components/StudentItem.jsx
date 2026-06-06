import React from "react";
class Studentitem extends React.Component{
    render(){
        const { student,handleDeleteStudent,handleToggleStudent,handleGradeChange} = this.props;
        return(
            <div className={`student-card ${student.passed ? 'passed' : 'failed'}`}>
              <div className="student-info">
                <h3>{student.name}</h3>
                <p><strong>Subject:</strong> {student.subject}</p>
                <p>
                  <strong>Grade:</strong>
                  <input 
                    type="number" 
                    value={student.grade} 
                    min='0' 
                    max='100'
                    onChange={(e)=>handleGradeChange(student.id, e.target.value)}/>%
                </p>
              </div>
              <div className="student-status">
                <span className={`status ${student.passed ? 'status-passed' : 'status-failed'}`}>
                  {student.passed ? "PASSED" : "FAILED"}
                </span>
              </div>
              <div className="student-card-btn">
                <button onClick={()=>handleDeleteStudent(student.id)} className="btn delete-btn">Delete</button>
                <button onClick={()=>handleToggleStudent(student.id)} className="btn toggle-btn">{student.passed ? "FAILED" :'PASSED'}</button>
              </div>
            </div>
          )
    }
}
export default Studentitem