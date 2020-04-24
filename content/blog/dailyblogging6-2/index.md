---
title: Daily Study Logiing6.1 여행경로- 프로그래머스 , 파이썬
date: "2020-04-24T15:18:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/43164)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/d755a879399b57e9b163418adc883d4351332ac5)

```python 
from collections import defaultdict
import copy

def solution(tickets):
    countryDict = defaultdict(list)
    for ticket in tickets:
        countryDict[ticket[0]].append(ticket[1] ) 
        countryDict[ticket[0]].sort()
    answer = []
    def dfs(t, footprint, countryDict):
        tmp = footprint[:]
        tmp.append(t)
        if len(tmp) == len(tickets)+1:
            answer.append(tmp)
            return
        for c in countryDict[t]:
            tmpDict = copy.deepcopy(countryDict)
            tmpDict[t].remove(c)
            dfs(c, tmp, tmpDict)
    
    for c in countryDict["ICN"]:
            tmpDict = copy.deepcopy(countryDict)
            tmpDict["ICN"].remove(c)
            dfs(c, ["ICN"], tmpDict)
    return answer[0]

    
print(solution([['ICN', 'COO'], ['ICN', 'BOO'], ['COO', 'ICN'], ['BOO', 'DOO']]))

```

알파벳이 빠른 순서로 모든 티켓을 사용하는 경로를 반환해야 한다. 

dict에 key로 출발지를 집어넣고 value값으로 갈수 있는 곳을 놓는다. 

이를 위해서 기존 tickets에 for문을 실행해 준다. 이때, 알파벳 순으로 앞에 있는 도착지들이 앞에 오도록 한다. 이렇게 정렬을 해주기 때문에 이후 시행할 dfs에서 처음으로 모든 곳을 순회한 경로가 알파벳순으로 가장 앞선 경로가 된다. 

dfs의 인자는 도착지, 지금까지 경로, 앞으로 갈수 있는 경로가 주어진다. 

dfs재귀를 할때 각 갈래별로 새로 갱신된 경로를 넣어 주어야 하므로 footprint를 얇은 복사한다.
여기에 도착지를 추가해 준다. 

만약 경로의 길이가 티켓 수보다 1개 더 많으면 그건 모든 티켓을 다썼다는 의미다. 이경우 정답에 경로를 추가하고 dfs를종료 한다. 

아직 dfs를 더 해야 한다면, 해당 도착지에서 갈수 있는 곳들을 다시 dfs로 방문한다. 

이때 증복된 곳을 계속 방문하면 안되기 때문에, 이전 도착지들은 갈수있는 경로에서 제거해 준다. 

위의 코드에서 deepcopy를 쓴 이유는 countryDict는 value로 배열을 가지고 있고 이것까지 복사를 하려면 얕은 복사로는 안되기 때문이다. 

앞서서 알파벳 순으로 원소를 정렬해 주었기 때문에 처음 ticket길이 +1 이되는 경로가 답이 된다. 