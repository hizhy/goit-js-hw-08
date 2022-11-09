import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
formRef.addEventListener('input', throttle(onInput, 500));
formRef.addEventListener('submit', onFormSubmit);
const STORAGE_KEY = 'feedback-form-state';
const data = {};

FormToLoad();

function onInput(e) {
  data[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log(data);
}

function FormToLoad() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    const inputRef = formRef.querySelector('input');
    const textareaRef = formRef.querySelector('textarea');
    inputRef.value = savedData.email ? savedData.email : '';
    textareaRef.value = savedData.message ? savedData.message : '';
    data.email = savedData.email;
    data.message = savedData.message;
  }
}

function onFormSubmit(e) {
  e.preventDefault();
  if (data.email && data.message) {
    console.log(data);
    data.email = '';
    data.message = '';
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
