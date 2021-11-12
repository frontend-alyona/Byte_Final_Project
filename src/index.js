import InputClass from './js/classes/input'
import Auth from './js/classes/auth'
import Api from './js/classes/api'
import RenderClass from './js/classes/render';
import TimerClass from "./js/classes/timer";

const string = 'to-do-list.html';
const start = 'index.html'
window.onload = function () {
    if (!localStorage.getItem('token') && document.location.href.includes(string)) {
        document.location.href = 'index.html'
    }if (localStorage.getItem('token') && document.location.href.includes(start)) {
      document.location.href = 'to-do-list.html'
  }
    
}

const register = document.getElementById('login')
const h3 = document.querySelector('h3');
const input = document.querySelector('#form-name')
const apiRequest = new Api();
const renderClass = new RenderClass();
const timerClass = new TimerClass()
let isLogin = true;
if (!localStorage.getItem('token')) {
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
  const signIn = new Auth('/auth/login')
  const signUp = new Auth('/auth/register')
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
  new Api().getUser()
  const tasks = new Api()
  showTasks();
  const logOut =  new Auth()
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
          render(card);
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
  console.log('clicked timer')
  const list = renderClass.getTaskList();
  const idx = list.findIndex( item => item._id === id);
  const status = list[idx].isActive ? false : true;
  apiRequest.patchRequest(id, {isActive: status})
  .then((res) => {
    renderClass.rerender(res, 'timer')
    renderClass.updateTask(res, 'timer')
  })

}
function changeDoneTask(id) {
  console.log('clicked task')
const list = renderClass.getTaskList();
const idx = list.findIndex( item => item._id === id);
const status = list[idx].isFinished;
console.log('Status task in patch request', status)
//  const parent = document.getElementById(id)
//   const elWithAttribute = parent.querySelector('.task-title')
//   const val = elWithAttribute.getAttribute('isfinished')
//   const result = !val
//   console.log('parent', parent);
//   console.log('attribute', result);
apiRequest.patchRequest(id, {isFinished: !status })
.then((res) => {
 renderClass.rerender(res, 'task')
})
 }
function render(card) {
  const element = document.querySelector('.task-cards');
  element.innerHTML += `
            <div id=${card._id} class="task-card">
              <h3 class="task-title ${card.isFinished ? 'finished' : ''}" isfinished="${card.isFinished}">${card.name}</h3>
              <p class="task-description ${card.isFinished ? 'finished' : ''}">${card.description}</p>
              <div class="time-tracker" >
                <button ${card.isFinished ? 'disabled' : ''} ${ card.isActive ? 'class="timer-btn timer-btn-stop"' : 'class="timer-btn timer-btn-play"'}>
                  <i ${ card.isActive ? 'class="fas fa-pause' : 'class="fas fa-play'}"></i></button
                ><span ${card.isFinished ? 'class=finished' : ''}>00:00:00</span>
              </div>
              <p class="task-date ${card.isFinished ? 'finished' : ''}">${moment(card.createdAt).format('MM/DD/YYYY, h:mm:ss a')}</p>
              <button  class="btn btn-form btn-small stopTask"> ${card.isFinished ? 'Restart' : 'Mark as done'}</button
              >
              <button  class="task-delete-btn">
                <i class="fas fa-times"></i>
              </button>
            </div>`
}
