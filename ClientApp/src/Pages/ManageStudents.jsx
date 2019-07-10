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
        `are you sure you want to delete ${student.firstName} ${
          student.lastName
        }?`
      )
    ) {
      // <!-- Button trigger modal -->
      /* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>

// <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
     */
    

    {
      axios
        .delete(`/api/student/${student.id}`, {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        })
        .then(resp => {
          this.setState({
            students: this.state.students.filter(f => f.id !== student.id)
          })
        })
    }
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
          <button>create student</button>
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
}

