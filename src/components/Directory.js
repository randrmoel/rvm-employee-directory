// Load required components
import React, { Component } from "react";
import Employees from "./Employees.js";
import Search from "./Search.js";
import "../styles/Directory.css";

//Extend class to Directory
class Directory extends Component {

 //Set state variables to check
  state = {
    employees: [],
    empSort: [],
    search: "",
    sorted: false,
  };

  // check for rendering wait for data
  componentDidMount = () => {
    fetch(`https://randomuser.me/api/?results=25&nat=us&inc=name,email,phone,id`)
      .then(res => res.json())
      .then(json => {
        this.setState({ employees: json.results })
      })
  };

  // sort through employees based on search term, check for match and set that to empSort for rendering
  sortEmp = () => {
    let { employees, search } = this.state;
    let empSort = employees.filter(sorted => {
      return (
        sorted.name.first.toLowerCase().includes(search.toLowerCase()) ||
        sorted.name.last.toLowerCase().includes(search.toLowerCase()) ||
        sorted.email.toLowerCase().includes(search.toLowerCase())
      )
    })
    this.setState({ empSort })
  }

  // grab search term, activate sorted  
  startSort = event => {
    this.setState({ search: event.target.value }, () => {
      this.sortEmp();
      this.setState({ sorted: true });
    });
  };

  render = () => {

    return (

      <div>
        <div className="jumbotron">
          <h3 >
            Employee Directory
          </h3>
          <Search
            name="search"
            startSort={this.startSort}
            label="Search"
          />
        </div>

        <div className="container">

            <div className="row">

                <div className="col-md-4"><h2 style={{fontStyle:"italic", textAlign:"left"}}>Name</h2></div>
                <div className="col-md-4"><h2 style={{fontStyle:"italic", textAlign:"left"}}>Email</h2></div>
                <div className="col-md-4"><h2 style={{fontStyle:"italic", textAlign:"left"}}>Phone</h2></div>

            </div>
            <div className ="container">

              {/* use ternary operation, if it's not sorted, map accordingly */}
              {!this.state.sorted ? this.state.employees.map(employee => (


                < Employees
                  key={employee.id.value}
                  firstName={employee.name.first}
                  lastName={employee.name.last}
                  phone={employee.phone}
                  email={employee.email}
                />

              ))
                // otherwise map the sorted employees
                : this.state.empSort.map(employee => (

                  <Employees
                    key={employee.id.value}
                    firstName={employee.name.first}
                    lastName={employee.name.last}
                    phone={employee.phone}
                    email={employee.email}
                  />

                ))};
          </div >

        </div>

      </div >

    )

  }

}

export default Directory;
