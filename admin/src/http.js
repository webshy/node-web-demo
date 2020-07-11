import axios from 'axios'

const http = axios.create({
  // baseURL:'http://localhost:4400/admin/api'
  baseURL:'http://localhost:4400/admin/api/rest/'
})

export default http 