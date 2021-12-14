/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/API.js":
/*!*******************************!*\
  !*** ./src/components/API.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TOKEN_KEY\": () => (/* binding */ TOKEN_KEY),\n/* harmony export */   \"api\": () => (/* binding */ api)\n/* harmony export */ });\nconst TOKEN_KEY = \"token\";\r\n\r\nclass API {\r\n    constructor(){\r\n        this.baseUrl = \"https://byte-tasks.herokuapp.com/api\";\r\n        this.headers = {\r\n            Authorization: null,\r\n            \"Content-Type\": \"application/json\",\r\n        }\r\n    }\r\n\r\n    handleErrors({ok, url, status}){\r\n        if(!ok){\r\n            throw new Error (`Response on ${url} failed with status ${status}`);\r\n        }\r\n    };\r\n\r\n    async register (data){\r\n        const response = await fetch(`${this.baseUrl}/auth/register`, {\r\n            method: \"POST\",\r\n            headers: this.headers,\r\n            body: JSON.stringify(data),\r\n        })\r\n        this.handleErrors(response)\r\n\r\n        const registerUser = await response.json();\r\n\r\n        return registerUser\r\n    };\r\n\r\n    async getSelf(){\r\n        const response = await fetch(`${this.baseUrl}/auth/user/self`,{\r\n            method: \"GET\",\r\n            headers: this.headers,\r\n        })\r\n    \r\n        this.handleErrors(response);\r\n\r\n        const user = await response.json();\r\n    \r\n        return user;\r\n    };\r\n\r\n    isLoggedIn(){\r\n        return Boolean(localStorage.getItem(TOKEN_KEY));\r\n    }\r\n\r\n    authLogin(){\r\n        const localToken = localStorage.getItem(TOKEN_KEY);\r\n        this.headers.Authorization = `Bearer ${localToken}`;\r\n    \r\n        return this.getSelf();\r\n    };\r\n\r\n    async createTask(data){\r\n        const response = await fetch (`${this.baseUrl}/task`,{\r\n            method: \"POST\",\r\n            body: JSON.stringify(data),\r\n            headers: this.headers,\r\n    \r\n        })\r\n        this.handleErrors(response);\r\n    \r\n        return response.json()\r\n    };\r\n\r\n    async getAllTasks(){\r\n        const response = await fetch (`${this.baseUrl}/task`,{\r\n            method: \"GET\",\r\n            headers: this.headers,\r\n    \r\n        })\r\n        this.handleErrors(response);\r\n    \r\n        return await response.json()\r\n    }\r\n\r\n    async editTask(id, data){\r\n        const response = await fetch (`${this.baseUrl}/task/${id}`,{\r\n            method: \"PATCH\",\r\n            body: JSON.stringify(data),\r\n            headers: this.headers,\r\n        });\r\n        this.handleErrors(response);\r\n        return response.json();\r\n    };\r\n\r\n    async deleteTask(id){\r\n        const response = await fetch (`${this.baseUrl}/task/${id}`,{\r\n            method: \"DELETE\",\r\n            headers: this.headers,\r\n        });\r\n        this.handleErrors(response);\r\n        return response\r\n    }\r\n    \r\n    logout(){\r\n        localStorage.removeItem(TOKEN_KEY)\r\n    }\r\n\r\n}\r\n\r\nconst api = new API();\r\n\n\n//# sourceURL=webpack://final_project/./src/components/API.js?");

/***/ }),

