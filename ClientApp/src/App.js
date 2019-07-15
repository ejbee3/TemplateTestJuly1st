import React, { Component } from 'react'
import { Route } from 'react-router'
import { Layout } from './components/Layout'
import TeacherPortal from './Pages/TeacherPortal.jsx'
import ManageStudents from './Pages/ManageStudents.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import UploadPhoto from './Pages/UploadPhoto.jsx'
import PastAttendance from './Pages/PastAttendance'

export default class App extends Component {
  static displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path="/" component={TeacherPortal} />
        <Route exact path="/manage" component={ManageStudents} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/upload" component={UploadPhoto} />
        <Route exact path="/past" component={PastAttendance} />
      </Layout>
    )
  }
}
