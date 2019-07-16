import pom from '../images/pom-splash.png'
import '../scss/Splash.scss'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Splash() {
  const [chalkColor, setChalkColor] = useState('')
  return (
    <div className="big-container">
      <div className="main-container">
        <div className="splash-title">
          classfetch
          <span>
            <i class="fas fa-paw" />
          </span>
        </div>
        <img src={pom} className="splashLogo" alt="pom doggo" />
        <p className="description">
          is a web app that allows teachers to keep track of their students'
          attendance through an interactive user interface. Teachers can keep an
          eye on previous attendance, excuse absences, and organize class
          rosters!
        </p>
        <section className="chalk-container">
          <article className="chalk" />
          <article className="chalk" />
          <article className="chalk" />
          <article className="chalk" />
        </section>
      </div>

      <section className="ledge-container" />

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
