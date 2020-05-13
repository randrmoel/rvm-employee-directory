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
    empFiltered: [],
    search: "",
    filtered: false,
    orderDir: "desc"
  };

  // check for rendering wait for data
  componentDidMount = () => {
    fetch(`https://randomuser.me/api/?results=25&nat=us&inc=name,email,phone,id`)
      .then(res => res.json())
      .then(json => {
        this.setState({ employees: json.results.sort(function(a,b){
          return ((a.name.last+a.name.first === b.name.last+a.name.first) ? 0 : ((a.name.last+a.name.first > b.name.last+a.name.first) ? 1 :-1));
        }) })
      })
  };

  sortLast = (a,b)=>{
    let a_first = a.name.first.toLowerCase
    let a_last = a.name.last.toLowerCase
    let b_first = a.name.first.toLowerCase
    let b_last = b.name.last.toLowerCase
    if(this.state.orderDir === 'asc'){
      this.setState({orderDir:'desc'})
      return ((a_last + a_first === b_last + b_first) ? 0 : ((a_last + a_first > b_last + b_first) ? 1 : -1));
    } else {
      this.setState({orderDir:'asc'})
      return ((a_last + a_first === b_last + b_first) ? 0 : ((a_last + a_first < b_last + b_first) ? 1 : -1));
    }
  } 

  handleSort = (colHead) =>{
    
    switch (colHead){
      case 'Name':
        if(this.state.orderDir ==='asc'){
          this.setState({orderDir:'desc'});
          this.setState({employees:this.state.employees.sort(function(a,b){
            return ((a.name.last+a.name.first === b.name.last+a.name.first) ? 0 : ((a.name.last+a.name.first > b.name.last+a.name.first) ? 1 :-1));
            })
          })
          this.setState({empFiltered:this.state.employees.sort(function(a,b){
            return ((a.name.last+a.name.first === b.name.last+a.name.first) ? 0 : ((a.name.last+a.name.first > b.name.last+a.name.first) ? 1 :-1));
            })
          })
       } else {
         this.setState({orderDir:'asc'});
         this.setState({employees:this.state.employees.sort(function(a,b){
          return ((a.name.last+a.name.first === b.name.last+a.name.first) ? 0 : ((a.name.last+a.name.first < b.name.last+a.name.first) ? 1 :-1));
          })
        })
        this.setState({empFiltered:this.state.employees.sort(function(a,b){
          return ((a.name.last+a.name.first === b.name.last+a.name.first) ? 0 : ((a.name.last+a.name.first < b.name.last+a.name.first) ? 1 :-1));
          })
        })
       }
       break;
      case 'Email':
        if(this.state.orderDir ==='asc'){
          this.setState({orderDir:'desc'});
          this.setState({employees:this.state.employees.sort(function(a,b){
            return ((a.email === b.email) ? 0 : ((a.email > b.email) ? 1 :-1));
            })
          })
          this.setState({empFiltered:this.state.employees.sort(function(a,b){
            return ((a.email === b.email) ? 0 : ((a.email > b.email) ? 1 :-1));
            })
          })

       } else {
         this.setState({orderDir:'asc'});
         this.setState({employees:this.state.employees.sort(function(a,b){
          return ((a.email === b.email) ? 0 : ((a.email < b.email) ? 1 :-1));
          })
        })
        this.setState({empFiltered:this.state.employees.sort(function(a,b){
          return ((a.email === b.email) ? 0 : ((a.email < b.email) ? 1 :-1));
          })
        })
       }
        break;
      case 'Phone':
        if(this.state.orderDir ==='asc'){
          this.setState({orderDir:'desc'});
          this.setState({employees:this.state.employees.sort(function(a,b){
            return ((a.phone === b.phone) ? 0 : ((a.phone > b.phone) ? 1 :-1));
            })
          })
          this.setState({empFiltered:this.state.employees.sort(function(a,b){
            return ((a.phone === b.phone) ? 0 : ((a.phone > b.phone) ? 1 :-1));
            })
          })
       } else {
         this.setState({orderDir:'asc'});
         this.setState({employees:this.state.employees.sort(function(a,b){
          return ((a.phone === b.phone) ? 0 : ((a.phone < b.phone) ? 1 :-1));
          })
        })
        this.setState({empFiltered:this.state.employees.sort(function(a,b){
          return ((a.phone === b.phone) ? 0 : ((a.phone < b.phone) ? 1 :-1));
          })
        })
       }
        break;
      default:
        console.log('Do Nothing');
        break;
    }
    //Logic for sorting
    console.log(colHead);
    //this.state = filtered? then set into the empFiltered otherwise to Employees
  }

  // sort through employees based on search term, check for match and set that to empFiltered for rendering
  filterEmp = () => {
    let { employees, search } = this.state;
    let empFiltered = employees.filter(filtered => {
      return (
        filtered.name.first.toLowerCase().includes(search.toLowerCase()) ||
        filtered.name.last.toLowerCase().includes(search.toLowerCase()) ||
        filtered.email.toLowerCase().includes(search.toLowerCase())
      )
    })
    this.setState({ empFiltered })
  }

  // grab search term, activate filtered  
  startFilter = event => {
    this.setState({ search: event.target.value }, () => {
      this.filterEmp();
      this.setState({ filtered: true });
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
            startFilter={this.startFilter}
            label="Search"
          />
        </div>

        <div className="container">

            <div className="row header">

                <div onClick={()=>{this.handleSort("Name")}} className="col-md-4"><h2 style={{fontStyle:"italic", textAlign:"left"}}>Name</h2></div>
                <div onClick={()=>{this.handleSort("Email")}} className="col-md-4"><h2 style={{fontStyle:"italic", textAlign:"left"}}>Email</h2></div>
                <div onClick={()=>{this.handleSort("Phone")}} className="col-md-4"><h2 style={{fontStyle:"italic", textAlign:"left"}}>Phone</h2></div>

            </div>
            <div className ="container">

              {/* use ternary operation, if it's not filtered, map accordingly */}
              {!this.state.filtered ? this.state.employees.map(employee => (


                < Employees
                  key={employee.id.value}
                  firstName={employee.name.first}
                  lastName={employee.name.last}
                  phone={employee.phone}
                  email={employee.email}
                />

              ))
                // otherwise map the filtered employees
                : this.state.empFiltered.map(employee => (

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
