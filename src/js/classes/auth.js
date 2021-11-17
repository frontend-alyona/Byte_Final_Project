import InputClass from "./input";

class Auth {
  baseUrl = 'https://byte-tasks.herokuapp.com/api'
  headers = {
    'Content-Type': 'application/json;charset=utf-8'
  }
  constructor(path) {
    this.path = path;
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
export default Auth;
