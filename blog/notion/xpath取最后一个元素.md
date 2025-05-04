---
slug: xpath-take-the-last-element
title: xpath取最后一个元素
date: 2023-11-13
authors: wenhao
tags: ['Default']
keywords: ['Default']
---
https://www.cnblogs.com/z-x-y/p/9718763.html 

查看当前文件夹下每个文件大小 
并会给出当前文件大小总和，后面加具体的文件名会显示具体的文件大小 
<!-- truncate -->


ls -lht 
把*换成具体的文件名会显示具体的文件大小 
du -sh * 
用两个序列构建一个字典 
```plain text
print(dict(zip(t1, t2)))
```
搜索字符串的多个前后缀 
```plain text
print("http://localhost:8888/notebooks/Untitled6.ipynb".startswith(("http://", "https://")))
print("http://localhost:8888/notebooks/Untitled6.ipynb".endswith((".ipynb", ".py")))
```
突破递归次数，设置递归次数为1200 
```plain text
import sys
x = 1200
print(sys.getrecursionlimit())
sys.setrecursionlimit(x)
print(sys.getrecursionlimit())
```
不用循环构造一个列表，只适用于一层嵌套 
```plain text
import itertools
test = [[-1, -2], [30, 40], [25, 35]]
print(list(itertools.chain.from_iterable(test)))
```
数据库中的表也应该有不同的类型，表的类型不同，会对应mysql不同的存取机制，表类型又称为存储引擎 
存储引擎说白了就是如何存取数据、如何为存储的数据建立索引和如何更新、查询数据等技术的实现方法。因为在关系型数据库中数据的存储是以表的形式存储的，所以存储引擎也可以称为表类型（即存储和操作此表的类型） 
2、查询‘生物’课程比‘物理’课程成绩高的所有学生的学号 
思路： 
获取所有生物课程的人（学号，成绩）-临时表 
获取所有物理课程的人（学号，成绩）-临时表 
根据学号连接两个临时表： 
学号 生物成绩 物理成绩 
```plain text
SELECT A.student_id,sw,wl from
(SELECT student_id,num as sw from score LEFT JOIN course on score.course_id=course.cid where course.cname='生物')as A
LEFT JOIN
(SELECT student_id,num as wl from score LEFT JOIN course on score.course_id=course.cid where course.cname='物理')as B
on A.student_id =B.student_id where sw > if (ISNULL(wl),0,wl);
```
自己写了一段 
```plain text
SELECT A.student_id,sw,wl from
(SELECT student_id,num as sw from score where course_id=(SELECT cid from course WHERE cname='生物')) as A
LEFT JOIN
(SELECT student_id,num as wl from score where course_id=(SELECT cid from course WHERE cname='物理')) as B
on A.student_id=B.student_id where sw > if (ISNULL(wl),0,wl)
```
3、查询平均成绩大于60分的同学的学号和平均成绩 
思路： 
根据学生分组，使用avg获取平均值，通过having对avg进行筛选 
```plain text
select student_id,avg(num) from score group by student_id having avg(num) > 60
```
4、查询所有同学的学号、姓名、选课数、总成绩 
```plain text
select score.student_id,student.sname,count(score.student_id),sum(score.num)
from
score left join student on score.student_id=student.sid group by score.student_id
```
5、查询姓‘李’的老师的个数 
6、查询没学过‘叶平’老师课的同学的学号、姓名 
思路： 
先查询‘李平老师’老师教的所有课的ID 
然后获取选了李平老师课的学生ID 
最后从学生表中筛选 
7、查询学过‘001’并且也学过编号‘002’课程的同学的学号、姓名 
思路： 
先查到既选择001又选择002课程的所有同学 
根据学生进行分组，如果学生数量等于2表示，两门均已选择 
8、查询学过‘叶平’老师所教的所有课的同学的学号、姓名 
9、查询课程编号‘002’的成绩比课程编号‘001’课程低的所有同学的学号、姓名 
同第一题，把大于号改成小于号 
我写了个更简单的 
10、查询有课程成绩小于60分的同学的学号、姓名 
11、查询没学全所有课的同学的学号、姓名 
思路： 
在分数表中根据学生进行分组，获取每一个学生选课数量 
如果数量==总课程数量，表示已经选择了所有课程 
12、查询至少有一门课与学号为‘001’的同学所学相同的同学的学号和姓名（没有理解） 
思路： 
获取001同学选择的所有课程 
获取课程在其中的所有人以及所有课程 
根据学生筛选，获取所有学生信息 
再与学生表连接，获取姓名 
13、查询至少学过学号为‘001’同学的所有课的其他同学学号和姓名（没有理解） 
思路： 
先找到和001的学过的所有人 
然后个数=001所有学科 ==》》其他人可能选择的更多 



 > 在遵循创作的康庄大道上，若我的文字不慎踏入了他人的花园，请告之我，我将以最快的速度，携带着诚意和尊重，将它们从您的视野中撤去。
