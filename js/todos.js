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
        data.forEach(user => {
            dropdownUsers.appendChild(new Option(user.username, user.id));
        })
    }
    catch(error){
        displayTodos.innerHTML = `Error: ${error}`;
    }
}

async function displayUserToDos() {
    try{
        const response = await fetch("http://localhost:8083/api/todos");
        const data = await response.json();

        data.forEach(todo => {
            if(dropdownUsers.value == todo.userid){
                displayTodos.innerHTML += `${todo.description}<br>`;
            }
        })
    }
    catch(error){
        displayTodos.innerHTML = `Error: ${error}`;
    }
}

