const readline = require('readline');
const { addTask, listTasks, removeTask, completeTask } = require('./taskManager');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log(`
== GERENCIADOR DE TAREFAS ==
1. Adicionar tarefa-
2. Listar tarefas
3. Remover tarefa
4. Marcar tarefa como concluída
5. Filtrar tarefas por palavra-chave
6. Sair
  `);
  rl.question('Escolha uma opção: ', handleMenu);
}

function handleMenu(option) {
  switch (option.trim()) {
    case '1':
      rl.question('Descrição da tarefa: ', desc => {
        addTask(desc);
        showMenu();
      });
      break;
    case '2':
      listTasks();
      showMenu();
      break;
    case '3':
      rl.question('ID da tarefa a remover: ', id => {
        removeTask(id);
        showMenu();
      });
      break;
    case '4':
      rl.question('ID da tarefa a marcar como concluída: ', id => {
        completeTask(id);
        showMenu();
      });
      break;
    case '5':
      rl.question('Palavra-chave: ', keyword => {
        listTasks(keyword);
        showMenu();
      });
      break;
    case '6':
      rl.close();
      break;
    default:
      console.log('Opção inválida.');
      showMenu();
      break;
  }
}

showMenu();
