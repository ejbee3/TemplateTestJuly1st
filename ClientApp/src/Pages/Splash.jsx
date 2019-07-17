import pom from '../images/pom-splash.png'
import '../scss/Splash.scss'
import React, { useState } from 'react'

export default function Splash() {
  const [loginMessage, setLoginMessage] = useState('Login!')
  const [registerMessage, setRegisterMessage] = useState('Register!')

  const login = () => {
    window.location.href = '/login'
  }

  const register = () => {
    window.location.href = '/signup'
  }

  const arfButtonLogin = () => {
    setLoginMessage('arf!')
  }
  const arfButtonRegister = () => {
    setRegisterMessage('arf, arf!')
  }

  const resetButtonLogin = () => {
    setLoginMessage('Login!')
  }

  const resetButtonRegister = () => {
    setRegisterMessage('Register!')
  }

  return (
    <div className="big-container">
      <div className="main-container">
        <div className="splash-title">
          classfetch
          <span>
            <i class="fas fa-paw" />
          </span>
        </div>
        <img src={pom} className="splash-logo" alt="pom doggo" />
        <p className="description">
          is a web app that allows teachers to keep track of their students'
          attendance through an interactive user interface. Teachers can
          organize class rosters, log check ins and absences for each class
          period, and upload pictures for their profiles!
        </p>
        <section className="chalk-container">
          <article className="chalk" />
          <article className="chalk2" />
          <article className="chalk3" />
          <article className="chalk4" />
        </section>
      </div>

      <section className="ledge-container" />

      <section className="button-container">
        <button
          onClick={register}
          onMouseOver={arfButtonRegister}
          onMouseOut={resetButtonRegister}
          className="splash-button"
        >
          {registerMessage}
        </button>

        <button
          onClick={login}
          onMouseOver={arfButtonLogin}
          onMouseOut={resetButtonLogin}
          className="splash-button"
        >
          {loginMessage}
        </button>
      </section>
      <footer>EJBIII &copy; 2019</footer>
    </div>
  )
}
