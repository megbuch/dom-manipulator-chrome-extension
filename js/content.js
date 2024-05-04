// Handles interaction with the web page

let selectedElement
let editMode = false

const selectElement = event => {
  event.preventDefault()
  if (!editMode) return
  
  selectedElement = event.target
  console.log(selectedElement)
}

const toggleEditMode = request => {
  if (request.toggle === "editMode") editMode = !editMode
  console.log('edit mode toggled')
}

document.addEventListener('click', selectElement)
chrome.runtime.onMessage.addListener(toggleEditMode)
