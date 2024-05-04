// Handles interaction with the web page

let selectedElement
let editMode = true

const selectElement = event => {
  event.preventDefault()
  if (!editMode) return
  
  selectedElement = event.target
  selectedElement.style.background = 'yellow'
}

const toggleEditMode = request => {
  if (request.toggle === "editMode") editMode = !editMode
  console.log('edit mode: ' + editMode)
}


window.addEventListener('click', selectElement)
chrome.runtime.onMessage.addListener(toggleEditMode)