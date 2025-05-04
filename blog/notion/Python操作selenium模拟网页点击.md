---
slug: Python-Operation-selenium-Simulate-Webpage-Click
title: Python操作selenium模拟网页点击
date: 2023-11-18
authors: wenhao
tags: ['General']
keywords: ['Default']
---
https://blog.csdn.net/weixin_43145427/article/details/125193957 

Selenium是一个用电脑模拟人操作浏览器网页，可以实现自动化，测试等！ 
1. 安装 seleniumm 
```plain text
pip install selenium
```
<!-- truncate -->
2. 下载浏览器驱动 
Chrome浏览器驱动： chromedriver  , CNPM Binaries Mirror (npmmirror.com) ，  taobao备用地址 
需要把浏览器驱动放入系统路径中，或者直接告知selenuim的驱动路径 
另外启动浏览器，可以设置一些参数，比如无界面之类的，详细参考： 
```plain text
​补充添加代理参数：options.add_argument("--proxy-server=http://XXXXX.com:80")
```
可以测试是否正常使用，以下代码： 
```plain text
from selenium import webdriver


driver = webdriver.Firefox()   # Firefox浏览器
# driver = webdriver.Firefox("驱动路径")

driver = webdriver.Chrome()    # Chrome浏览器

driver = webdriver.Ie()        # Internet Explorer浏览器

driver = webdriver.Edge()      # Edge浏览器

driver = webdriver.Opera()     # Opera浏览器

driver = webdriver.PhantomJS()   # PhantomJS

# 打开网页
driver.get(url) # 打开url网页 比如 driver.get("http://www.baidu.com")
```
用 selenium  登录新版的 edge 方法 
```plain text
pip install msedge-selenium-tools
```
接下来，使用以下代码： 
```plain text
from selenium import webdriver
from msedge.selenium_tools import Edge, EdgeOptions
options = EdgeOptions()
options.use_chromium = True
options.binary_location = r"C:\xx\Microsoft\EdgeCore\93.0.926.0\msedge.exe" # 浏览器的位置
driver = Edge(options=options, executable_path=r"D:\xx\Desktop\edgedriver_win64\msedgedriver.exe") # 相应的浏览器的驱动位置
​
driver.get("http://www.baidu.com")
​
```
```plain text
find_element_by_id()
find_element_by_name()
find_element_by_class_name()
find_element_by_tag_name()
find_element_by_link_text()
find_element_by_partial_link_text()
find_element_by_xpath()
find_element_by_css_selector()
```
在 element 变成 elements 就是找所有满足的条件，返回数组。 
一般我都自己采用  xpath  获取元素的，复制即可 
关于获取对象的api查找： 
selenium.webdriver.remote.webelement - Selenium 3.14 documentation​www.selenium.dev/selenium/docs/api/py/webdriver_remote/selenium.webdriver.remote.webelement.html 
- 控制浏览器窗口大小
driver.set_window_size(480, 800) 
- 浏览器后退，前进
# 后退 driver.back() 
# 前进 driver.forward() 
- 刷新
driver.refresh() # 刷新 
### Web element常用方法

