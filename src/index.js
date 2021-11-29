import InputClass from './js/classes/input'
// import Auth from './js/classes/auth'
import Api from './js/classes/api'
import RenderClass from './js/classes/render';
import Card from './js/classes/card';
import TimerClass from "./js/classes/timer";
import FormClass from "./js/classes/form";
import './main.css'
// import moment from "moment";

const string = 'to-do-list.html';
const start = 'index.html'

// const authBlock = document.querySelector('.authorized-block')
// const loginBlock = document.querySelector('.app-wrapper')
window.onload = function () {
    if (!localStorage.getItem('token') && document.location.href.includes(string)) {
        document.location.href = 'index.html'
    }if (localStorage.getItem('token') && document.location.href.includes(start)) {
      document.location.href = 'to-do-list.html'
  }   
}
// window.onload = function () {
//       if (!localStorage.getItem('token')) {
//           loginBlock.classList.add('show')
//           authBlock.classList.remove('hide')
//       }if (localStorage.getItem('token')) {
//           loginBlock.classList.remove('hide')
//           authBlock.classList.add('show')
//     }
//   }
const register = document.getElementById('login')
const h3 = document.querySelector('h3');

const apiRequest = new Api();
const renderClass = new RenderClass();
const taskCard = new Card();
const timerClass = new TimerClass();
const form = new FormClass();
let isLogin = true;
if (!localStorage.getItem('token')) {
  form.addLoginForm()
  const input = document.querySelector('#form-name')
  register.addEventListener('click',changeTab)
  function changeTab() {
    isLogin = !isLogin;
    (isLogin)? register.innerText = 'Register' : register.innerText = 'Login';
    (isLogin)? h3.innerText = 'Login' : h3.innerText = 'Register';
    if (!isLogin) {

      input.classList.add('show');
      input.classList.remove('hide');
    }else {
      input.classList.add('hide');
      input.classList.remove('show');
    }
  }
  const signIn = new Api('/auth/login')
  const signUp = new Api('/auth/register')
  const checkInput = new InputClass()
  document.querySelector('.btn-form').addEventListener('click',(e) => {checkData(e)})
  if(!isLogin) {
    checkInput.setValue('email','#_email');
    checkInput.setValue('password','#_password');
  }else {
    checkInput.setValue('email','#_email');
    checkInput.setValue('password','#_password');
    checkInput.setValue('name','#_name')
  }
  function checkData(e) {
    e.preventDefault();
    const body = checkInput.getBody();
    if (checkInput.checkedFieldsBeforeSend()) {
      (isLogin)? signIn.login(body) : signUp.register(body)
    }else {
      alert('Errors in fields')
    }
  }
}else {
  new Api().getUser();
  form.addTaskForm();
  showTasks();
  const logOut =  new Api()
  document.querySelector('#logout').addEventListener('click', () => logOut.logout())
  const taskInput = new InputClass();
  taskInput.setValue('taskName', '#_taskName')
  taskInput.setValue('description', '#_description')
  document.querySelector('#saveTask').addEventListener('click',(e) =>{
    e.preventDefault();
    const name = document.getElementById('_taskName');
    const description = document.getElementById('_description');
    let reqBody;
    if (name.value.length === 0 && description.value.length === 0) {
      reqBody = {}
    }else {
      const body = taskInput.getBody()
      reqBody = {
        name: body.taskName.value,
        description: body.description.value
      }
    }
    new InputClass().resetTaskForm();
    new Api('/task').addTask(reqBody)
      .then((res) => {
        showTasks();
      })
  })

}
function deleteItem(id) {
  apiRequest.removeTask(id)
    .then (() => {
      document.getElementById(id).remove();
    })
}
function showTasks() {
    const element = document.querySelector('.task-cards');
    element.innerHTML = '';
    apiRequest.getTasks()
    .then( list => {
      renderClass.saveList(list);
        list.forEach( card => {
          taskCard.createCard(card)
        }) 
      const delEl = document.querySelectorAll('.task-delete-btn');
      const timer = document.querySelectorAll('.timer-btn')
      const btnDone = document.querySelectorAll('.stopTask')
      const timeValue = document.querySelectorAll('.time-tracker span')
      const activeTimer = document.querySelectorAll('.timer-btn .fa-pause')
      activeTimer.forEach(item => {
        const id = item.parentNode.parentNode.parentNode.getAttribute('id')
        const task = renderClass.getTask(id)
        timeValue.innerHTML = `${timerClass.startTimer(task._id, task.timeTracked)}`
      })
      delEl.forEach( el => {
        el.addEventListener("click",() => deleteItem(el.parentNode.getAttribute('id')));
      })
      timer.forEach( el => {
        el.addEventListener('click', () => timeTracker(el.parentNode.parentNode.getAttribute('id')));
      })
      btnDone.forEach( el => {
        el.addEventListener('click', () => changeDoneTask(el.parentNode.getAttribute('id')));
      })
        timeValue.forEach(el => {
          const id = el.parentNode.parentNode.getAttribute('id')
          const list = renderClass.getTaskList();
          const idx = list.findIndex( item => item._id === id);
          el.innerHTML = moment.utc(list[idx].timeTracked).format('HH:mm:ss');
        })
    })
}
function timeTracker(id) {
  const list = renderClass.getTaskList();
  const idx = list.findIndex( item => item._id === id);
  const status = (list[idx].isActive)? false : true;
  apiRequest.patchRequest(id, {isActive: status})
  .then((res) => {
   renderClass.rerender(res, 'timer')
  })
}
function changeDoneTask(id) {
const list = renderClass.getTaskList();
const idx = list.findIndex( item => item._id === id);
const status = list[idx].isFinished;
apiRequest.patchRequest(id, {isFinished: !status})
.then((res) => {
 renderClass.rerender(res, 'task')
})
 }

