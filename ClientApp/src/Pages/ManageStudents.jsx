import React, { Component } from 'react'
import axios from 'axios'
import '../scss/ManageStudents.scss'

export default class ManageStudents extends Component {
  state = {
    students: [],
    student: {}
  }

  componentDidMount() {
    axios
      .get('/api/student', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(resp => {
        console.log(resp.data)
        this.setState({
          students: resp.data
        })
      })
  }

  addNewStudent = e => {
    e.preventDefault()
    axios
      .post('/api/student', this.state.student, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(resp => {
        this.setState({
          student: resp.data
        })
      })
      .then(resp => {
        this.setState({
          students: this.state.students.concat(this.state.student),
          student: {}
        })
        console.log(this.state.students)
      })

    e.target.reset()
  }

  deleteStudent = student => {
    if (
      window.confirm(
        `Are you sure you want to delete ${student.firstName} ${
          student.lastName
        }?`
      )
    ) {
      axios
        .delete(`/api/student/${student.id}`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        .then(resp => {
          this.setState({
            students: this.state.students.filter(f => f.id !== student.id)
          })
        })
    }
  }

  updateValue = e => {
    const state = this.state
    state.student[e.target.name] = e.target.value
    this.setState(state)
  }

  render() {
    return (
      <div>
        <h4 className="font-change">New Student?</h4>
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
          <button>+</button>
        </form>
        <main>
          <hr />
          <h4>Class Roster for your class:</h4>
          <hr />
          <ul>
            {this.state.students.map(student => {
              return (
                <section className="roster-container">
                  <li key={student.id} className="students">
                    {student.firstName} {student.lastName}
                  </li>{' '}
                  <button
                    className="delete-student"
                    onClick={() => this.deleteStudent(student)}
                  >
                    <i class="material-icons">cancel</i>
                  </button>
                </section>
              )
            })}
          </ul>
          <hr />
        </main>
      </div>
    )
  }
}
