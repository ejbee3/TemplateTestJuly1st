import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../scss/ManageStudents.scss'
import { NavMenu } from '../components/NavMenu'

export default function ManageStudents() {
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState({})
  // const [newClass, setNewClass] = useState({})
  // const [classes, setClasses] = useState([])
  const [newState, setNewState] = useState()

  useEffect(() => {
    axios
      .get('/api/student', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(resp => {
        console.log(resp.data)

        setStudents(resp.data)
      })
  }, [])

  const addNewStudent = e => {
    e.preventDefault()
    axios
      .post('/api/student', students, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(resp => {
        setStudent(resp.data)
      })
      .then(resp => {
        setStudents(students.concat(student))
        setStudent({})
      })
    console.log(students)

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
          setStudents(students.filter(f => f.id !== student.id))
        })
    }
  }

  // const deleteClass = cl => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete ${cl.grade} grade - ${cl.subject}?`
  //     )
  //   ) {
  //     axios
  //       .delete(`api/class/${cl.id}`, {
  //         headers: {
  //           Authorization: 'Bearer ' + localStorage.getItem('token')
  //         }
  //       })
  //       .then(resp => {
  //         setClasses(classes.filter(f => f.id !== cl.id))
  //       })
  //   }
  // }

  // const addClass = e => {
  //   e.preventDefault()
  //   axios
  //     .post('/api/class', newClass, {
  //       headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
  //     })
  //     .then(resp => {
  //       setNewClass(resp.data)
  //     })
  //     .then(resp => {
  //       setClasses(classes.concat(newClass))
  //       setNewClass({})
  //       console.log(classes)
  //     })

  //   e.target.reset()
  // }

  const updateValue = e => {
    const state = newState
    student[e.target.name] = e.target.value
    setNewState(state)
  }

  return (
    <div>
      <NavMenu />
      <section>
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
      </section>
      <main>
        {/* <hr />
        <section>
          <h4>Add a class:</h4>
          <form onSubmit={addClass}>
            <input
              type="text"
              placeholder="Grade"
              name="grade"
              onChange={updateValue}
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={updateValue}
            />

            <button>+</button>
          </form>
        </section> */}
        <hr />

        <ul>
          {students.map(student => {
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
          })}
        </ul>
        {/* <ul>
          {classes.map(cl => {
            return (
              <section className="roster-container">
                <li key={cl.id} className="students">
                  {cl.grade} grade -- {cl.subject}
                </li>{' '}
                <button
                  className="delete-student"
                  onClick={() => deleteClass(cl)}
                >
                  <i class="material-icons">cancel</i>
                </button>
              </section>
            )
          })}
        </ul> */}
        <hr />
      </main>
    </div>
  )
}
