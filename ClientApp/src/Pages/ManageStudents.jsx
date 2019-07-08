import React, { Component } from 'react'
import axios from 'axios'

export default class ManageStudents extends Component {
  state = {
    students: [],
    student: {}
  }

  componentDidMount() {
    axios.get('/api/student').then(resp => {
      console.log(resp.data)
      this.setState({
        students: resp.data
      })
    })
  }

  addNewStudent = e => {
    e.preventDefault()
    axios.post('/api/student', this.state.student).then(resp => {
      this.setState({
        students: this.state.students.concat(this.state.student)
      })
    })
  }

  updateValue = e => {
    const state = this.state
    state.student[e.target.name] = e.target.value
    this.setState(state)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addNewStudent}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={this.updateValue}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={this.updateValue}
          />
          <input
            type="text"
            placeholder="Grade"
            name="grade"
            onChange={this.updateValue}
          />
          <input
            type="text"
            placeholder="Age"
            name="age"
            onChange={this.updateValue}
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            onChange={this.updateValue}
          />
          <button>create student</button>
        </form>
        <main>
          <ul>
            {this.state.students.map(student => {
              return (
                <li key={student.id} className="students">
                  {student.firstName} {student.lastName}
                  <button>Delete</button>
                </li>
              )
            })}
          </ul>
        </main>
      </div>
    )
  }
}
