class TimerClass {
  timerInterval = 0;
  constructor(id, isActive, timeTracked) {
    this.id = id;
    this.isActive = isActive;
    this.timeTracked = timeTracked
  }
  
  startTimer(parent,timeTracked) {
    const formatted = moment.utc(timeTracked)
    const card = document.getElementById(parent)
    this.timerInterval = setInterval(function() {
        formatted.add(1, 'second');
        card.querySelector('.time-tracker span').innerHTML =
            formatted.format('HH:mm:ss');
    }, 1000);
    
  }
  stopTimer() {
      clearInterval(this.timerInterval);
  }
}
export default TimerClass;
