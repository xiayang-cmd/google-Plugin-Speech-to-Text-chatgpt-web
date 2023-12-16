document.addEventListener('DOMContentLoaded', function() {
    var runButton = document.getElementById('runButton');
    runButton.addEventListener('click', function() {
        window.location.href = 'myvoice2textapp://';
    }, false);
}, false);
