import TimerClass from "./timer";

class Card {
  timerClass = new TimerClass();  
  constructor() {}

  createCard(card) {
    const element = document.querySelector(".task-cards");
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
            </div>`;
  }
}

export default Card;
