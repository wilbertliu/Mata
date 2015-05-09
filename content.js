var hidden_icon_name_html = "<input type='hidden' value='mata-inactive.png' id='mata-icon-name' />";

$("body").append(hidden_icon_name_html);

function activate_mata() {
  $("body, body *").addClass("mata-friendly");
}

function deactivate_mata() {
  $("body, body *").removeClass("mata-friendly");
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Extension is clicked
  if (request.message == "clicked_browser_action") {
    // Change the extension's icon name on hidden field
    if ($("#mata-icon-name").val() == "mata-inactive.png") {
      $("#mata-icon-name").val("mata-active.png");

      // Activate the mata
      activate_mata();
    } else {
      $("#mata-icon-name").val("mata-inactive.png");

      // Deactivate the mata
      deactivate_mata();
    }

    chrome.runtime.sendMessage({ "message": "clicked_browser_action", "current_icon_path": $("#mata-icon-name").val() });
  }
});

$("body").bind("DOMSubtreeModified", function() {
  if ($("#mata-icon-name").val() == "mata-inactive.png") {
    deactivate_mata();
  } else {
    activate_mata();
  }
});
