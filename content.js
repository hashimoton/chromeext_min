console.log('content.js');

const actions = {};

actions.show = function(data) {
  console.log('show');
  console.log({data});
  return `Processed ${data.action}`;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, callback) {
    console.log('content.js on message');
    const response = actions.show(request);
    callback(response);

    return true;
  }
);


