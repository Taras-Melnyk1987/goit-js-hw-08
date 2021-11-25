import throttle from 'lodash.throttle';

const form = document.querySelector('.js-form');
const FEEDBACK_FORM_STATE = 'feedback-form-state';
let userStates = {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));
fillInUserData();

// обработчик input
function onFormInput(e) {
  userStates[e.target.name] = e.target.value;
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(userStates));
}

// обработчик submit
function onFormSubmit(e) {
  e.preventDefault();

  // получаем данные из localStorage
  const dataFromLocalStorage = localStorage.getItem(FEEDBACK_FORM_STATE);
  const outputUserData = JSON.parse(dataFromLocalStorage);

  // проверка на отправку пустой формы
  if (!outputUserData) {
    alert('Все поля формы должны быть заполнены!');
    return;
  }
  // проверка на отправку формы без email
  if (!outputUserData.email) {
    alert("Поле 'Email' обязательно должно быть заполнено!");
    return;
  }
  // проверка на отправку формы без Message
  if (!outputUserData.message) {
    alert("Поле 'Message' обязательно должно быть заполнено");
    return;
  }

  // выполнение скрипта submit, если все поля заполнены
  console.log(outputUserData);
  form.reset();
  localStorage.removeItem(FEEDBACK_FORM_STATE);
  userStates = {};
}

// проверка localStorage
function fillInUserData() {
  const data = localStorage.getItem(FEEDBACK_FORM_STATE);

  if (data) {
    // в случае, если localStorage не пустой, парсим
    const parsedData = JSON.parse(data);

    // подставляем поля, если поля нет undefined в поле не появиться, без этой проверки - появлялось, становилось строкой и форма его принимала как заполненое поле, если на поле email валидация не пропускала undefined, то в поле message - пропускало
    if (parsedData.email) {
      form.email.value = parsedData.email;
    }

    if (parsedData.message) {
      form.message.value = parsedData.message;
    }

    updateUserStates(form.email.value, form.message.value);
  }
}

// Обновляем значения полей после перазгузки. Эту функцию я добавила потому что, при перезагрузке страницы, поля заполняются, но например поле email, если его не трогали, а только дописали message, не определялось в localStorage, т.к. события input не происходило, и результатирующий объект был без этого свойства при сабмите.
function updateUserStates(email, message) {
  userStates.email = form.email.value;
  userStates.message = form.message.value;
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(userStates));
}