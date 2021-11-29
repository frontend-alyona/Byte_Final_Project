import InputClass from "./input";

class Api {
  template = document.querySelector('#authorized-page')
  main = document.querySelector('.app-wrapper')
  baseUrl = 'https://byte-tasks.herokuapp.com/api';
  authHeaders = {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json;charset=utf-8'
  }
  headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }
  constructor(path) {
    this.path = path;
  }
  getUser() {
    fetch(this.baseUrl + '/auth/user/self', {
      method:'GET',
      headers: this.authHeaders
    })
      .then(response => response.json())
      .then(user => {
        document.querySelector('.logo').innerHTML = `Hi, ${user.name}`;
        document.querySelector('.avatar').innerHTML = user.name.charAt(0).toUpperCase();
      })
  }
  addTask(body) {
   return fetch(this.baseUrl + this.path, {
      method:'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
     .then(response => response.json())
  }

  removeTask(id) {
   return fetch(this.baseUrl + `/task/${id}`, {
      method:'Delete',
      headers: this.authHeaders
    })
  }
  patchRequest(id, body) {
    return fetch(this.baseUrl + `/task/${id}`, {
      method:'PATCH',
      headers: this.headers,
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    
  }
  getTasks() {
    let list = [];
    return fetch(this.baseUrl + '/task', {
      method:'GET',
      headers: this.authHeaders
    })
      .then(response => response.json())
      .then(tasks => {
        return tasks;
      })
  }
  login(body) {
    const reqBody = {
      email: body.email.value,
      password: body.password.value
    }
    fetch(this.baseUrl + this.path, {
      method:'POST',
      headers: this.headers,
      body: JSON.stringify(reqBody)
    })
      .then(response => response.json())
      .then(result => {
        if (result){
          localStorage.setItem('token', result.token.toString());
          new InputClass().resetForm();
          window.location.href = 'to-do-list.html';
        }
      })
  }
  register(body) {
    const reqBody = {
      email: body.email.value,
      name: body.name.value,
      password: body.password.value
    }
    fetch(this.baseUrl + this.path, {
      method:'POST',
      headers: this.headers,
      body: JSON.stringify(reqBody)
    })
      .then(response => response.json())
      .then(result => {
        if (result){
          localStorage.setItem('token', result.token.toString());
          window.location.href = 'to-do-list.html';  
        }
      })
  }
  logout() {
    localStorage.removeItem('token')
    window.location.href = 'index.html';
  }
}
export default Api;
