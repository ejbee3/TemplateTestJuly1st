import '../scss/Splash.scss'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Splash() {
  return (
    <div className="main-container">
      <div className="splash-title">classfetch</div>
      <img className="splashLogo" alt="some kind of logo" />
      <p className="description">
        is a website that allows teachers to keep track of their students'
        attendance through an interactive user interface. Teachers can keep an
        eye on previous attendance, excuse absences, and organize class rosters!
      </p>
      <section className="button-container">
        <Link className="splash-link" to="/signup">
          <button className="splash-button">Register!</button>
        </Link>
        <Link className="splash-link" to="/login">
          <button className="splash-button">Login!</button>
        </Link>
      </section>
    </div>
  )
}
