---
title: Daily Study Logging24 - 프로그래머스 기지국 설치
date: "2020-05-20T21:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["knowledge", "studylog", "regex"] 
---

[출처](https://programmers.co.kr/learn/courses/30/lessons/12979)


문제의 조건 대로 구현하기 위해 함수를 길...게 짜 보았지만, 효율성은 통과하지 못했다. 그래도 나름 깔끔하게 코드를 짰다는 점에서 스스로에게 조금의 칭찬은 해 주고 싶다. 

**시간초과 난 코드**
```python
from collections import defaultdict
index = 0
cnt = 0

def checkStation(n, station, w, visit):
    if station - w > 0:
        left = station - w
    else:
        left = 0
    if station + w <= n :
        right = station+w 
    else:
        right = n
    for i in range(left, right+1):
        visit[i] = right+1
    # print(visit)

# 해당 지점에서 출발 했을 때, 0이 아닌 지점을 반환해 주는 함수 
def checkIfPossible(idx, visit, footprint, n):
    global index
    # print(idx)
    if idx >= n:
        return
    if visit[idx] != 0:
        tmp = footprint[:]
        tmp.append(idx)
        checkIfPossible(visit[idx], visit, tmp, n)
    else:
        print(footprint)
        print(visit)
        print(idx)
        for i in footprint:
            visit[i] = idx
            # print(visit[i])
        index = idx
    
        
# 0이 아닌 곳이 주어졌을 때 기지국을 건설하는 함수 
def buildStation(index, visit, w, n, iterCnt):
    global cnt
    if iterCnt > w:
        return 
    if index+w <= n and visit[index+w] == 0:
        checkStation(n, index+w, w, visit)
        cnt += 1
       
    else:
        buildStation(index-1, visit, w, n, iterCnt +1 )
    
def solution(n, stations, w):
    global index, cnt
    visit = defaultdict(lambda : 0)
    for station in stations:
        checkStation(n, station, w, visit)
    
    while index <= n:
        # index는 visit에서 0 인 것만 가르킨다.
        checkIfPossible(index, visit, [], n)
        # 0인 자리를 시작으로 타워를 지어서 0을 채운다.
        buildStation(index, visit, w, n, 0)
        index += 1
    
    return cnt
        
print(solution(16, [9], 2))    
```

하지만,효율성을 통과할 아이디어가 나지 않아 다른 사람의 코드를 참고했더니....생각을 조금만 바꾸면 매우 쉬운 문제였다는 사실을 깨닳았다.


[코드 출처](https://inspirit941.tistory.com/entry/Python-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EA%B8%B0%EC%A7%80%EA%B5%AD-%EC%84%A4%EC%B9%98-Level-3
)
```python
import math
def solution(n, stations, w):
    result = 0
    distance = []
    
    # 설치된 기지국 사이에 전파가 닿지 않는 거리를 저장한다
    for i in range(1, len(stations)):
        distance.append((stations[i]-w-1) - (stations[i-1]+w))
    
    # 맨 앞 기지국에서 첫 번째 아파트 사이에 전파가 닿지 않는 거리,
    # 맨 뒤 기지국에서 마지막 아파트 사이에 전파가 닿지 않는 거리를 저장한다
    distance.append(stations[0]-w-1)
    distance.append(n - (stations[-1]+w))
    
    for i in distance:
        # 닿지 않는 거리가 0 이하일 경우 스킵한다
        if i <=0: continue
        # 닿지 않는 거리에 설치할 수 있는 최소개수를 더해준다.
        result += math.ceil(i / ((w*2) +1))
    return result
```

빈 공간의 길이를 구하고 그 길이를 매꾸기 위한 타워 개수만 구하면 되는 것.

카카오코테를 오래 준비하다 보니, 아이디어를 좋게 하는 것 보다 구현을 하는 것에 더 집중을 했다. 카카오는 번뜩이는 아이디어로 풀기 보다는 복잡한 구현을 잘 해내도록 유도하는 문제를 내곤 하기 때문이다. 

다른 코테에서는 간단한 방법이 있을 수 있음을 인지하고 풀도록 해야겠다.
