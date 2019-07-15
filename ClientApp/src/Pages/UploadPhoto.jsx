import React, { Component } from 'react'
import axios from 'axios'

import classNames from 'classnames'
import Dropzone from 'react-dropzone'

export default class UploadPhoto extends Component {
  state = {}

  onDrop = files => {
    console.log({ files })
    // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('timestamp', (Date.now() / 1000) | 0)

      return axios
        .post('/api/image', formData, {
          headers: {
            'content-type': 'multipart/form-data',
            accept: 'application/json'
          }
        })
        .then(response => {
          console.log({ response })
          this.setState({
            lastUploadedUrl: response.data.image.url
          })
        })
    })

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      console.log('done')
    })
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div
                {...getRootProps()}
                className={classNames('dropzone', {
                  'dropzone--isActive': isDragActive
                })}
              >
                <input type="file" {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                )}
              </div>
            )
          }}
        </Dropzone>
        <div>
          <img src={this.state.lastUploadedUrl} alt="upload" />
        </div>
      </div>
    )
  }
}
