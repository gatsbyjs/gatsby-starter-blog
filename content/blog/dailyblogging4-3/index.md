---
title: Daily Study Logiing4.3 - 프로그래머스 디스크 컨트롤, 파이썬
date: "2020-04-22T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42627)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/00f569e7da543a114aa062d25d2b2bc747dd9d16)

```python 
def solution(jobs):
    jobs.sort(key = lambda x: x[1])
    curT = 0
    ansset = [] 
    while jobs:
        isNotIn = True
        for i in range(len(jobs)):
            if jobs[i][0] <= curT:
                excution = jobs.pop(i)
                isNotIn = False
                break
        if isNotIn:
            curT += 1 
            
        else:
            curT += excution[1]
            ansset.append(curT-excution[0])
    answer = sum(ansset)//len(ansset)
    return answer
print(solution([[0, 3], [1, 9], [2, 6]]))
```

작업 가능한 것들중 가장 짧은 시간을 소요하는 작업을 먼저 처리해야, 뒤따라오는 작업들의 시간을 늦추지 않을 수 있다. 

일단 정렬을 짧은 시간 순으로 하고, 작업 가능한 시간대에 있는 것들을 순서대로 처리하는 알고리즘을 짰다.

만약 수행 할 수 있는 작업이 없다면, 작업이 가능할 때까지 시간을 1씩 더해줬다. 시간을 1더하는 연산은 1억번하는데 1초정도 걸리니까 큰 문제 없다고 판단했다. 


