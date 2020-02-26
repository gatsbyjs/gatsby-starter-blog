---
title: 백준-2178번 미로찾기
date: "2020-02-25T12:40:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "silver 1"] 
---

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FNmHfs%2FbtqzxK4anlq%2FnVjmBpu6VsRocANaM22EXk%2Fimg.png)

## 문제 풀이 

사실 나는 BFS, DFS문제에 약한 편이다. 이런 식으로 머리를 굴리는게 아직 익숙하지 않다. 

다른 사람의 풀이를 참고해서 풀어보자

나는 DFS를 써서 풀려고 했지만 중간에 어떻게 해야 할지 길을 잃어버리고 말았다. BFS를 쓰는게 더 간단한 문제인 듯 하다. 

BFS를 사용하는 방식은 간단하다. 

점을 하나 찍는다 점을 하나 찍고 그 주면 사방을 살펴본다. 

해당 점에서 그 점까지 가는데의 거리는 이전에 간 거리 +1 만큼이다.

이렇게 모든 점까지 가는 거리를 다 채우다 보면 마지막 점도 거리가 채워져 있다. 

이때 마지막 점 까지의 거리를 출력하면된다. 


거리 문제에서는 의외로 모든점까지의 거리를 구하는게 해답인 경우가 있다. 

최단 거리라는 사고의 함정에 빠져서 한번에 가는 경우만 구하려 한다면, 나처럼 낭패에 빠질수 있으니 주의 하자 

그렇게 풀면 될줄 알았지만... 시간 초과에 걸리고말았다.


```python
import sys

input = sys.stdin.readline

N, M = map(int, input().split())
mazeMap = []
distance = [[0]*(M) for _ in range(N) ]

for _ in range(N):
    mazeMap += [list(input())]
    
# start는 0,0에서ㅡ 도착은 n-1, m-1에서

queue = [[0,0]]
visited = []
distance[0][0] = 1 
while queue:
    [i,j] = queue.pop(0)
    visited.append([i,j])
    print(mazeMap)
    if i < N-1 and mazeMap[i+1][j] == '1' and [i+1,j] not in visited and [i+1,j] not in queue:
        queue.append([i+1,j])
        distance[i+1][j] = distance[i][j] + 1  
    if i >0 and mazeMap[i-1][j] == '1'  and [i-1,j] not in visited and [i-1,j] not in queue:
        queue.append([i-1,j])
        distance[i-1][j] = distance[i][j] + 1  
    if j < M-1 and mazeMap[i][j+1] == '1'  and [i,j+1] not in visited and [i,j+1] not in queue:
        queue.append([i,j+1])
        distance[i][j+1] = distance[i][j] + 1  
    if j > 0 and mazeMap[i][j-1] == '1'  and [i,j-1] not in visited and [i,j-1] not in queue:
        queue.append([i,j-1])
        distance[i][j-1] = distance[i][j] + 1  

print(distance[N-1][M-1])
    

```

시간 초과에 안걸리는 코드는 아래와 같다. 내가 짠거랑 무슨 차이가 있는지 살펴보자 

## 시간초과 안 걸리는 코드

나는 visited에 해당 인덱스가 포함되어 있는지 아닌지를 확인하는 과정을 넣었는데, 그렇게 하면 비교 할때마다 포함 여부를 확인하기 위해 O(n)번의 수행을 하게 된다. 반면 아래의 코드는 False냐 True냐 하나만을 비교하기 때문에, O(1) 번의수행을 하게 된다. 

```python
from collections import deque
 
# dx[0], dy[0] => 오른쪽
# dx[1], dy[1] => 왼쪽
# dx[2], dy[2] => 아래
# dx[3], dy[3] => 위
dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]
 
n, m = map(int, input().split())
a = [list(map(int, list(input()))) for _ in range(n)]
q = deque()
check = [[False]*m for _ in range(n)] # 차이가 발생한 부분 
dist = [[0]*m for _ in range(n)] 
 
# 시작점
q.append((0,0))
check[0][0] = True
dist[0][0] = 1
 
while q:
    x, y = q.popleft()
    for k in range(4):
        nx, ny = x+dx[k], y+dy[k]
        if 0 <= nx < n and 0 <= ny < m:
            if check[nx][ny] == False and a[nx][ny] == 1:
                q.append((nx,ny))
                dist[nx][ny] = dist[x][y] + 1
                check[nx][ny] = True
 
print(dist[n-1][m-1])

```