let globalNames = ['Aprender JavaScrip', 'Estudar nodeJS', 'ReactJs'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  const form = document.querySelector('.form-group');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(NewName) {
    globalNames.push(NewName);
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    let valueInput = event.target.value;
    if (event.key === 'Enter') {
      if (isEditing && valueInput.trim() !== '') {
        updateName(valueInput);
      } else if (!isEditing && valueInput.trim() !== '') {
        insertName(valueInput);
      } else {
        alert('Digite um valor válido');
      }
      isEditing = false;
      clearInput();
      render();
    }
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

// renderizando o vetor
function render() {
  function createDeleteButton(index) {
    function deleteButton() {
      globalNames.splice(index, 1);
      render();
    }

    let trashIcon = document.createElement('i');
    trashIcon.classList.add('fas');
    trashIcon.classList.add('fa-trash-alt');
    trashIcon.classList.add('clickable');
    trashIcon.addEventListener('click', deleteButton);

    return trashIcon;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  //criando a ul
  const ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];

    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
}

function clearInput() {
  inputName = document.querySelector('#inputName');
  inputName.value = '';
}

start();
