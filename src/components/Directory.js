import React, { Component } from "react";
import Employees from "./Employees.js";
import Search from "./Search.js";
import "../styles/Directory.css";

class Directory extends Component {

  state = {
    employees: [],
    empSort: [],
    search: "",
    sorted: false,
  };

  // check that the component rendered at least once, and pull in our data
  // wait for the information to come back
  componentDidMount = () => {
    fetch(`https://randomuser.me/api/?results=25&nat=us&inc=name,email,phone,id`)
      .then(res => res.json())
      .then(json => {
        this.setState({ employees: json.results })
      })
  };

  // sort through employees based on search term
  // check if there is a match and set that to empSort for rendering
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

                <div className="col-20-md">Name</div>
                <div className="col-20-md">Email</div>
                <div className="col-20-md">Phone</div>

            </div>
            <div className ="container">

              {/* if it's not sorted, map accordingly */}
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