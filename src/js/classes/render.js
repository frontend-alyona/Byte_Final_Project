import TimerClass from "./timer";

class RenderClass {
    tasks = [];
    timerClass = new TimerClass();
    constructor() {
    }
    saveList(taskList) {
        this.tasks = taskList;
    }
    getTaskList() {
        return this.tasks;
    }
    getTask(id) {
        const idx = this.tasks.findIndex( item => item._id === id);
        return this.tasks[idx]
    }
    rerender(card, action) {
        this.updateTask(card);
        const element = document.getElementById(card._id);
        const title = element.querySelector('.task-title')
        const description = element.querySelector('.task-description')
        const timerSpan = element.querySelector('.time-tracker span')
        const timerBtnIcon = element.querySelector('.time-tracker .timer-btn i')
        const timerBtn = element.querySelector('.timer-btn')
        const date = element.querySelector('.task-date')
        const btn = element.querySelector('.stopTask')
        const test = element.querySelector('.test-class')
        if (action === 'task') {
            if(card.isFinished === true) {
                title.classList.add('finished')
                description.classList.add('finished')
                date.classList.add('finished')
                timerSpan.classList.add('finished')
                btn.innerHTML = 'Restart'
                timerBtn.setAttribute('disabled', 'disabled')
            }
            if(card.isFinished === false) {
                title.classList.remove('finished')
                description.classList.remove('finished')
                date.classList.remove('finished')
                btn.innerHTML = 'Mark as done'
                timerSpan.classList.remove('finished')
                timerBtn.removeAttribute("disabled")
            }
        }
        if (action === 'timer') {
            if (card.isActive) {
                timerBtnIcon.classList.remove('fa-pause')
                timerBtn.classList.remove('timer-btn-stop')
                timerBtnIcon.classList.add('fa-play')
                timerBtn.classList.add('timer-btn-play')
                // card.timeTracked > 0 ? this.timerClass.startTimer(card._id,'.time-tracker span', card.timeTracked)  : this.timerClass.stopTimer();
                this.timerClass.stopTimer()
            }
            if (!card.isActive) {
                timerBtnIcon.classList.remove('fa-play')
                timerBtn.classList.remove('timer-btn-play')
                timerBtnIcon.classList.add('fa-pause')
                timerBtn.classList.add('timer-btn-stop')
                this.timerClass.startTimer(card._id, card.timeTracked)

            }
        }
      }
    updateTask(cart){
        const idx = this.tasks.findIndex(item => item._id === cart._id);
        this.tasks[idx] = cart
    }
}
export default RenderClass;
