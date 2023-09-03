// // 定义一个函数，尝试插入按钮
// function tryInsertButton() {
//     let originalButton = document.querySelector('[data-testid="send-button"]');
//     if (originalButton && !document.getElementById('extension-insert-button')) {
//         let button = document.createElement('button');
//         button.className = "custom-button";
//         button.innerText = "说";
//         button.id = "extension-insert-button";
//         button.style.position = 'absolute';
//         button.style.right = 'calc(' + originalButton.style.right + ' + 1000px)'; // 调整位置
//         button.onclick = function() {
//             let textarea = document.querySelector('#prompt-textarea');
//             if (textarea) {
//                 textarea.value = '这是我要插入的固定文本';
//             }
//         };
//         originalButton.parentElement.insertBefore(button, originalButton);
//     }
// }
// 定义一个函数，尝试插入按钮
function tryInsertButton() {
    let originalButton = document.querySelector('[data-testid="send-button"]');
    if (originalButton && !document.getElementById('extension-insert-button')) {
        let button = document.createElement('button');
        button.className = "custom-button";
        button.innerText = "说";
        button.id = "extension-insert-button";
        button.style.position = 'absolute';
        button.style.right = 'calc(' + originalButton.style.right + ' + 1000px)'; // 调整位置
        button.onclick = function() {
            if (button.innerText === "说") {
                fetch("http://localhost:5000/start")
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Recording started") {
                        button.innerText = "停";
                    }
                })
                .catch(error => console.error("Error:", error));
            } else {
                fetch("http://localhost:5000/stop")
                .then(response => response.json())
                .then(data => {
                    if (data.message === "Recording stopped") {
                        button.innerText = "说";
                        // 在此处可以将录音文件传送到需要的位置或执行其他操作
                        console.log("Model Response:", data.response);
                        let textarea = document.querySelector('#prompt-textarea');
                        if (textarea) {
                            textarea.value = data.response;
                        }
                    }
                })
                .catch(error => console.error("Error:", error));
            }
        };
        originalButton.parentElement.insertBefore(button, originalButton);
    }
}


// 首先尝试插入按钮
tryInsertButton();

// 如果按钮没有被插入，使用MutationObserver监听DOM变化
let observer = new MutationObserver(function(mutations) {
    tryInsertButton();
});

observer.observe(document.body, { childList: true, subtree: true });
