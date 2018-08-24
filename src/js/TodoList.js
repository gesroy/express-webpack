import { get } from './utils'

const form = get('form')

export default class TodoList {
  constructor() {
    this.savedTodosContainer = get('[data-js=saved-todos]')
    this.getTodos()
    form.addEventListener('submit', event => this.onSubmit(event))
  }

  deleteTodoFromPage(index) {
    data = [...data.slice(0, index), ...data.slice(index + 1)]
  }

  onSubmit(event, data) {
    const input = get('input')
    event.preventDefault()
    this.sendTodo(input.value, data => this.renderTodos(data))
  }

  sendTodo(data, callback) {
    this.savedTodosContainer.innerHTML = ''
    fetch('/todolist', {
      method: 'POST',
      body: JSON.stringify({ todo: data }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(result => result.json())
      .then(data => {
        callback(data)
      })
  }

  getTodos() {
    fetch('/todolist/getalltodos')
      .then(result => result.json())
      .then(data => {
        this.renderTodos(data)
      })
  }

  renderTodos(data) {
    data.forEach(todo => {
      this.todoEl = document.createElement('div')
      this.todoEl.className = 'todo'
      this.todoHtml = `
      <input type="checkbox">
      <span>${todo.todo}</span>
      <button data-js="delete-button">&times;</button>
       `
      this.todoEl.innerHTML = this.todoHtml
      this.savedTodosContainer.insertAdjacentElement('beforeend', this.todoEl)
    })
  }
}
