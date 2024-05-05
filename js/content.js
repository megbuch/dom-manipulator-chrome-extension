// Handles interaction with the web page

// TODO: Figure out how to transfer styles to external stylesheet!
const modalHTML = `
  <div id="floating-modal">
    <div class="modal-content">
      <p>DOM Manipulator Toolbar:</p>
      <p id="selected-element">...</p>
    </div>
  </div>
  <style>
    #floating-modal {
      margin: 0;
      padding: .5rem;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 900;
      background-color: lightgrey;
      height: 5rem;
      width: 30rem;
      border: 1px solid black;
      display: flex;
      flex-direction: column;
      gap: .5rem;
    }

    #floating-modal .modal-content p {
      color: black;
      font-size: 1rem;
    }
  </style>
`

const modalContainer = document.createElement('div')
modalContainer.innerHTML = modalHTML

document.body.appendChild(modalContainer)

let selectedElement
let editMode = true

const selectElement = event => {
  event.preventDefault()
  if (!editMode) return

  const clickedElement = event.target

  if (clickedElement.closest('#floating-modal') || clickedElement.id === 'floating-modal') {
    return
  }

  selectedElement = clickedElement
  console.log(selectedElement)

  const elementDisplay = document.getElementById('selected-element')
  elementDisplay.innerText = selectedElement.outerHTML.replace(selectedElement.innerHTML, '')
}

const toggleEditMode = request => {
  if (request.toggle === "editMode") {
    editMode = !editMode
    console.log('Edit mode toggled:', editMode)
    
    const modal = document.getElementById('floating-modal')
    if (editMode) {
        modal.style.display = 'block'
    } else {
      modal.style.display = 'none'
    }
  }
}

const startDragModal = element => {
  let pos1 = 0
  let pos2 = 0
  let pos3 = 0
  let pos4 = 0

  const dragMouseDown = event => {
    event.preventDefault()
    pos3 = event.clientX
    pos4 = event.clientY
    document.onmouseup = stopDragModal
    document.onmousemove = dragModal
  }

  const dragModal = event => {
    event.preventDefault()
    pos1 = pos3 - event.clientX
    pos2 = pos4 - event.clientY
    pos3 = event.clientX
    pos4 = event.clientY
    element.style.top = (element.offsetTop - pos2) + "px"
    element.style.left = (element.offsetLeft - pos1) + "px"
  }

  const stopDragModal = () => {
    document.onmouseup = null
    document.onmousemove = null
  }

  if (document.getElementById("modal-content")) {
    document.getElementById("modal-content").onmousedown = dragMouseDown
  } else {
    element.onmousedown = dragMouseDown
  }
}

startDragModal(document.getElementById("floating-modal"))

window.addEventListener('click', selectElement)
chrome.runtime.onMessage.addListener(toggleEditMode)