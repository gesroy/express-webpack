var express = require('express')
var router = express.Router()
var fs = require('fs')
var path = require('path')
var todos = require('../data/todos.json')
var uid = require('uid')

router.get('/', function(req, res, next) {
  res.render('todolist')
})

router.get('/getalltodos', (req, res) => {
  res.json(todos)
})

router.post('/', function(req, res, next) {
  todos = [...todos, { ...req.body, id: uid() }]
  console.log(req.body)
  saveToFile('../data/todos.json', todos, err => {
    err && res.send('Could not write file')
    res.send(JSON.stringify(todos))
  })
})

function saveToFile(fileName, data, callback) {
  fs.writeFile(path.join(__dirname, fileName), JSON.stringify(data), callback)
}

module.exports = router
