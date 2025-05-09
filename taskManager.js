const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'tasks.json');
function loadTasks() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}
function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: Date.now(),
    description,
    createdAt: new Date().toISOString(),
    completed: false
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log('Tarefa adicionada com sucesso!');
}
function listTasks(filter = '') {
  const tasks = loadTasks();
  const filtered = tasks.filter(t => t.description.toLowerCase().includes(filter.toLowerCase()));
  if (filtered.length === 0) {
    console.log('Nenhuma tarefa encontrada.');
    return;
  }
  filtered.forEach(task => {
    console.log(`[${task.completed ? 'X' : ' '}] ${task.id} - ${task.description} (Criada em: ${task.createdAt})`);
  });
}
function removeTask(id) {
  const tasks = loadTasks();
  const newTasks = tasks.filter(task => task.id !== Number(id));
  if (newTasks.length === tasks.length) {
    console.log('Tarefa não encontrada.');
  } else {
    saveTasks(newTasks);
    console.log('Tarefa removida.');
  }
}
function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(task => task.id === Number(id));
  if (task) {
    task.completed = true;
    saveTasks(tasks);
    console.log('Tarefa marcada como concluída.');
  } else {
    console.log('Tarefa não encontrada.');
  }
}
module.exports = {
  addTask,
  listTasks,
  removeTask,
  completeTask
};
