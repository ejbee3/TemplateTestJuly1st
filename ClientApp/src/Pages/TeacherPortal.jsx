import '../scss/TeacherPortal.scss'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import pencil from '../images/pencil.jpg'

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
      setMessage(`Student: ${student.firstName} was successfully checked in`)
    })
  }

  const signOut = () => {
    localStorage.clear()
    window.location.href = '/login'
  }

  return (
    <div>
      <section className="teacher-info">
        <h2>Mrs. Wilson's class</h2>
        <h3>6th grade -- Science</h3>
      </section>
      <form onSubmit={getSearchResults}>
        <input
          type="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        <button>search student</button>
      </form>
      <section>{message && <h3>{message}</h3>}</section>
      <main>
        <ul>
          {students.map(student => {
            return (
              <div className="flex-container">
                <section className="student-container">
                  <li key={student.id}>
                    {student.firstName} {student.lastName}
                  </li>{' '}
                  <button onClick={() => checkInStudent(student)}>
                    check in
                  </button>
                </section>
              </div>
            )
          })}
        </ul>
      </main>
      <section>
        <button onClick={signOut}>sign out</button>
      </section>
      {/* <footer>
        <img src={pencil} className="apple-image" alt="apple for desktop app" />
      </footer> */}
    </div>
  )
}
