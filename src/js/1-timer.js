import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;
let now;

const input = document.querySelector("#datetime-picker");
const btn = document.querySelector("button[data-start]");
const days = document.querySelector("span[data-days]");
const hours = document.querySelector("span[data-hours]");
const minutes = document.querySelector("span[data-minutes]");
const seconds = document.querySelector("span[data-seconds]");

function padNumber(number, length) {
  return number.toString().padStart(length, '0');
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const checkDate = new Date(userSelectedDate.getFullYear(),userSelectedDate.getMonth(), userSelectedDate.getDate());
      if(checkDate > today){
        btn.removeAttribute("disabled");
        input.removeAttribute("disabled");
        btn.classList.remove("disabled-btn");
      }
      else{
        btn.setAttribute("disabled", "true");
        btn.classList.add("disabled-btn");
        iziToast.error({
          title: 'Invalid date',
          message: 'Please choose a date in the future',
          position: 'center',
      });
      }
    },
  };

flatpickr(input, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return{
      days: padNumber(days, 2),
      hours: padNumber(hours, 2),
      minutes: padNumber(minutes, 2),
      seconds: padNumber(seconds, 2),
    };
  }

  
function startTimer(){
  if(btn.classList.contains("disabled-btn")){
    return
  }
  btn.classList.add("disabled-btn");
  btn.setAttribute("disabled", "true");
  input.setAttribute("disabled", "true");
  const intervalId = setInterval(function(){
    now = new Date();
    const timeDifference = userSelectedDate - now;
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      input.removeAttribute("disabled");
    }
    const timeLeft = convertMs(timeDifference);
    days.textContent = timeLeft.days;
    hours.textContent = timeLeft.hours;
    minutes.textContent = timeLeft.minutes;
    seconds.textContent = timeLeft.seconds;
  },1000)
  
  }
  



btn.addEventListener("click", startTimer);