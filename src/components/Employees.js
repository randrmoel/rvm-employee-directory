import React from "react";
import "../styles/Employees.css";

const Employees = (props) => {

  return (

    <div className="row empRow">
      <div style={{textAlign:"left"}} className="col-md-4">{props.firstName} {props.lastName}</div>
      <div style={{textAlign:"left"}} className = "col-md-4">{props.email}</div>
      <div style={{textAlign:"left"}} className="col-md-4">{props.phone} </div>
    </div>

  )

}

export default Employees;