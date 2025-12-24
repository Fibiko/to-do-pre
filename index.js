let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
    const savedTasks = localStorage.getItem('todoItems');
    if (savedTasks) {
        return JSON.parse(savedTasks);
    } else {
        return items;
    }
}
function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  textElement.textContent = item;
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  deleteButton.addEventListener('click', function() {
        clone.remove();
        const items = getTasksFromDOM();
        saveTasks(items);
    });

	duplicateButton.addEventListener('click', function() {
        const itemName = textElement.textContent;
        const newItem = createItem(itemName);
        listElement.prepend(newItem);
        const items = getTasksFromDOM();
        saveTasks(items);
    });

	editButton.addEventListener('click', function() {
        textElement.setAttribute('contenteditable', 'true');
        textElement.focus();
    });
    
    textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false');
        const items = getTasksFromDOM();
        saveTasks(items);
    });

  return clone;
}

function getTasksFromDOM() {
	const itemsNamesElements = document.querySelectorAll(".to-do__item-text")
	const tasks = [];
	itemsNamesElements.forEach(element => {
        const taskText = element.textContent;
        tasks.push(taskText);
    });

	return tasks;
    
}

function saveTasks(tasks) {
    const tasksString = JSON.stringify(tasks);
    localStorage.setItem('todoItems', tasksString);
    items = tasks;
}

items = loadTasks();
items.forEach(item => {
    const itemElement = createItem(item);
	listElement.append(itemElement);
});

formElement.addEventListener('submit', submitToDo)

function submitToDo(event) {
	event.preventDefault();
	const taskText = inputElement.value

	if (!taskText) {return}

	console.log(taskText + " added to element list")
	const newElement = createItem(taskText);
	listElement.append(newElement);
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = "";
}