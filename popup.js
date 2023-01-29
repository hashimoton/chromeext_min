// popup.js

alert('popup.js');

function log(message){
  document.getElementById('message').innerText = JSON.stringify(message);
}


function load_options() {
  chrome.storage.sync.get(null,
    function(options) {
      document.getElementById('options').innerText = JSON.stringify(options);
      log('Loaded options');
    }
  );
};
load_options();


function callback(response) {
  log(response);
}


const action_buttons = document.querySelectorAll('button.action');
for(let i = 0; i < action_buttons.length; i++) {
  let action_button = action_buttons[i];
  //alert(action_button.textContent);

  action_button.addEventListener('click', async function() {
    const request = {
      action: action_button.textContent,
      options: document.getElementById('options').innerText
    };
    
    chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request, callback);
    });
  });
}



// EOF
