// Handles interaction in extension window

const toggleEditModeButton = document.getElementById('toggle-edit-mode-btn')

const sendToggleEditModeMessage = () => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs.length === 0) return
    chrome.tabs.sendMessage(tabs[0].id, {toggle: "editMode"})
  });
}

toggleEditModeButton.addEventListener('click', sendToggleEditModeMessage)