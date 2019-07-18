import React, { useState } from 'react'
import Axios from 'axios'
import pawprint from '../images/pawprint.png'
import '../scss/Register.scss'
import { NavMenu } from '../components/NavMenu'

export default function Register() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const submitForm = e => {
    e.preventDefault()
    Axios.post('/auth/register', {
      fullName,
      password,
      email: userName
    }).then(resp => {
      localStorage.setItem('token', resp.data.token)
      localStorage.setItem('expires_at', resp.data.expiresAt)
      localStorage.setItem('current_user', JSON.stringify(resp.data.user))
      window.location.href = '/teach'
    })
  }

  return (
    <div>
      <NavMenu />
      <section className="sign-up-caption">
        <h1 className="display-4">Sign up for a teacher account.</h1>
        <img src={pawprint} alt="diagonal paw prints" className="paw-prints" />
      </section>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label for="fullNameExample">Name</label>
          <input
            type="text"
            name="fullName"
            className="form-control"
            id="fullNameExample"
            aria-describedby="nameHelp"
            placeholder="Teacher's Name"
            onChange={e => setFullName(e.target.value)}
          />
          <small id="nameHelp" className="form-text text-muted">
            Name you would like to go by for your class(es).
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
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
            Please use your work email.
          </small>
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
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
