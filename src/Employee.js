import React, {Component} from "react"



class Employee extends Component {

    state = {
        employees: [ {firstname: "Bob", lastname: "Saget"}, {firstname: "Kait", lastname: "User"}, {firstname: "Ashley", lastname: "G"}],
        searchTerm: "",
        filteredEmployees:  [ {firstname: "Bob", lastname: "Saget"}, {firstname: "Kait", lastname: "User"}, {firstname: "Ashley", lastname: "G"}]
    }

    sortBy = (sort) => {

        if (sort === "first") {
            let sortedArr = this.state.filteredEmployees.sort((a,b) => {
              if (a.firstname > b.firstname) {
                  return 1
              } else {
                  return -1
              }
            })
            this.setState({filteredEmployees: sortedArr})
        }

        if (sort === "last") {
            let sortedArr = this.state.filteredEmployees.sort((a,b) => {
              if (a.firstname < b.firstname) {
                  return 1
              } else {
                  return -1
              }
            })
            this.setState({filteredEmployees: sortedArr})
        }

    }


    handleSearchTerm = event => {
        event.preventDefault()
        this.setState( {searchTerm: event.target.value})

        console.log(event.target.value)
        if (event.target.value === "") {
            console.log("runnn")
           
            this.setState({filteredEmployees: this.state.employees})
            console.log(this.state.employees)
            return 
        }
       

        this.setState({filteredEmployees: this.state.employees})
        console.log(this.state.filteredEmployees)
        console.log(this.state.searchTerm)

        const filteredEmployesArr = this.state.filteredEmployees.filter(e => {
            console.log(e.firstname.split(""))
            return (e.firstname.includes(event.target.value)) || (e.lastname.includes(event.target.value))
        })

        console.log(filteredEmployesArr)
        console.log(this.state.employees)

        this.setState({filteredEmployees: filteredEmployesArr})

    }

    render() {
        return (
            <div>
               <h1> Welcome to the Employee Directory </h1>

                <div>
                  Search in the search box to filter by name OR sort by name by clicking on FIRST NAME or LAST NAME
                </div>
                <input
                value= {this.state.searchTerm}
                onChange= {this.handleSearchTerm}
                >
                </input>
                <br></br>
                <span onClick={() => this.sortBy("first")}>FIRST NAME</span> <span onClick={() => this.sortBy("last")}>LAST NAME</span>
                {this.state.filteredEmployees.map( (e) => {
                    return (
                       <div>
                    <span> {e.firstname}</span>  <span> {e.lastname}</span> 
                        </div>
                    )
                })}
            </div>

        )
    }
}


export default Employee; 