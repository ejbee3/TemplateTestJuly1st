import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavMenu } from '../components/NavMenu'

export default function PastAttendance() {
  const [checkIns, setCheckIns] = useState([])

  useEffect(() => {
    axios
      .get('api/checkin/all', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      .then(resp => {
        setCheckIns(resp.data)
      })
  }, [])

  console.log(checkIns)

  return (
    <div>
      <NavMenu />
      <section>
        <h3>Student attendance for your class:</h3>
      </section>
      {/* <section>
        <ul>
          {checkIns.map(checkIn => {
            return (
              <section>
                <li key={checkIn.id}>
                  <p>{checkIn.</p>
                </li>
              </section>
            )
          })}
        </ul>
      </section> */}
    </div>
  )
}
