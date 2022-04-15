import React, {Component} from "react"
import axios from "axios"



class Employee extends Component {

    state = {
        employees: [],
        searchTerm: "",
        filteredEmployees:  []
    }


    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=20').then(users => {
            console.log(users)
            this.setState({employees: users.data.results})
            this.setState({filteredEmployees: users.data.results})
        })
    }

    sortBy = (sort) => {

        if (sort === "first") {
            let sortedArr = this.state.filteredEmployees.sort((a,b) => {
              if (a.name.first > b.name.first) {
                  return 1
              } else {
                  return -1
              }
            })
            this.setState({filteredEmployees: sortedArr})
        }

        if (sort === "last") {
            let sortedArr = this.state.filteredEmployees.sort((a,b) => {
              if (a.name.last < b.name.last) {
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
            console.log(e.name.first.split(""))
            return (e.name.first.includes(event.target.value)) || (e.name.last.includes(event.target.value))
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
                <button onClick={() => this.sortBy("first")}>FIRST NAME</button> <button onClick={() => this.sortBy("last")}>LAST NAME</button>
                {this.state.filteredEmployees.map( (e) => {
                    return (
                       <div>
                    <span> {e.name.first}</span>  <span> {e.name.last}</span> 
                        </div>
                    )
                })}
            </div>

        )
    }
}


export default Employee; 