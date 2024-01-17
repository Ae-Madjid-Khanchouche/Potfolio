document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the form submit event
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior


        // Get the textarea value
        const textareaValue = document.getElementById('todo').value;

        // Create a JSON object to send as the request body
        const data = {
            content: textareaValue
        };
        // Make an API POST request
        fetch(`https://x8ki-letl-twmt.n7.xano.io/api:c4hj0-Li/to_do`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })


            .then(response => response.json())
            .then(result => {
                // Handle the API response here
                console.log(result);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

function fetchDataFromAPI() {
    return fetch("https://x8ki-letl-twmt.n7.xano.io/api:c4hj0-Li/to_do")
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching data:", error);
            return []; // Return an empty array in case of an error
        });
}

function createTodoItem(data) {

    var toDoList = document.getElementById("todo-lane")
    data.forEach(item => {
        // Create the main container div
        var todoItemDiv = document.createElement('div');
        todoItemDiv.className = 'todo_item';
        todoItemDiv.classList.add("task");
        todoItemDiv.setAttribute("draggable", true)

        // Create the list item
        var listItem = document.createElement('li');
        listItem.textContent = item.content;
        listItem.classList.add("strike")
        todoItemDiv.appendChild(listItem);

        //Create the label
        var label = document.createElement("div")
        label.classList.add("label")

        // Create the SVG container div
        var svgContainer = document.createElement('div');
        svgContainer.className = 'svgContainer';

        // Create the first SVG (checked)
        var svgCheck = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgCheck.setAttribute('class', 'svgCheck');
        svgCheck.setAttribute('height', '32');
        svgCheck.setAttribute('width', '32');
        svgCheck.setAttribute('viewBox', '0 0 512 512');

        var pathCheck = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathCheck.setAttribute('opacity', '1');
        pathCheck.setAttribute('fill', 'black');
        pathCheck.setAttribute('stroke', 'black');
        pathCheck.setAttribute('stroke-width', '4');
        pathCheck.setAttribute('d', 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z');

        svgCheck.appendChild(pathCheck);
        svgContainer.appendChild(svgCheck);

        // Create the second SVG (unchecked)
        var svgUncheck = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgUncheck.setAttribute('class', 'svgUncheck');
        svgUncheck.setAttribute('height', '32');
        svgUncheck.setAttribute('width', '32');
        svgUncheck.setAttribute('viewBox', '0 0 512 512');

        var pathUncheck = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        pathUncheck.setAttribute('fill', 'none');
        pathUncheck.setAttribute('stroke', '#333');
        pathUncheck.setAttribute('stroke-width', '50');
        pathUncheck.setAttribute('d', 'M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416');

        svgUncheck.appendChild(pathUncheck);
        svgContainer.appendChild(svgUncheck);

        svgContainer.addEventListener('click', function () {
            // Toggle visibility of svgCheck
            svgCheck.style.display = svgCheck.style.display === 'none' ? 'block' : 'none';
            
            // Toggle visibility of svgUncheck
            svgUncheck.style.display = svgUncheck.style.display === 'none' ? 'block' : 'none';

            listItem.classList.toggle("strike")
        });
        svgCheck.style.display = 'none'; // Initially display the checked SVG
        svgUncheck.style.display = 'block'; // Initially hide the unchecked

        
        todoItemDiv.appendChild(label);
        todoItemDiv.appendChild(svgContainer);
        toDoList.appendChild(todoItemDiv); 
    })

    //dragging option
    var draggables = document.querySelectorAll(".task");
    var droppables = document.querySelectorAll(".swim-lane");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
            task.classList.remove("is-dragging");
        });
    });

    droppables.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
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
    const insertAboveTask = (zone, mouseY) => {
        const els = zone.querySelectorAll(".task:not(.is-dragging)");
    
        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;
    
        els.forEach((task) => {
            const {
                top
            } = task.getBoundingClientRect();
    
            const offset = mouseY - top;
    
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closestTask = task;
            }
        });
    
        return closestTask;
    };
}

// Call the function to create and append the structure
fetchDataFromAPI().then(data => {
    createTodoItem(data);
});
document.getElementsByClassName("w-dyn-items")[0].addEventListener({
})