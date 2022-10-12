import axios from 'axios'

// const request = axios.create({
//   baseURL: 'https://chatting-app-api-chatify.herokuapp.com/'
// })

// Auth Section -----------------------------
export function userLogin (username, password) {
  return axios.post('https://chatting-app-api-chatify.herokuapp.com/api/user/login/', {
    username: username,
    password: password
  }).then(res => res.data.token)
}

export function userRegister (username, email, password) {
  return axios.post('https://chatting-app-api-chatify.herokuapp.com/api/user', {
    username: username,
    email: email,
    password: password
  }).then(res => res.data)
}

// Auth Section End -----------------------------


export function userChats (token) {
  return axios.get('https://chatting-app-api-chatify.herokuapp.com/api/chat', {
    headers: {
      Authorization: 'token ' + token
    }
  })
    .then(res => res.data)
}
