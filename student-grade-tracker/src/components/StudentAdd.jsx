import React from "react";
class StudentAdd extends React.Component{
    render(){
        const {newStudent,handleInputChange,handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit} className="student-add-form">
                <div className="form-group">
                    <label htmlFor="studentName">Student Name:</label>
                    <input 
                        type="text"
                        name="name"
                        id="studentName"
                        value={newStudent.name}
                        onChange={handleInputChange}
                        placeholder="Enter Student Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="subjectName">Subject:</label>
                    <select 
                        name="subject"
                        id="subjectName"
                        value={newStudent.subject}
                        onChange={handleInputChange}>
                            <option value="">Select Subject</option>
                            <option value="Mathematics">Mathematics</option>
                            <option value="Chemistry">Chemistry</option>
                            <option value="Biology">Biology</option>
                            <option value="Physics">Physics</option>
                            <option value="English">English</option>
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="gradeNumber">Grade:(0 - 100)</label>
                    <input 
                        type="Number"
                        id="gradeNumber"
                        name="grade"
                        value={newStudent.grade}
                        onChange={handleInputChange}
                        min='0'
                        max='100' />
                </div>
                <button type="submit" className="submit-btn">ADD</button>
            </form>
        )
    }
}
export default StudentAdd