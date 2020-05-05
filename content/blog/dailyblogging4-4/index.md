---
title: Daily Study Logging4.4 섬연결하기- 프로그래머스 , 파이썬
date: "2020-04-22T12:18:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42861)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/e6d5997eb8f3c75fe2942678d75bb7094582ab9b)

```python 
import heapq as hq

def solution(n, costs):
    answer = 0
    costList = [[] for _ in range(n)]

    for f, t, c in costs:
        costList[f].append((t,c))
        costList[t].append((f,c))
    workList = [] 
    visit = [0]*n

    hq.heappush(workList, (0,0))
    while 0 in visit:
        c, p = hq.heappop(workList)
        if visit[p]:
            continue
        answer += c
        visit[p] = 1

        for t, c in costList[p]:
            if visit[t] == 0:
                hq.heappush(workList, (c, t))
    return answer
print(solution(4, [[0, 1, 1], [0, 2, 2], [1, 2, 5], [1, 3, 1], [2, 3, 8]]))

```

DFS로 풀어보려 하다가 실패, DFS는 최소 값을 찾는데는 적합한 방법인 것 같지 않다.

다른 사람의 풀이를 참고하여 heapq를 써서 풀어 보았다.

제일 먼저 각 섬의 비용정보를 저장할 리스트를 만들어 준다. n개 만큼의 빈 array를 원소로 준비한다. 

costs 를 f, t, c 로 나누고 costList에 (각 인덱스에서 갈수있는 자리, 코스트)의 튜플로 저장해 놓는다. 

heapq로 활용할 리스트 하나를 workList로 만든다. 

workList에는 (비용, 좌표)로 원소들이 저장될 것이다. 일단 시작 지점에 (0,0)을 집어 넣어 0에서 시작을 하게 한다. 

그 뒤 while문을 돌리는데, workList에서 heappop을 해준다. heappop에 의해 제일 작은 원소가 골라지기 때문에, 이때 pop한 원소는 대기중인 것들중 제일 작은 비용을 가진 것이다. 

근데 만약 이 다리에 이미 방문한 적이 있다면 continue로 지나쳐 준다.

방문한 적이 경우에는 코스트를 정답에 비용을 더해주고 방문 처리를 한다. 

그뒤 해당 좌표에서 갈수 있는 곳을 heapq에 담는다. 

이를 반복하면 최소 비용으로 다리를 건설할 수 있게 된다. 






