// document.addEventListener('DOMContentLoaded', function() {
//     var runButton = document.getElementById('runButton');
//     runButton.addEventListener('click', function() {
//         window.location.href = 'myvoice2textapp://';
//     }, false);
// }, false);

// 交给background.js处理
document.addEventListener('DOMContentLoaded', function() {
    var runButton = document.getElementById('runButton');
    runButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: "runExe" });
    }, false);
}, false);
