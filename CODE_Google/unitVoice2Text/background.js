// background.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "runExe") {
        // 在这里处理自定义协议的启动
        // 例如，打开新标签或窗口
        chrome.tabs.create({ url: 'myvoice2textapp://' });
    }
});
