# Google Plugin: Speech-to-Text for ChatGPT Web Interface

使用Google插件为ChatGPT的网页文本输入框增加语音输入功能。

## 使用方法:

### 1. 配置API Key
在 `api_key.txt` 文件中输入你的ChatGPT API key。

### 2. 安装Chrome插件
- 打开Google Chrome浏览器。
- 选择“加载未打包的扩展程序”，并选择 `unitVoice2Text` 文件夹来安装此插件。
- 确保插件已启用。

### 3. 启动本地服务器
在命令行或终端中运行以下命令：
'''
python my_flask_app.py
'''

### 4. 使用语音输入
- 打开ChatGPT的网页界面。
- 点击文本输入框右侧的 `说` 按钮来开始语音输入。
- 说完后，点击 `停` 按钮来结束语音输入。
- 请稍等约10秒（根据网络延迟情况而定），文本输入框内将显示语音转换后的内容。

## 效果:
![image](https://github.com/xiayang-cmd/google-Plugin-Speech-to-Text-chatgpt-web/assets/62921464/c7786d4b-64df-4d8f-8b4c-5cab7c81f38f)
![image](https://github.com/xiayang-cmd/google-Plugin-Speech-to-Text-chatgpt-web/assets/62921464/06532957-2189-4ccc-851f-6384cf2e72c0)

![image](https://github.com/xiayang-cmd/google-Plugin-Speech-to-Text-chatgpt-web/assets/62921464/674450d0-2316-4194-9e7d-118a583cde13)

