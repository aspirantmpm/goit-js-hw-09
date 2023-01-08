import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const { delay, stepDelay, amount } = valueOfFormElements(event);
  let targetDelay = delay;

  event.currentTarget.reset();

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, targetDelay)
      .then(successfulPromisMessage)
      .catch(failurePromisMessage);

    targetDelay += stepDelay;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function valueOfFormElements(event) {
  let delay = Number(event.target.elements.delay.value);
  const stepDelay = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  return { delay, stepDelay, amount };
}

function failurePromisMessage({ position, delay }) {
  return Notiflix.Notify.failure(
    `❌ Rejected promise ${position} in ${delay} ms`
  );
}

function successfulPromisMessage({ position, delay }) {
  return Notiflix.Notify.success(
    `✅ Fulfilled promise ${position} in ${delay} ms`
  );
}
