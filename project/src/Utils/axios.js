import axios from 'axios'
var token = localStorage.getItem("token");
const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers:{Authorization:`Bearer ${token}`}
});
export default instance;