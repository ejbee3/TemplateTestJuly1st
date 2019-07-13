import '../scss/TeacherPortal.scss'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import drstrange from '../images/drstrange.gif'
import sorcerersup from '../images/sorcerersup.gif'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

export default function TeacherPortal() {
  const [students, setStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    Axios.get('/api/student', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(resp => {
      setStudents(resp.data)
    })
  }, [])

  const getSearchResults = e => {
    e.preventDefault()
    Axios.get('/api/search/students?searchTerm=' + searchTerm, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(resp => {
      setStudents(resp.data)
    })
  }

  const checkInStudent = student => {
    Axios.post(
      `/api/checkin/${student.id}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    ).then(resp => {
      setMessage(
        `Student: ${student.firstName} was successfully checked in at ${format(
          new Date(resp.data.timeCheckedIn),
          'hh:mm:ss A'
        )}.`
      )
    })
  }

  const logAbsent = student => {
    Axios.post(
      `/api/checkin/absent/${student.id}`,
      {},
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
    ).then(resp => {
      setMessage(`Student: ${student.firstName} was logged absent.`)
    })
  }

  console.log({ message })

  const signOut = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <div>
      <section className="teacher-info">
        <h2>Mrs. Wilson's class</h2>
        <h3>6th grade -- Math</h3>
        <section className="black-board">
          <p>2x + y = 8</p>
          <img
            src={sorcerersup}
            alt="sorcerer supreme saying excellent"
            className="teacher-image"
          />
          <p>v = l x w x h</p>
        </section>
      </section>
      <form onSubmit={getSearchResults}>
        <input
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <button>search student</button>
      </form>
      <section>{message && <h3 className="font-change">{message}</h3>}</section>
      <main>
        <hr />
        <h4>Currently being checked in...</h4>
        <hr />
        <ul>
          {students.map(student => {
            return (
              <section className="student-container">
                <li key={student.id}>
                  {student.firstName} {student.lastName}
                </li>{' '}
                <img
                  src={drstrange}
                  className="desk-image"
                  alt="books in pile"
                />
                <button
                  className="check-button"
                  onClick={() => checkInStudent(student)}
                >
                  <i class="material-icons">check</i>
                </button>
                <button className="x-button" onClick={() => logAbsent(student)}>
                  <i class="material-icons">close</i>
                </button>
              </section>
            )
          })}
        </ul>
        <section>
          <hr />
          <h4>Absent Students</h4>
          <hr />
          <ul>
            {students.map(s => {
              return (
                <section className="student-container">
                  <li key={s.id}>
                    {s.firstName} {s.lastName}
                  </li>{' '}
                  <button className="absent-button">
                    <i class="material-icons">arrow_upward</i>
                  </button>
                </section>
              )
            })}
          </ul>
          <hr />
        </section>
      </main>

      <section>
        <button onClick={signOut}>sign out</button>
      </section>
      <section>
        <Link className="upload-link" to="/upload">
          <button className="upload-button">upload pic</button>
        </Link>
      </section>
    </div>
  )
}
