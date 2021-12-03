class InputClass {
  regBody = {
    email: {
      email: '',
      isValid: false
    },
    name: {
      name: '',
      isValid: false
    },
    password: {
      value: '',
      isValid: false
    },
    taskName: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  };
  constructor() {}

  setValue(name, selector) {
    document.querySelector(selector).addEventListener('change', (event)=> {
      this.validateData(name, event.target.value)
    })
  }

  resetForm() {
    document.querySelector('#_email').value = '';
    document.querySelector('#_password').value = '';
    document.querySelector('#_name').value = '';
  }

  resetTaskForm() {
    document.getElementById('_taskName').value = '';
    document.getElementById('_description').value = '';
  }

  getBody () {
    return this.regBody;
  }

  validateData(name, value) {
    const disabledBtn = document.getElementById('send-form');
    switch(name) {
      case 'email':
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(value)){
          this.regBody[name] = {value, isValid: true};
          document.querySelector('.error-email').innerHTML = '';
        } else {
          document.querySelector('.error-email').innerHTML = 'Invalid Email';
          this.regBody[name] = {value, isValid: false};

        }
        break;
      case 'password':
        if (value.length > 5){
          this.regBody[name] = value;
          document.querySelector('.error-password').innerHTML = '';
          this.regBody[name] = {value, isValid: true};
        } else {
          document.querySelector('.error-password').innerHTML = 'Invalid password';
          this.regBody[name] = {value, isValid: false};
        }
        break;
      case 'name':
        if (value.length > 5){
          this.regBody[name] = value;
          document.querySelector('.error-name').innerHTML = '';
          this.regBody[name] = {value, isValid: true};
        } else {
          document.querySelector('.error-name').innerHTML = 'Your name is to short';
          this.regBody[name] = {value, isValid: false};
        }
        break;
      case 'taskName':
        if (value.length > 4){
          this.regBody[name] = value;
          document.querySelector('.error-task-name').innerHTML = '';
          this.regBody[name] = {value, isValid: true};
        } else {
          document.querySelector('.error-task-name').innerHTML = 'Your task name is to short';
          this.regBody[name] = {value, isValid: false};
        }
        break;
      case 'description':
        if (value.length > 5){
          this.regBody[name] = value;
          document.querySelector('.error-description').innerHTML = '';
          this.regBody[name] = {value, isValid: true};
        } else {
          document.querySelector('.error-description').innerHTML = 'Your description is to short. Min length 5 characters';
          this.regBody[name] = {value, isValid: false};
        }
        break;
      default:
        return false
    }
  }
  
  checkedFieldsBeforeSend() {
    if ( this.regBody.email.isValid && this.regBody.password.isValid) {
      return true;
    }else {
      return false;
    }
  }
}
export default InputClass;