/***/ "./src/components/Auth.js":
/*!********************************!*\
  !*** ./src/components/Auth.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Auth\": () => (/* binding */ Auth)\n/* harmony export */ });\n/* harmony import */ var _API__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./API */ \"./src/components/API.js\");\n/* harmony import */ var _Form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Form */ \"./src/components/Form.js\");\n/* harmony import */ var _Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Input */ \"./src/components/Input.js\");\n/* harmony import */ var _formConfigs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formConfigs */ \"./src/components/formConfigs.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../index */ \"./src/index.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst getLoginForm = (onSuccess) =>\r\n     new _Form__WEBPACK_IMPORTED_MODULE_1__.Form({\r\n        title : 'Login',\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.loginConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_2__.Input(input)),\r\n        submitBtnText: 'Submit',\r\n        onsubmit: async (data)=>{\r\n            await _API__WEBPACK_IMPORTED_MODULE_0__.api.login(data);\r\n            onSuccess()\r\n        }\r\n    })\r\n    \r\n\r\n\r\n\r\nconst getRegisterForm = (onSuccess)=>\r\n    new _Form__WEBPACK_IMPORTED_MODULE_1__.Form({\r\n        title : 'Register',\r\n        inputs: _formConfigs__WEBPACK_IMPORTED_MODULE_3__.registerConfig.map((input) => new _Input__WEBPACK_IMPORTED_MODULE_2__.Input(input)),\r\n        submitBtnText: 'Submit',\r\n        onsubmit: async (data)=>{\r\n            await _API__WEBPACK_IMPORTED_MODULE_0__.api.register( data);\r\n            onSuccess()\r\n        },\r\n    })\r\n\r\n\r\nclass Auth {\r\n    constructor({appContainer, onLoginSuccess}){\r\n        this.appContainer = appContainer;\r\n\r\n        this.formContainer = document.createElement('div');\r\n        this.switchBtn = document.createElement('button');\r\n        this.logoutBtn = document.createElement('button');\r\n        this.avatar = document.createElement('span');\r\n\r\n        this.form = null;\r\n        this.user = null;\r\n        this.isLogin = true;\r\n\r\n        this.loginForm = getLoginForm(onLoginSuccess);\r\n        this.registerForm = getRegisterForm(this.switchForms.bind(this))\r\n\r\n        this.createFormContainer();\r\n        this.createHeaderControls();\r\n\r\n    }\r\n    createFormContainer(){\r\n        this.formContainer.classList.add('auth-form');\r\n        this.switchBtn.classList.add('btn', 'btn-text');\r\n        this.switchBtn.innerText = 'Register';\r\n        this.formContainer.prepend(this.switchBtn);\r\n\r\n        this.switchBtn.addEventListener('click', ()=>{\r\n\r\n        })\r\n    }\r\n    createHeaderControls(){\r\n        this.logoutBtn.classList.add('btn', 'btn-text');\r\n        this.logoutBtn.innerText = 'Logout';\r\n        this.avatar.classList.add('avatar');\r\n\r\n        this.logoutBtn.addEventListener('click', ()=>{\r\n            this.logout();\r\n            _API__WEBPACK_IMPORTED_MODULE_0__.api.logout();\r\n            _index__WEBPACK_IMPORTED_MODULE_4__.taskBoard.logout();\r\n\r\n        })\r\n    }\r\n\r\n    renderHeaderControls(){\r\n        const controlsContainer = document.getElementById('header-controls');\r\n        this.avatar.innerText = this.user.name[0];\r\n\r\n        controlsContainer.append(this.logoutBtn, this.avatar)\r\n    }\r\n    \r\n    renderAuthForm(){\r\n        if(this.form){\r\n            this.form.form.remove()\r\n        }\r\n\r\n        if(this.isLogin){\r\n            this.form = this.loginForm\r\n        }else{\r\n            this.form = this.registerForm\r\n        }\r\n\r\n        this.form.render(this.formContainer)\r\n        this.appContainer.append(this.formContainer);\r\n\r\n    }\r\n    switchForms(){\r\n        this.isLogin = !this.isLogin;\r\n        if(this.isLogin){\r\n            this.switchBtn.innerText = 'Register';\r\n        } else{\r\n            this.switchBtn.innerText = 'login';\r\n        }\r\n\r\n        this.renderAuthForm()\r\n    }\r\n    logout(){\r\n        this.avatar.remove()\r\n        this.logoutBtn.remove()\r\n        this.appContainer.innerHTML = '';\r\n        this.isLogin = true;\r\n\r\n        this.renderAuthForm()\r\n    }\r\n}\n\n//# sourceURL=webpack://final_project/./src/components/Auth.js?");

/***/ }),

