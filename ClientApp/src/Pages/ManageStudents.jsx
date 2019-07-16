import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../scss/ManageStudents.scss'
import { NavMenu } from '../components/NavMenu'

export default function ManageStudents() {
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState({})
  const [newClass, setNewClass] = useState({})
  const [classes, setClasses] = useState([])
  const [teacher, setTeacher] = useState({})

  useEffect(() => {
    axios
      .get('/api/class', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(resp => {
        console.log(resp.data)
        setClasses(resp.data)
        setStudents(resp.data.Students)
      })
  }, [])

  const addNewStudent = e => {
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

  const deleteStudent = student => {
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

  const addClass = e => {
    e.preventDefault()
    axios
      .post('/api/class', newClass, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(resp => {
        setNewClass(resp.data)
      })
      .then(resp => {
        setClasses(classes.concat(newClass))
        setNewClass({})
        console.log(classes)
      })

    e.target.reset()
  }

  const updateValue = e => {
    const state = this.state
    state.student[e.target.name] = e.target.value
    this.setState(state)
  }

  return (
    <div>
      <NavMenu />
      <h4 className="font-change">New Student?</h4>
      <form onSubmit={addNewStudent}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          onChange={updateValue}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          onChange={updateValue}
        />

        <input
          type="text"
          placeholder="Age"
          name="age"
          onChange={updateValue}
        />
        <input
          type="text"
          placeholder="Phone Number"
          name="phoneNumber"
          onChange={updateValue}
        />
        <button>+</button>
      </form>
      <main>
        <hr />
        <section>
          <h4>Add a roster for your class:</h4>
          <form onSubmit={addClass}>
            <button>+</button>
          </form>
        </section>
        <hr />
        <ul>
          {/* {students.map(student => {
            return (
              <section className="roster-container">
                <li key={student.id} className="students">
                  {student.firstName} {student.lastName}
                </li>{' '}
                <button
                  className="delete-student"
                  onClick={() => deleteStudent(student)}
                >
                  <i class="material-icons">cancel</i>
                </button>
              </section>
            )
          })} */}
        </ul>
        <hr />
      </main>
    </div>
  )
}
