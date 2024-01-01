document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener to the form submit event
    const form = document.querySelector('form');
    form.addEventListener('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission behavior


        // Get the textarea value
        const textareaValue = document.getElementById('snippet').value;
        const TitleareaValue = document.getElementById('title').value;

        // Create a JSON object to send as the request body
        const data = {
            Title: TitleareaValue ,
            Snippet: textareaValue
        };
        // Make an API POST request
        fetch(`https://x8ki-letl-twmt.n7.xano.io/api:c4hj0-Li/snippet`, {
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
    return fetch("https://x8ki-letl-twmt.n7.xano.io/api:c4hj0-Li/snippet")
        .then(response => response.json())
        .catch(error => {
            console.error("Error fetching data:", error);
            return []; // Return an empty array in case of an error
        });
}

function updateDOMWithData(data) {
    const container = document.getElementById("snippet-container");
    container.innerHTML = ""; // Clear previous content
    data.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("custom-class"); // Add a class to the div

        const titleItem = document.createElement("h2");
        titleItem.classList.add("snippet-title")
        titleItem.textContent = item.Title

        //prism stuff
        const preItem = document.createElement("pre");
        preItem.classList.add("language-javascript")

        const codeItem = document.createElement("code");
        codeItem.textContent = item.Snippet; // Set the content of the code element
        codeItem.classList.add("custom-class-hidden")
        preItem.appendChild(codeItem);

        // Create a button for copying
        const copyButton = document.createElement("button");
        copyButton.classList.add("copy-button")
        copyButton.innerHTML = `<i class="fa-regular fa-copy"></i>`;

        // Add click event listener to the button
        copyButton.addEventListener("click", function () {
            copyTextToClipboard(codeItem.textContent);
        });

        // Create a button for toggling
        const toggleButton = document.createElement("button");
        toggleButton.classList.add("toggle-button")
        toggleButton.innerHTML = `<i class="fa-regular fa-eye"></i>`
        // Add click event listener to the button
        toggleButton.addEventListener("click", function () {
            toggleCurrent(codeItem);
        });

        divItem.appendChild(titleItem);
        divItem.appendChild(preItem);
        divItem.appendChild(toggleButton);
        divItem.appendChild(copyButton);
        container.appendChild(divItem);
    });

    // Apply Prism.js syntax highlighting
    Prism.highlightAll();
}
function updateExplorerWithData(data){
    const filesContainer = document.getElementById("files-container");
    filesContainer.innerHTML = ""; // Clear previous content
    data.forEach(item => {
        const divItem = document.createElement("div");
        divItem.classList.add("file"); // Add a class to the div

        //prism stuff
        const fileTitle = document.createElement("p");
        fileTitle.classList.add("file-title")
        fileTitle.innerText = item.Title;

        divItem.appendChild(fileTitle);
        filesContainer.appendChild(divItem);
    })
    
}
document.getElementById("get").addEventListener("click", function () {
    fetchDataFromAPI().then(data => {
        updateDOMWithData(data);
        updateExplorerWithData(data);
    });
});

// Function to copy text to clipboard
function copyTextToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function () {
            console.log("Text copied to clipboard");
        }).catch(function (err) {
            console.error("Error copying text to clipboard:", err);
        });
    } else {
        console.error("Clipboard API is not supported in this browser");
    }
}

function toggleCurrent(divItem) {
    divItem.classList.toggle('custom-class-hidden');
}