/***/ "./src/components/Form.js":
/*!********************************!*\
  !*** ./src/components/Form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Form\": () => (/* binding */ Form)\n/* harmony export */ });\nclass Form{\r\n    constructor(options){\r\n        const {inputs} = options;\r\n\r\n        this.submitBtn = document.createElement('button');\r\n        this.inputs = inputs;\r\n        this.form = document.createElement('form');\r\n        this.createForm(options)\r\n    }\r\n\r\n    static getFormValues(inputs){\r\n        return inputs.reduce((values, input)=>{\r\n            value[input.name] = input.value;\r\n            return values\r\n        }, {})\r\n    }\r\n\r\n    createForm({onSubmit, submitBtnText, title: titleText}){\r\n        const title = document.createElement('h3');\r\n\r\n        title.innerText = titleText;\r\n        title.classList.add('form-title');\r\n        this.submitBtn.innerText = submitBtnText;\r\n\r\n        this.submitBtn.type = 'submit';\r\n        this.submitBtn.classList.add('btn', 'btn-form');\r\n\r\n        this.form.addEventListener('submit', async (event)=>{\r\n            event.preventDefault()\r\n\r\n            this.formValues = Form.getFormValues(this.inputs);\r\n\r\n            this.submitBtn.setAttribute('disable', '');\r\n\r\n            try{\r\n                await onSubmit(this.formValues, event);\r\n\r\n            } catch(err){\r\n                console.log(`err`, err)\r\n            }\r\n\r\n            \r\n            this.submitBtn.removeAttribute('disable');\r\n\r\n            \r\n\r\n        })\r\n\r\n        this.form.append(title);\r\n\r\n        this.inputs.forEach((input) =>{\r\n            input.render(this.form)\r\n        })\r\n\r\n        this.form.append(this.submitBtn)\r\n    }\r\n\r\n    render(container){\r\n        container.append(this.form)\r\n    }\r\n}\n\n//# sourceURL=webpack://final_project/./src/components/Form.js?");

/***/ }),

/***/ "./src/components/Input.js":
/*!*********************************!*\
  !*** ./src/components/Input.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Input\": () => (/* binding */ Input)\n/* harmony export */ });\nclass Input{\r\n    constructor(options){\r\n        const {\r\n            name,\r\n            placeholder,\r\n            label,\r\n            type = 'text',\r\n            onInput,\r\n            onChange,\r\n        } = options;\r\n\r\n        this.input = document.createElement('input');\r\n        this.errorMessageElement = document.createElement('span');\r\n\r\n        this.name = name;\r\n        this.input.name = name;\r\n        this.input.type = type;\r\n        this.input.placeholder = placeholder;\r\n        this.label = label;\r\n        this.control = this.createControl(onInput, onChange);\r\n\r\n        this.value = this.input.value;\r\n    }\r\n    \r\n    createControl(onInput, onChange){\r\n        const container = document.createElement('div');\r\n        const label = document.createElement('label');\r\n        \r\n        const inputId = `_${this.name}`;\r\n\r\n        container.classList.add('text-control');\r\n        this.errorMessageElement.classList.add('input-error');\r\n        this.input.classList.add('input');\r\n\r\n        this.input.id = inputId;\r\n        label.setAttribute('for', inputId);\r\n\r\n        label.innerText = this.label;\r\n        container.append(label, this.input, this.errorMessageElement);\r\n\r\n        \r\n            this.input.addEventListener('input', (event) =>{\r\n                this.value = event.target.value;\r\n                if (onInput){\r\n                    onInput(event)\r\n                }\r\n            });\r\n        \r\n\r\n        if(onChange){\r\n            this.input.addEventListener('change', (event) =>{\r\n                onChange(event)\r\n            });\r\n        }\r\n\r\n        return container\r\n\r\n    }\r\n\r\n    render(container){\r\n        container.append(this.control);\r\n    }\r\n   \r\n}\n\n//# sourceURL=webpack://final_project/./src/components/Input.js?");

/***/ }),

/***/ "./src/components/TaskBoard.js":
/*!*************************************!*\
  !*** ./src/components/TaskBoard.js ***!
  \*************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Shorthand property assignments are valid only in destructuring patterns (10:18)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n|     title: \\\"Add task\\\",\\n|     inputs: taskConfig.map((input) => new Input(input)),\\n>     submitBtnText = 'Add',\\n|     onSubmit: async (data)=>{\\n|         const createdTask = await api.createTask(data);\");\n\n//# sourceURL=webpack://final_project/./src/components/TaskBoard.js?");

/***/ }),

