import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import TeacherPortal from './Pages/TeacherPortal.jsx'
import ManageStudents from './Pages/ManageStudents.jsx'
import Login from './Pages/Login'
import Register from './Pages/Register'

export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path="/" component={TeacherPortal} />
        <Route exact path="/manage" component={ManageStudents} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
      </Layout>
    )
  }
}
