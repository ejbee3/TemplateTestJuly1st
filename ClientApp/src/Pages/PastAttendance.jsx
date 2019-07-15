import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function PastAttendance() {

  const [checkIns, setCheckIns ] = useState([])
  