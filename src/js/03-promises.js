import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  let nextDelay;
  let step = Number(refs.step.value);
  let delay = Number(refs.delay.value);
  e.preventDefault();
  for (let i = 0; i < Number(refs.amount.value); i += 1) {
    nextDelay = delay + step * i;
    createPromise(i + 1, nextDelay);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise(shouldResolve => {
    if (shouldResolve) {
      setTimeout(
        () =>
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          ),
        delay
      );
    } else {
      setTimeout(
        () =>
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          ),
        delay
      );
    }
  });
}
