import React from "react";
import Studentitem from "./StudentItem";

class StudentsList extends React.Component{
    render(){   
        if(this.props.students.length === 0){
          return(
            <div className="no-students">
              <p>No Students added yet. Add your first student below!</p>
            </div>
          )
        }
        return this.props.students.map(student =>{
          return <Studentitem key={student.id} student={student}/>
        })
  }
}
export default StudentsList