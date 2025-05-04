import axios from 'axios'

const API = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// const APIWITHTOKEN = axios.create({
//   baseURL: "http://localhost:3001/api",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization: localStorage.getItem("tokenHoYo"),
//   },
// });

// export { API, APIWITHTOKEN };


const APIWITHTOKEN = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

APIWITHTOKEN.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenHoYo");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

 export { API, APIWITHTOKEN };
