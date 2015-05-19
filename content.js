var body = document.body;
var isActive = false;
var icon = document.createElement('input');
    icon.type = 'hidden';
    icon.value = 'meta-inactive-38.png';
    icon.id = 'mata-icon-name';

body.appendChild(icon);

function activate_mata() {
  body.classList.add('mata-friendly');
  icon.value = 'mata-active-38.png';
  isActive = true;
}

function deactivate_mata() {
  body.classList.remove('mata-friendly');
  icon.value = 'mata-inactive-38.png';
  isActive = false;
}

function toggle_mata() {
  if (isActive) {
    deactivate_mata();
  } else {
    activate_mata();
  }
}

function updateStatus() {
  isActive = icon.value === 'meta-inactive-38.png' ? false : true;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message == "clicked_browser_action") {
    toggle_mata();
    chrome.runtime.sendMessage({ "message": "clicked_browser_action", "current_icon_path": icon.value });
  }
});

body.addEventListener("DOMSubtreeModified", updateStatus);
