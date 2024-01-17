document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');
    form.addEventListener('submit', handleFormSubmit);

    fetchDataFromAPI().then(createTodoItems);
});

function handleFormSubmit(e) {
    e.preventDefault();
    const todoContent = document.getElementById('todo').value;
    postTodoItem({ content: todoContent });
}

function postTodoItem(data) {
    fetch('https://x8ki-letl-twmt.n7.xano.io/api:c4hj0-Li/to_do', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(console.log)
    .catch(console.error);
}

function fetchDataFromAPI() {
    return fetch("https://x8ki-letl-twmt.n7.xano.io/api:c4hj0-Li/to_do")
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching data:", error);
            return [];
        });
}

function createTodoItems(todoItems) {
    const todoList = document.getElementById("todo-lane");
    todoItems.forEach(item => todoList.appendChild(createTodoItem(item)));

    setupDragAndDrop();
}

function createTodoItem(itemData) {
    const todoItemDiv = document.createElement('div');
    todoItemDiv.className = 'todo_item task';
    todoItemDiv.setAttribute("draggable", true);

    const listItem = createListItem(itemData.content);
    const svgContainer = createSvgContainer();

    todoItemDiv.appendChild(listItem);
    todoItemDiv.appendChild(createLabel());
    todoItemDiv.appendChild(svgContainer);

    return todoItemDiv;
}

function createListItem(text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    listItem.classList.add("strike");
    return listItem;
}

function createSvgContainer() {
    const svgContainer = document.createElement('div');
    svgContainer.className = 'svgContainer';

    const svgCheck = createSVGCheck();
    const svgUncheck = createSVGUncheck();

    svgContainer.appendChild(svgCheck);
    svgContainer.appendChild(svgUncheck);

    svgContainer.addEventListener('click', () => toggleSVGDisplay(svgCheck, svgUncheck));
    
    svgCheck.style.display = 'none';
    svgUncheck.style.display = 'block';

    return svgContainer;
}

function createSVGCheck() {
     // Create the first SVG (checked)
     let svgCheck = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
     svgCheck.setAttribute('class', 'svgCheck');
     svgCheck.setAttribute('height', '32');
     svgCheck.setAttribute('width', '32');
     svgCheck.setAttribute('viewBox', '0 0 512 512');

     let pathCheck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
     pathCheck.setAttribute('opacity', '1');
     pathCheck.setAttribute('fill', 'black');
     pathCheck.setAttribute('stroke', 'black');
     pathCheck.setAttribute('stroke-width', '4');
     pathCheck.setAttribute('d', 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z');

     svgCheck.appendChild(pathCheck);
     return svgCheck
}

function createSVGUncheck() {
    let svgUncheck = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgUncheck.setAttribute('class', 'svgUncheck');
    svgUncheck.setAttribute('height', '32');
    svgUncheck.setAttribute('width', '32');
    svgUncheck.setAttribute('viewBox', '0 0 512 512');

    let pathUncheck = document.createElementNS('http://www.w3.org/2000/svg', 'path');

    pathUncheck.setAttribute('fill', 'none');
    pathUncheck.setAttribute('stroke', '#333');
    pathUncheck.setAttribute('stroke-width', '50');
    pathUncheck.setAttribute('d', 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416');

    svgUncheck.appendChild(pathUncheck);
    return svgUncheck
}

function toggleSVGDisplay(svgCheck, svgUncheck) {
    svgCheck.style.display = svgCheck.style.display === 'none' ? 'block' : 'none';
    svgUncheck.style.display = svgUncheck.style.display === 'none' ? 'block' : 'none';
}

function setupDragAndDrop() {
    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".swim-lane");

    draggables.forEach(task => {
        task.addEventListener("dragstart", () => task.classList.add("is-dragging"));
        task.addEventListener("dragend", () => task.classList.remove("is-dragging"));
    });

    droppables.forEach(zone => {
        zone.addEventListener("dragover", e => {
            e.preventDefault();
            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");
            if (!bottomTask) {
                zone.appendChild(curTask);
            } else {
                zone.insertBefore(curTask, bottomTask);
            }
        });
    });
}

function createLabel(){
    let label = document.createElement("div")
        label.classList.add("label")
        return label;
}
function insertAboveTask(zone, mouseY) {
    const tasks = zone.querySelectorAll(".task:not(.is-dragging)");
    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY;

    tasks.forEach(task => {
        const box = task.getBoundingClientRect();
        const offset = mouseY - box.top;
        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });

    return closestTask;
}

