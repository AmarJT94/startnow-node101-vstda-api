const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(morgan("dev"));
var mockData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];

// add your code here
app.get('/', (req, res) => {
// write your code to respond "ok" here
    var theData = {};
    theData.status = "ok";
    res.json(theData);
});

app.get('/api/TodoItems', (req, res) => {
    res.json(mockData);
});

app.get('/api/TodoItems/:number', (req, res) => {
    var todoNumber =  req.params.number;
    for (var i = 0; i < mockData.length; i++) {
        if (parseInt(todoNumber) === mockData[i].todoItemId) {
            res.json(mockData[i]);
        };    
    };
});

app.post('/api/TodoItems/', (req, res) => {
    var todoNumber =  req.body.todoItemId;
    for (var i = 0; i < mockData.length; i++) {
        if (parseInt(todoNumber) === mockData[i].todoItemId) {
            mockData[i] = req.body;
        } else {
            mockData.push(req.body);
        }   
    };
    res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    var todoNumber =  req.params.number;
    console.log(req.body);
    for (var i = 0; i < mockData.length; i++) {
        if (parseInt(todoNumber) === mockData[i].todoItemId) {
            var temp = mockData[i];
            mockData.splice(i, 1);
        };    
    };
    res.json(temp);
});


module.exports = app;
