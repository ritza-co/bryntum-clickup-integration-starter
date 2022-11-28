import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',
}));
app.use(express.json());

const listId = '<your-list-id>';
const apiToken = '<your-api-token>';

app.get('/getTasks', function (req, res) {
  const query = new URLSearchParams({
    archived: 'false',
    page: '0',
    order_by: 'created',
    reverse: 'true',
    include_closed: 'true',
  }).toString();

  fetch(
    `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiToken,
      },
    },
  )
    .then((res) => res.json())
    .then((json) => res.send(json));
});

app.post('/addTask', function (req, res) {
  const query = new URLSearchParams({
    custom_task_ids: 'false',
  }).toString();

  fetch(
    `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiToken,
      },
      body: JSON.stringify({
        name: req.body.name,
        status: req.body.status,
      }),
    },
  )
    .then((res) => res.json())
    .then((json) => res.send(json))
    .catch((err) => console.log(err));
});

app.put('/update', function (req, res) {
  const query = new URLSearchParams({
    custom_task_ids: 'false',
  }).toString();

  const taskId = req.body.id;
  fetch(
    `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiToken,
      },
      body: JSON.stringify({
        name: req.body.name,
        status: req.body.status,
      }),
    },
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

app.delete('/deleteTask', function (req, res) {
  const query = new URLSearchParams({
    custom_task_ids: 'false',
  }).toString();

  const taskId = req.body.id;
  fetch(
    `https://api.clickup.com/api/v2/task/${taskId}?${query}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiToken,
      },
    },
  )
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.log(err));
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});