/***/ "./src/components/formConfigs.js":
/*!***************************************!*\
  !*** ./src/components/formConfigs.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"loginConfig\": () => (/* binding */ loginConfig),\n/* harmony export */   \"registerConfig\": () => (/* binding */ registerConfig),\n/* harmony export */   \"taskConfig\": () => (/* binding */ taskConfig)\n/* harmony export */ });\nconst loginConfig =[\r\n    {\r\n        name:'email',\r\n        placeholder: 'Enter email',\r\n        label: 'email',\r\n        \r\n    },\r\n    {\r\n        name:'password',\r\n        placeholder: 'Enter password',\r\n        label: 'password',\r\n        type: 'password',\r\n\r\n    },\r\n];\r\nconst registerConfig =[\r\n    {\r\n        name:'email',\r\n        placeholder: 'Enter email',\r\n        label: 'email',  \r\n    },\r\n    {\r\n        name:'name',\r\n        placeholder: 'Enter name',\r\n        label: 'name',  \r\n    },\r\n    {\r\n        name:'password',\r\n        placeholder: 'Enter password',\r\n        label: 'password',\r\n        type: 'password',\r\n\r\n    },\r\n]\r\n\r\nconst taskConfig =[\r\n    {\r\n        name:'name',\r\n        placeholder: 'Task name',\r\n        label: 'name',  \r\n    },\r\n    {\r\n        name:'description',\r\n        placeholder: 'Task description',\r\n        label: 'description',  \r\n    }\r\n]\r\n\r\n\n\n//# sourceURL=webpack://final_project/./src/components/formConfigs.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"taskBoard\": () => (/* binding */ taskBoard)\n/* harmony export */ });\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.css */ \"./src/style/style.css\");\n/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_style_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_formConfigs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/formConfigs */ \"./src/components/formConfigs.js\");\n/* harmony import */ var _components_Input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Input */ \"./src/components/Input.js\");\n/* harmony import */ var _components_Form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Form */ \"./src/components/Form.js\");\n/* harmony import */ var _components_Auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Auth */ \"./src/components/Auth.js\");\n/* harmony import */ var _components_API__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/API */ \"./src/components/API.js\");\n/* harmony import */ var _components_TaskBoard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/TaskBoard */ \"./src/components/TaskBoard.js\");\n/* harmony import */ var _components_TaskBoard__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_components_TaskBoard__WEBPACK_IMPORTED_MODULE_6__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst appContainer = document.getElementById('app');\r\n\r\nconst onLoginSuccess = async ()=>{\r\n    console.log(`Hello`, Hello)\r\n    appContainer.innerText = '';\r\n    const user = await _components_API__WEBPACK_IMPORTED_MODULE_5__.api.getSelf();\r\n    renderAppLayout(user);\r\n}\r\n\r\n\r\n const auth = new _components_Auth__WEBPACK_IMPORTED_MODULE_4__.Auth ({\r\n    appContainer,\r\n    onLoginSuccess,\r\n});\r\n\r\n const taskBoard = new _components_TaskBoard__WEBPACK_IMPORTED_MODULE_6__.TaskBoard({\r\n    appContainer\r\n});\r\n\r\n\r\nconst renderAppLayout = async (user)=>{\r\n    auth.user =user;\r\n    auth.renderHeaderControls();\r\n    taskBoard.renderLayout()\r\n\r\n    const taskList = await _components_API__WEBPACK_IMPORTED_MODULE_5__.api.getAllTasks();\r\n    taskList.forEach((task)=> taskBoard.addTask(task))\r\n\r\n}\r\n\r\nconst init = async ()=>{\r\n    const IsLoggedIn = _components_API__WEBPACK_IMPORTED_MODULE_5__.api.IsLoggedIn();\r\n    if(IsLoggedIn){\r\n        const user =await _components_API__WEBPACK_IMPORTED_MODULE_5__.api.autoLogin();\r\n        renderAppLayout(user);\r\n    }else{\r\n        auth.renderAuthForm();\r\n    }\r\n}\r\ninit()\n\n//# sourceURL=webpack://final_project/./src/index.js?");

/***/ }),

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> .app-wrapper{\\n|     font-family: sans-serif;\\n| }\");\n\n//# sourceURL=webpack://final_project/./src/style/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;