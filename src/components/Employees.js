import React from "react";
import "../styles/Employees.css";

const Employees = (props) => {

  return (

    <div className="row">
      <div className="col-20-md">{props.firstName} {props.lastName}</div>
      <div className = "col-20-md">{props.email}</div>
      <div className="col-20-md">{props.phone} </div>
    </div>

  )

}

export default Employees;