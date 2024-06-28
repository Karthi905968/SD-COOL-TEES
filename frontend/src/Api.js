import axios from 'axios'
export const API = axios.create({
    baseURL:'https://backendapi-cooltees.onrender.com/api/',
    headers:{
        'Content-Type':'application/json'
    }
})