import axios from 'axios'
import environment from '../../environments/environment'
const { baseUrl } = environment

export default axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    'application-id': 2,
    'Content-Type': 'application/json',
  },
})