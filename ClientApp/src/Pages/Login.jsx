import React, { useState } from 'react'
import axios from 'axios'
import dog from '../images/dog-running.gif'
import '../scss/Login.scss'
import { NavMenu } from '../components/NavMenu'

export default function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const submitForm = e => {
    e.preventDefault()
    axios
      .post('/auth/login', {
        password,
        email: userName
      })
      .then(resp => {
        localStorage.setItem('token', resp.data.token)
        localStorage.setItem('expires_at', resp.data.expiresAt)
        localStorage.setItem('current_user', JSON.stringify(resp.data.user))
        window.location.href = '/'
      })
  }

  return (
    <div>
      <NavMenu />
      <section className="top-caption">
        <h1 className="display-4">Log in to fetch students.</h1>
        <img src={dog} alt="yellow dog running" className="login-image" />
      </section>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label className="email-text" for="exampleInputEmail1">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={e => setUserName(e.target.value)}
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            Welcome back.
          </small>
        </div>
        <div className="form-group">
          <label className="pass-text" for="exampleInputPassword1">
            Password
          </label>
          <input
            type="password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
