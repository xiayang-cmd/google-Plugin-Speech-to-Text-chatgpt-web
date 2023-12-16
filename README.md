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
![image](https://github.com/xiayang-cmd/google-Plugin-Speech-to-Text-chatgpt-web/assets/62921464/256f2c93-7a80-4486-ab4d-a6a591dc9d09)
![image](https://github.com/xiayang-cmd/google-Plugin-Speech-to-Text-chatgpt-web/assets/62921464/9de3b550-e748-4b35-a722-e3a2128afff9)

### 5. 更新后可以使用网页扩展启动本地服务器
- 不再需要使用"python my_flask_app.py"命令启动本地服务器了
- 运行V2T注册表（注意修改位置）
- 将api_key.txt、config.json、my_flask_app.exe放到和注册表一致的位置下（先进行这步）
- 安装Chrome插件
- 点击插件图标，点击按钮启动语音转写，会自动打开服务器
- 之后的步骤和4一样
![image](https://github.com/xiayang-cmd/google-Plugin-Speech-to-Text-chatgpt-web/assets/62921464/fb0d051e-e84e-4918-892b-1c829a65e9ef)

