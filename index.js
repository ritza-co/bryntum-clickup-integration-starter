import { TaskBoard, TaskStore } from '@bryntum/taskboard/taskboard.module.js';
import { getTasksFromClickUp, updateClickUp } from './request.js';

getTasksFromClickUp();

function getTaskData(tasks) {
  const taskList = [];
  tasks = tasks.tasks;

  for (let i = 0; i < tasks.length; i++) {
    const newTask = {
      clickUpId: tasks[i].id,
      name: tasks[i].name,
      status: tasks[i].status.status,
    };
    taskList.push(newTask);
  }
  return taskList;
}

function createTaskBoard(tasks) {
  const taskStore = new TaskStore({

    listeners: {
      change: function (event) {
        updateClickUp(event);
      },
    },

    data: getTaskData(tasks),

  });

  const taskBoard = new TaskBoard({

    appendTo: document.body,

    columnField: 'status',

    columns: [
      'to do',
      'in progress',
      'complete',
    ],

    project: {
      taskStore,
    },

  });
}

export { createTaskBoard };
