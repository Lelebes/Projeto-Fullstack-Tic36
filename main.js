document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const tasksList = document.getElementById("tasks");
  const completedTasksList = document.getElementById("completed-tasks");

  // Função para adicionar uma nova tarefa
  const addTask = (taskText) => {
    const li = document.createElement("li");
    li.textContent = taskText;

    // Criar botão para concluir a tarefa
    const completeButton = document.createElement("button");
    completeButton.textContent = "Concluir";
    completeButton.classList.add("complete-btn");
    completeButton.addEventListener("click", () => completeTask(li));

    // Criar botão para excluir a tarefa
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteTask(li));

    li.appendChild(completeButton);
    li.appendChild(deleteButton);
    tasksList.appendChild(li);

    saveTasks(); // Salva as tarefas no localStorage
  };

  // Função para marcar uma tarefa como concluída
  const completeTask = (taskElement) => {
    const li = taskElement.cloneNode(true); // Clona o item para mover
    li.querySelector(".complete-btn").remove(); // Remove o botão de concluir
    li.querySelector(".delete-btn").textContent = "Excluir"; // Muda o texto do botão para 'Excluir'
    li.querySelector(".delete-btn").classList.remove("complete-btn"); // Remove a classe de concluir

    // Adiciona o item à lista de concluídos
    completedTasksList.appendChild(li);
    taskElement.remove(); // Remove o item da lista de tarefas pendentes

    saveTasks(); // Salva as tarefas no localStorage
  };

  // Função para excluir uma tarefa
  const deleteTask = (taskElement) => {
    taskElement.remove(); // Remove o item da lista
    saveTasks(); // Salva as tarefas no localStorage
  };

  // Função para salvar as tarefas no localStorage
  const saveTasks = () => {
    const tasks = [];
    tasksList.querySelectorAll("li").forEach((task) => {
      tasks.push(task.textContent.replace("ConcluirExcluir", "").trim()); // Remove texto dos botões e salva o texto da tarefa
    });
    const completedTasks = [];
    completedTasksList.querySelectorAll("li").forEach((task) => {
      completedTasks.push(task.textContent.replace("Excluir", "").trim()); // Remove texto do botão e salva o texto da tarefa
    });
    localStorage.setItem("tasks", JSON.stringify({ tasks, completedTasks }));
  };

  // Função para carregar as tarefas do localStorage
  const loadTasks = () => {
    const savedData = JSON.parse(localStorage.getItem("tasks"));
    if (savedData) {
      savedData.tasks.forEach((task) => addTask(task));
      savedData.completedTasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => deleteTask(li));
        li.appendChild(deleteButton);
        completedTasksList.appendChild(li);
      });
    }
  };

  // Manipular o envio do formulário
  taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (taskInput.value.trim()) {
      // Verifica se o input não está vazio
      addTask(taskInput.value.trim());
      taskInput.value = ""; // Limpa o campo de entrada
    }
  });

  // Carregar tarefas ao iniciar
  loadTasks();
});
// Array para armazenar as tarefas
let tasks = [];

// Função para salvar as tarefas no localStorage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
}

// Chamar a função para carregar as tarefas ao iniciar a aplicação
loadTasks();
