"use strict"

const dropdownUsers = document.querySelector("#dropdownUsers");
const displayTodos = document.querySelector("#displayTodos");

window.onload = () => {
    fetchDataToDropdown();
    displayTodos.innerHTML = "";
    dropdownUsers.onchange = displayUserToDos;
}

async function fetchDataToDropdown() {
    try{
        const response = await fetch("http://localhost:8083/api/users");
        const data = await response.json();
        dropdownUsers.appendChild(new Option("Select a user"));
        data.forEach(user => {
            dropdownUsers.appendChild(new Option(user.username, user.id));
        })
    }
    catch(error){
        displayTodos.innerHTML = `Error: ${error}`;
    }
}

async function displayUserToDos() {
    displayTodos.innerHTML = "";
    try{
        const response = await fetch("http://localhost:8083/api/todos");
        const data = await response.json();

        data.forEach(todo => {
            if(dropdownUsers.value == todo.userid){
                displayTodos.innerHTML += `
                <div class="card w-50">
                    <div class="card-body">
                        <h5 class="card-title">${todo.category}</h5>
                        <p class="card-text">${todo.description}</p>
                        <p class="card-text">Priority: ${todo.priority}</p>
                    </div>
                </div>
                `;
            }
        })
    }
    catch(error){
        displayTodos.innerHTML = `Error: ${error}`;
    }
}

