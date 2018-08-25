import { get } from './utils'

const form = get('form')

export default class TodoList {
  constructor() {
    this.savedTodosContainer = get('[data-js=saved-todos]')
    this.getTodos()
    form.addEventListener('submit', event => this.onSubmit(event))
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
    data.forEach((todo, id) => {
      this.todoEl = document.createElement('div')
      this.todoEl.className = 'todo'
      this.todoHtml = `
      <input type="checkbox">
      <span>${todo.todo}</span>
      <button data-js="delete-button">&times;</button>
       `
      this.todoEl.innerHTML = this.todoHtml
      this.savedTodosContainer.insertAdjacentElement('beforeend', this.todoEl)
      const buttonDeletesItem = this.todoEl.querySelector('button')
      buttonDeletesItem.addEventListener('click', () => {
        this.deleteTodoFromPage(id, data)
      })
    })
  }

  deleteTodoFromPage(id, data) {
    console.log(data)
    data = [...data.slice(0, id), ...data.slice(id + 1)]
    console.log(data)
  }
}
