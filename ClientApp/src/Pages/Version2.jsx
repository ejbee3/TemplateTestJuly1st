import React, { Component } from 'react'
import '../scss/Version2.scss'
class Version2 extends Component {
  render() {
    return (
      <div>
        <main>
          <h1 className="title-text">What to expect next:</h1>
          <ul className="list-items">
            <li>
              Past attendance history for teachers to see which students are
              present over a period of time.
            </li>
            <li>
              Class manager to keep track of which students are in which class.
            </li>
            <li>Button to excuse absences in past attendance.</li>
          </ul>
        </main>
      </div>
    )
  }
}

export default Version2
