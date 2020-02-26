---
title: 백준-1697번 숨바꼭질, 파이썬
date: "2020-02-26T12:40:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "silver 1"] 
---
## 문제
수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.

수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 구하는 프로그램을 작성하시오.

## 입력
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.

## 출력
수빈이가 동생을 찾는 가장 빠른 시간을 출력한다.

**예제 입력 1**

5 17
**예제 출력 1**
4

**힌트**
수빈이가 5-10-9-18-17 순으로 가면 4초만에 동생을 찾을 수 있다.


## 풀이

100000개의 방을 수빈이와 동생이 돌아다니는 것으로 취급하고 bfs를 사용하여 푼다. 




```python 
import sys
from collections import deque

input = sys.stdin.readline

st, ed = list(map(int, input().split()))

#전체를 100000개 방이 있는 곳으로 놓기 
visited = [0]*200010

q = deque([st])
cntset = []

def bfs(st, ed):
    cnt = 0
    while q:
        for _ in range(len(q)):
            v = q.popleft()
            if not(visited[v]):
                visited[v] = 1 
                if v == ed:
                    return cnt
                if v-1>=0:
                    q.append(v-1)
                if v +1 <= 100000:
                    q.append(v+1)
                if v*2 <= 100000:
                    q.append(v*2)
        cnt += 1
print(bfs(st,ed))

```




