- 点击和输入
driver.find_element_by_id("kw").clear() # 清除文本 driver.find_element_by_id("kw").send_keys("selenium") # 模拟按键输入 driver.find_element_by_id("su").click() # 单击元素 
- 提交
search_text = driver.find_element_by_id('kw') search_text.send_keys('selenium') search_text.submit() 
- 其他
size： 返回元素的尺寸。 
text： 获取元素的文本。 
get_attribute(name)： 获得属性值。 
is_displayed()： 设置该元素是否用户可见。 
在 WebDriver 中， 将这些关于鼠标操作的方法封装在 ActionChains 类提供。 
ActionChains 类提供了鼠标操作的常用方法： 
- perform()： 执行所有 ActionChains 中存储的行为；
- context_click()： 右击；
- double_click()： 双击；
- drag_and_drop()： 拖动；
- move_to_element()： 鼠标悬停。
举个例子： 
```plain text
from selenium import webdriver
# 引入 ActionChains 类
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome()
driver.get("https://www.baidu.cn")

# 定位到要悬停的元素
above = driver.find_element_by_link_text("设置")
# 对定位到的元素执行鼠标悬停操作
ActionChains(driver).move_to_element(above).perform()
```
以下为常用的键盘操作： 
- send_keys(Keys.BACK_SPACE) 删除键（BackSpace）
- send_keys(Keys.SPACE) 空格键(Space)
- send_keys(Keys.TAB) 制表键(Tab)
- send_keys(Keys.ESCAPE) 回退键（Esc）
- send_keys(Keys.ENTER) 回车键（Enter）
- send_keys(Keys.CONTROL,'a') 全选（Ctrl+A）
- send_keys(Keys.CONTROL,'c') 复制（Ctrl+C）
- send_keys(Keys.CONTROL,'x') 剪切（Ctrl+X）
- send_keys(Keys.CONTROL,'v') 粘贴（Ctrl+V）
- send_keys(Keys.F1) 键盘 F1
- send_keys(Keys.F12) 键盘 F12
```plain text
# 输入框输入内容
driver.find_element_by_id("kw").send_keys("seleniumm")

# 删除多输入的一个 m
driver.find_element_by_id("kw").send_keys(Keys.BACK_SPACE)
```
```plain text
title = driver.title # 打印当前页面title
now_url = driver.current_url # 打印当前页面URL
user = driver.find_element_by_class_name('nums').text # # 获取结果数目
```
- 显示等待
显式等待使WebdDriver等待某个条件成立时继续执行，否则在达到最大时长时抛出超时异常（TimeoutException）。 
```plain text
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Firefox()
driver.get("http://www.baidu.com")

element = WebDriverWait(driver, 5, 0.5).until(
                      EC.presence_of_element_located((By.ID, "kw"))
                      )
element.send_keys('selenium')
driver.quit()
```
WebDriverWait类是由WebDirver 提供的等待方法。在设置时间内，默认每隔一段时间检测一次当前页面元素是否存在，如果超过设置时间检测不到则抛出异常。具体格式如下： 
WebDriverWait(driver, timeout, poll_frequency=0.5, ignored_exceptions=None) 
- driver ：浏览器驱动。
- timeout ：最长超时时间，默认以秒为单位。
- poll_frequency ：检测的间隔（步长）时间，默认为0.5S。
- ignored_exceptions ：超时后的异常信息，默认情况下抛NoSuchElementException异常。
- WebDriverWait()一般由until()或until_not()方法配合使用，下面是until()和until_not()方法的说明。
- until(method, message=‘’) 调用该方法提供的驱动程序作为一个参数，直到返回值为True。
- until_not(method, message=‘’) 调用该方法提供的驱动程序作为一个参数，直到返回值为False。
在本例中，通过as关键字将expected_conditions 重命名为EC，并调用presence_of_element_located()方法判断元素是否存在。 
- 隐式等待
如果某些元素不是立即可用的，隐式等待是告诉WebDriver去等待一定的时间后去查找元素。 默认等待时间是0秒，一旦设置该值，隐式等待是设置该WebDriver的实例的生命周期。 
```plain text
from selenium import webdriver
driver = webdriver.Firefox()
driver.implicitly_wait(10) # seconds
driver.get("http://somedomain/url_that_delays_loading")
myDynamicElement = driver.find_element_by_id("myDynamicElement")
```
### 在不同的窗口和框架之间移动

```plain text
driver.switch_to_window("windowName")
driver.switch_to_frame("frameName")
```
以直接取表单的id 或name属性。如果iframe没有可用的id和name属性，则可以通过下面的方式进行定位。 
```plain text
#先通过xpth定位到iframe
xf = driver.find_element_by_xpath('//*[@id="x-URS-iframe"]')

#再将定位对象传给switch_to_frame()方法
driver.switch_to_frame(xf)
```
一旦我们完成了frame中的工作，我们可以这样返回父frame: 
```plain text
driver.switch_to_default_content()
```
```plain text
alert = driver.switch_to_alert()
```
- text：返回 alert/confirm/prompt 中的文字信息。
- accept()：接受现有警告框。
- dismiss()：解散现有警告框。
- send_keys(keysToSend)：发送文本至警告框。keysToSend：将文本发送至警告框。
```plain text
from selenium import webdriver
from selenium.webdriver.support.select import Select
from time import sleep

driver = webdriver.Chrome()
driver.implicitly_wait(10)
driver.get('http://www.baidu.com')
sel = driver.find_element_by_xpath("//select[@id='nr']")
Select(sel).select_by_value('50')  # 显示50条
```
```plain text
driver.find_element_by_name("file").send_keys('D:\\upload_file.txt')  # # 定位上传按钮，添加本地文件
```
WebDriver操作cookie的方法： 
- get_cookies()： 获得所有cookie信息。
- get_cookie(name)： 返回字典的key为“name”的cookie信息。
- add_cookie(cookie_dict) ： 添加cookie。“cookie_dict”指字典对象，必须有name 和value 值。
- delete_cookie(name,optionsString)：删除cookie信息。“name”是要删除的cookie的名称，“optionsString”是该cookie的选项，目前支持的选项包括“路径”，“域”。
- delete_all_cookies()： 删除所有cookie信息
### 调用JavaScript代码

```plain text
js="window.scrollTo(100,450);"
driver.execute_script(js) # 通过javascript设置浏览器窗口的滚动条位置
```
通过execute_script()方法执行JavaScripts代码来移动滚动条的位置。 
```plain text
driver.get_screenshot_as_file("D:\\baidu_img.jpg") # 截取当前窗口，并指定截图图片的保存位置
```



 > 在遵循创作的康庄大道上，若我的文字不慎踏入了他人的花园，请告之我，我将以最快的速度，携带着诚意和尊重，将它们从您的视野中撤去。
