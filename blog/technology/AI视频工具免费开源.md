---
slug: ai-video-generator
title: 全新免费开源AI视频生成工具：本地部署，轻松生成超长2分钟视频
date: 2024-04-18
authors: wenhao
tags: [AI, 软件工具, AI视频生成]
keywords: [AI, 软件工具, AI视频生成]
image: https://image.wenhaofree.com/2025/05/f02a4ecc8510cc56e9bf51ca9a55d4f4.png
# sticky: 6
---



<!-- truncate -->

# 流媒体T2V

<img src="https://image.wenhaofree.com/2025/05/f02a4ecc8510cc56e9bf51ca9a55d4f4.png"/>

*StreamingT2V 是一种先进的自回归技术，可以创建具有丰富运动动态且没有任何停滞的长视频。它确保整个视频的时间一致性，与描述性文本紧密结合，并保持高帧级图像质量。我们的演示包括高达 1200 帧、时长 2 分钟的视频的成功示例，并且可以延长更长的持续时间。重要的是，StreamingT2V 的有效性不受所使用的特定 Text2Video 模型的限制，这表明基础模型的改进可以产生更高质量的视频。*





## 本地搭建步骤：

1. 克隆此存储库并输入：

```
git clone https://github.com/Picsart-AI-Research/StreamingT2V.git
cd StreamingT2V/
```

2. 使用 Python 3.10 和 CUDA >= 11.6 安装要求

```
conda create -n st2v python=3.10
conda activate st2v
pip install -r requirements.txt
```



3. （可选）如果您的系统上缺少 FFmpeg，请安装 FFmpeg

```
conda install conda-forge::ffmpeg
```

4. [从HF](https://huggingface.co/PAIR/StreamingT2V)下载权重并将其放入`t2v_enhanced/checkpoints`目录中。

------





# 使用：

## 推理



### 对于文本转视频



```
cd t2v_enhanced
python inference.py --prompt="A cat running on the street"
```



要使用其他基本模型，请添加`--base_model=AnimateDiff`参数。用于`python inference.py --help`更多选项。

### 对于图像到视频



```
cd t2v_enhanced
python inference.py --image=../__assets__/demo/fish.jpg --base_model=SVD
```



### 推理时间



##### [ModelscopeT2V](https://github.com/modelscope/modelscope)作为基础模型



| 帧数   | 更快预览的推理时间 (256x256) | 最终结果的推理时间 (720x720) |
| ------ | ---------------------------- | ---------------------------- |
| 24帧   | 40秒                         | 165秒                        |
| 56帧   | 75秒                         | 360秒                        |
| 80帧   | 110秒                        | 525秒                        |
| 240帧  | 340秒                        | 1610 秒（约 27 分钟）        |
| 600帧  | 860秒                        | 5128 秒（约 85 分钟）        |
| 1200帧 | 1710 秒（约 28 分钟）        | 10225 秒（约 170 分钟）      |

##### [AnimateDiff](https://github.com/guoyww/AnimateDiff)作为基础模型



| 帧数   | 更快预览的推理时间 (256x256) | 最终结果的推理时间 (720x720) |
| ------ | ---------------------------- | ---------------------------- |
| 24帧   | 50秒                         | 180秒                        |
| 56帧   | 85秒                         | 370秒                        |
| 80帧   | 120秒                        | 535秒                        |
| 240帧  | 350秒                        | 1620 秒（约 27 分钟）        |
| 600帧  | 870秒                        | 5138 秒（~85 分钟）          |
| 1200帧 | 1720 秒（约 28 分钟）        | 10235 秒（约 170 分钟）      |

##### [SVD](https://github.com/Stability-AI/generative-models)作为基本模型



| 帧数   | 更快预览的推理时间 (256x256) | 最终结果的推理时间 (720x720) |
| ------ | ---------------------------- | ---------------------------- |
| 24帧   | 80秒                         | 210秒                        |
| 56帧   | 115秒                        | 400秒                        |
| 80帧   | 150秒                        | 565秒                        |
| 240帧  | 380秒                        | 1650 秒（约 27 分钟）        |
| 600帧  | 900秒                        | 5168 秒（~86 分钟）          |
| 1200帧 | 1750 秒（约 29 分钟）        | 10265 秒（~171 分钟）        |

所有测量均使用 NVIDIA A100 (80 GB) GPU 进行。当帧数超过 80 时，采用随机混合。对于随机混合，`chunk_size`和 的值`overlap_size`分别设置为 112 和 32。


## 软件工具资料已经打包好!!
👆🔼**领取添加VX: wenhaofree **🔼👆

![SCR-20240426-jtrc](https://leanoss.fuwenhao.club/3JY2Mt0bpJYfuojus25wbqXupdABr5AU/%E6%96%87%E6%B5%A9%E5%BE%AE%E4%BF%A103.png)

