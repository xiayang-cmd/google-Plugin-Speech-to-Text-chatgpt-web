// 定义一个函数，更新按钮位置
function updateButtonPosition(button, originalButton) {
    let rect = originalButton.getBoundingClientRect();
    button.style.top = `${rect.top + window.scrollY}px`; // 添加滚动偏移
    button.style.left = `${rect.left + rect.width + 15 + window.scrollX}px`; // 添加滚动偏移
}

// 定义一个函数，尝试插入按钮
function tryInsertButton() {
    let originalButton = document.querySelector('[data-testid="send-button"]');
    if (originalButton && !document.getElementById('extension-insert-button')) {
        let button = document.createElement('button');
        button.className = "custom-button";
        button.innerText = "说";
        button.id = "extension-insert-button";

        // 设置按钮位置
        button.style.position = 'fixed'; // 使用 fixed 定位可以相对于视窗定位按钮
        button.style.zIndex = '1000'; // 设置一个高的 z-index 以确保按钮在顶部
        updateButtonPosition(button, originalButton);
        // // 使用 originalButton 的位置信息来确定新按钮的位置
        // let rect = originalButton.getBoundingClientRect();
        // button.style.top = rect.top + 'px'; // 设置按钮在视窗中的垂直位置
        // button.style.left = rect.left + rect.width + 'px'; // 设置按钮在视窗中的水平位置

        // button.style.position = 'absolute';
        // button.style.zIndex = '10'; // 确保按钮在其他元素之上
        // button.style.right = 'calc(' + originalButton.style.right + ' + 1px)'; // 调整位置
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

        document.body.appendChild(button);
        // originalButton.parentElement.insertBefore(button, originalButton); % 会超出父组件导致不可见

        // 滚动到新按钮的位置以验证它是否在视窗内
        // button.scrollIntoView();// 不再需要滚动到新按钮的位置，因为它将是固定在视窗中

        // 监听窗口缩放事件
        window.addEventListener('resize', function() {
            let originalButton = document.querySelector('[data-testid="send-button"]');
            updateButtonPosition(button, originalButton);
        });
    }
}


// 首先尝试插入按钮
tryInsertButton();

// 如果按钮没有被插入，使用MutationObserver监听DOM变化
let observer = new MutationObserver(function(mutations) {
    tryInsertButton();
});
