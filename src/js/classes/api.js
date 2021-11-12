import RenderClass from "./render";


class Api {
  baseUrl = 'https://byte-tasks.herokuapp.com/api'
  constructor(path) {
    this.path = path;
  }
  getUser() {
    fetch(this.baseUrl + '/auth/user/self', {
      method:'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
     .then(response => response.json())
  }

  removeTask(id) {
   return fetch(this.baseUrl + `/task/${id}`, {
      method:'Delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  }
  patchRequest(id, body) {
    // console.log('body before sent', body);
    return fetch(this.baseUrl + `/task/${id}`, {
      method:'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    
  }
  getTasks() {
    let list = [];
    return fetch(this.baseUrl + '/task', {
      method:'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(response => response.json())
      .then(tasks => {
        return tasks;
      })
  }
}
export default Api;
