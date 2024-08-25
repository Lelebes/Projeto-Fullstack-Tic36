"use strict";
// Seleção dos elementos principais
const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("tasks");
const completedTaskList = document.getElementById("completed-tasks");
// Array para armazenar as tarefas
let tasks = [];
// Função para renderizar tarefas na tela
function renderTasks() {
    taskList.innerHTML = "";
    completedTaskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) {
            // Se a tarefa estiver concluída, adiciona na lista de tarefas concluídas
            const deleteButton = createDeleteButton(task.id);
            li.appendChild(deleteButton);
            completedTaskList.appendChild(li);
        }
        else {
            // Caso contrário, adiciona à lista de tarefas pendentes
            const completeButton = createCompleteButton(task.id);
            const deleteButton = createDeleteButton(task.id);
            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }
    });
}
// Função para criar o botão de completar tarefa
function createCompleteButton(taskId) {
    const completeButton = document.createElement("button");
    completeButton.textContent = "Concluir";
    completeButton.classList.add("complete-btn");
    completeButton.addEventListener("click", () => completeTask(taskId));
    return completeButton;
}
// Função para criar o botão de excluir tarefa
function createDeleteButton(taskId) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteTask(taskId));
    return deleteButton;
}
// Função para adicionar nova tarefa
function addTask(taskText) {
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
}
// Função para marcar tarefa como concluída
function completeTask(taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        task.completed = true;
        saveTasks();
        renderTasks();
    }
}
// Função para excluir tarefa
function deleteTask(taskId) {
    tasks = tasks.filter((t) => t.id !== taskId);
    saveTasks();
    renderTasks();
}
// Função para salvar tarefas no Local Storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Função para carregar tarefas do Local Storage
function loadTasks() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}
// Carregar as tarefas ao inicializar
loadTasks();
// Event listener para o formulário de tarefas
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (taskInput.value.trim() !== "") {
        addTask(taskInput.value);
        taskInput.value = "";
    }
});
