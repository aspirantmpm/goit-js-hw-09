import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  disableMobile: true,
  onClose(selectedDates) {
    if (dateChecker(selectedDates[0], options.defaultDate.getTime())) {
      return;
    }

    targetTime = selectedDates[0].getTime();
    refs.btn.disabled = false;
  },
};

const refs = {
  btn: document.querySelector('[data-start]'),
  input: document.querySelector('#datetime-picker'),

  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.btn.addEventListener('click', onClick);
refs.btn.disabled = true;

const fp = flatpickr(refs.input, options);
let targetTime = null;

class Timer {
  constructor({ onTick }) {
    this.intervalId = null;
    this.onTick = onTick;
    this.intervalTime = 1000;
    this.startMessage = 'Countdown started!';
    this.endMessage = 'Countdown completed!';
  }

  start() {
    refs.btn.disabled = true;
    refs.input.disabled = true;
    Notiflix.Notify.success(this.startMessage);

    this.intervalId = setInterval(() => {
      const currentDate = Date.now();

      if (this.isCountdownOver(targetTime, currentDate)) {
        return;
      }
      this.onTick(this.convertMs(targetTime - currentDate));
    }, this.intervalTime);
  }

  stop() {
    clearInterval(this.intervalId);
    Notiflix.Notify.info(this.endMessage);
    refs.input.disabled = false;
  }

  isCountdownOver(targetDate, currentDate) {
    const multiplier = 0.001;
    if (
      Math.floor(targetDate * multiplier) <=
      Math.floor(currentDate * multiplier)
    ) {
      this.stop();
      return true;
    }
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }
}
const timer = new Timer({ onTick: updateClockface });

function updateClockface({ days, hours, minutes, seconds }) {
  refs.days.textContent = this.addLeadingZero(days);
  refs.hours.textContent = this.addLeadingZero(hours);
  refs.minutes.textContent = this.addLeadingZero(minutes);
  refs.seconds.textContent = this.addLeadingZero(seconds);
}

function dateChecker(targetDate, currentDate) {
  const multiplier = 0.001;
  if (
    Math.floor(targetDate * multiplier) < Math.floor(currentDate * multiplier)
  ) {
    if (!refs.btn.hasAttribute('disabled')) {
      refs.btn.disabled = true;
    }
    Notiflix.Notify.failure('Please choose a date in the future');
    return true;
  }
}

function onClick() {
  if (dateChecker(targetTime, Date.now())) {
    return;
  }
  timer.start();
}
