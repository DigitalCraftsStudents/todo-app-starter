// FUNCTIONS
function deleteItem(id) {
  let delIndex = -1
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i]?.id === id) {
      delIndex = i
    }
  }

  if (delIndex !== -1) {
    delete todoItems[delIndex]
    render()
  }
}

function setCompleteStatus(id, status) {
  let toggleIndex = -1
  for (let i = 0; i < todoItems.length; i++) {
    if (todoItems[i]?.id === id) {
      toggleIndex = i
    }
  }

  if (toggleIndex !== -1) {
    todoItems[toggleIndex].completed = status
    render()
  }
}

function render() {
  const incompleteItems = document.querySelector('#incomplete-items')
  const completeItems = document.querySelector('#complete-items')
  
  // clear all existing html from the page
  incompleteItems.innerHTML = ''
  completeItems.innerHTML = ''

  // loop over each todo item in the data
  for (let i in todoItems) {
    const item = todoItems[i]
    // create a list item element and set appropriate bootstrap classes
    const listItem = document.createElement('li')
    listItem.classList.add('list-group-item', 'd-flex')
    // create a checkbox and add it to the list item
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.classList.add('form-check-input')
    checkbox.addEventListener('change', (e) => {
      // get the state of the checkbox from the event
      const isChecked = e.target.checked
      // change the data
      setCompleteStatus(item.id, isChecked)
    })
    listItem.appendChild(checkbox)
    // create a label for the checkbox, add classes, set text and add to list item
    const label = document.createElement('label')
    label.innerText = item.title
    label.classList.add('form-check-label', 'ps-3')
    listItem.appendChild(label)

    // add a delete button
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('btn', 'btn-sm', 'btn-danger', 'ms-auto')
    deleteButton.innerText = 'X'
    deleteButton.addEventListener('click', () => {
      // delete item from data using the id of the item that was clicked
      deleteItem(item.id)
    })
    listItem.appendChild(deleteButton)
  
    // if the todo item has been marked as completed in the data
    if (item.completed) {
      // then add it to the complete section and check the checkbox input
      completeItems.appendChild(listItem)
      checkbox.checked = true
    } else {
      // otherwise, add it to the incomplete section
      incompleteItems.appendChild(listItem)
    }
  }
}

// APPLICATION START
const form = document.querySelector('#todoForm')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = document.querySelector('#todo-text')

  let nextId = todoItems[0].id
  for (let item of todoItems) {
    if (item?.id >= nextId) {
      nextId = item.id + 1
    }
  }

  const newTodo = {
    id: nextId,
    title: text.value,
    completed: false,
  }
  todoItems.push(newTodo)
  render()
})
render()
