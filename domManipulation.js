const form = document.querySelector('form');
let selected;
let cSelected;
const radios = form.querySelectorAll("input[type='radio']");
const cRadios = form.querySelectorAll('radio-btn');

radios.forEach((radio) => {
  radio.addEventListener('click', () => {
    selected = radio.value;
  });
});

cRadios.forEach((radio) => {
  radio.addEventListener('click', () => {
    cSelected = radio.value;
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(selected);
  console.log('c', cSelected);
});
