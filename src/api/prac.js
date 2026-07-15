import axio from 'axios';

const api = axios.create({
    baseURL:"https://dummyjson.com",
    Headers:{
        "Content-Type":"application/json"
    }
})

export default api;