class FormClass {
  constructor() {}

  addLoginForm() {
    const loginForm = document.getElementById('login-form')
    loginForm.innerHTML = `
            <div class="text-control">
              <label for="_email">Email</label
              ><input type="text" class="input" id="_email" required /><span
                class="input-error error-email"
            ></span>
            </div>
            <div id="form-name" class="text-control hide">
              <label for="_name">Name</label
              ><input type="text" class="input" id="_name" required /><span
                class="input-error error-name"
            ></span>
            </div>
            <div class="text-control">
              <label for="_password">Password</label
              ><input type="password" class="input" id="_password" required /><span
                class="input-error error-password"
            ></span>
            </div>
            <button id="send-form" type="submit" class="btn btn-form">Submit</button>`
  }

  addTaskForm() {
    const taskForm = document.querySelector('#task-area')
    taskForm.innerHTML = `
              <form>
                <h3 class="form-title">Add task</h3>
                <div class="text-control">
                  <label for="_taskName">Name</label
                  ><input type="text" class="input" id="_taskName" /><span
                    class="input-error error-task-name"
                  ></span>
                </div>
                <div class="text-control">
                  <label for="_description">Description</label
                  ><input type="text" class="input" id="_description" /><span
                    class="input-error error-description"
                  ></span>
                </div>
                <button id="saveTask" type="submit" class="btn btn-form">Add</button>
              </form>`
  }
}

export default FormClass;
