import { createTaskBoard } from './index.js';

const serverAddress = 'http://localhost:3000';
const clientAddress = 'http://localhost:8080';

async function getTasksFromClickUp() {
  fetch(`${serverAddress}/getTasks/`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': clientAddress,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => createTaskBoard(data));
}

async function sendRequest(event, address, requestMethod) {
  const requestBody = {
    id: event.records[0].data.clickUpId,
    status: event.records[0].data.status,
    name: event.records[0].data.name,
  };
  await fetch(`${serverAddress}/${address}/`, {
    method: requestMethod,
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': clientAddress,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((res) => res.json())
    .then((results) => event.records[0].data.clickUpId = results.id)
    .then((data) => console.log(data));
}

async function updateClickUp(event) {
  if (event.action === 'update' && ('name' in event.changes || 'status' in event.changes)) {
    sendRequest(event, 'updateTask', 'PUT');
  } else if (event.action === 'add' && event.records.length === 1) {
    sendRequest(event, 'addTask', 'POST');
  } else if (event.action === 'remove' && event.records.length === 1) {
    sendRequest(event, 'deleteTask', 'DELETE');
  }
}

export { getTasksFromClickUp, updateClickUp };
