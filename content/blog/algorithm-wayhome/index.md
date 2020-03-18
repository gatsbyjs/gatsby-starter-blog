---
title: 프로그래머스-등굣길, 파이썬
date: "2020-02-21T12:40:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "level3"] 
---

[출처](https://programmers.co.kr/learn/courses/30/lessons/42898)

## 문제 설명
계속되는 폭우로 일부 지역이 물에 잠겼습니다. 물에 잠기지 않은 지역을 통해 학교를 가려고 합니다. 집에서 학교까지 가는 길은 m x n 크기의 격자모양으로 나타낼 수 있습니다.

아래 그림은 m = 4, n = 3 인 경우입니다.

![그림](https://grepp-programmers.s3.amazonaws.com/files/ybm/056f54e618/f167a3bc-e140-4fa8-a8f8-326a99e0f567.png)

가장 왼쪽 위, 즉 집이 있는 곳의 좌표는 (1, 1)로 나타내고 가장 오른쪽 아래, 즉 학교가 있는 곳의 좌표는 (m, n)으로 나타냅니다.

격자의 크기 m, n과 물이 잠긴 지역의 좌표를 담은 2차원 배열 puddles이 매개변수로 주어집니다. 집에서 학교까지 갈 수 있는 최단경로의 개수를 1,000,000,007로 나눈 나머지를 return 하도록 solution 함수를 작성해주세요.

## 제한사항
격자의 크기 m, n은 1 이상 100 이하인 자연수입니다.
m과 n이 모두 1인 경우는 입력으로 주어지지 않습니다.
물에 잠긴 지역은 0개 이상 10개 이하입니다.
집과 학교가 물에 잠긴 경우는 입력으로 주어지지 않습니다.

## 입출력 예
|m|	n|	puddles|	return|
|-|-|-|-|
|4|	3|	[[2, 2]]|	4

## 입출력 예 설명
![그림2](https://grepp-programmers.s3.amazonaws.com/files/ybm/32c67958d5/729216f3-f305-4ad1-b3b0-04c2ba0b379a.png)


## 풀이 

어떻게 풀어야 할까? 


이 문제를 풀기 위해 중학교때 배웠던 경우의 수를 다시 복습해야 했다. 

우로 가는 것을 r 이라고 하고 아래로 가는 것을 d 라고 하자. 

학교는 오른쪽 끝에 있으므로 m-1 번은 오른쪽으로 이동해야 학교에 다다를 수 있다. 
학교는 아래쪽 끝에 있으므로 n-1 번은 아래쪽으로 이동해야 학교에 다다를 수 있다.


즉, 어떤 경로로 가던지 m-1번 오른쪽으로 가고 n-1번 아래 쪽으로 가면 학교에 도착하는 것이다.

이말은 즉, m-1개의 r과 n-1개의 d를 엮어서 만들수 있는 모든 조합이 가능한 모든 수 라는 것이다. 

이렇게 전체 경우의 수를 구한뒤, 물구덩이가 생긴부분을 지나쳐 가는 경우의 수만을 빼면 된다. 

물구덩이 x 좌표 -1 만큼 오른쪽으로 가고 y좌표 -1 만큼 아래 쪽으로 가면 물구덩이에 도착한다. 이 경우의 수에 다시 m-물구덩이 x좌표-1, n-물구덩이 y좌표-1 만큼을 이동할 때 생기는 경우의 수를 모두 빼주면 된다. 

코드로 작성해 보자

### 실패한 코드

```python

from itertools import permutations #순열을 사용하기 위한 임포트

def solution(m, n, puddles):
    #전체 경우의 수 계산
    rd = 'r'*(m-1)+'d'*(n-1)
    length = len(rd)
    total = set(list(permutations(rd, length)))
    totalNumber = len(total)
    disabledWay = 0
    
    for i in range(len(puddles)):
    
        #웅덩이로 가는 경우의 수 계산
        wayToPuddle = (puddles[i][0]-1)*'r'+(puddles[i][1]-1)*'d'
        lengthToPuddle = len(wayToPuddle)
        totalToPuddle = set(list(permutations(wayToPuddle, lengthToPuddle)))
        toPuddleNumber = len(totalToPuddle)

        #웅덩이에서 학교로 가는 경우의 수 계산
        wayFromPuddle = (m-puddles[i][0])*'r'+(n-puddles[i][1])*'d'
        lengthFromPuddle =len(wayFromPuddle)
        totalFromPuddle = set(list(permutations(wayFromPuddle, lengthFromPuddle)))
        fromPuddleNumber = len(totalFromPuddle)
        
        #해당 경우에서 계산된 불가능한 경우를 하나로 묶기
        disabledWay += toPuddleNumber*fromPuddleNumber
    
    answer = totalNumber - disabledWay
    return answer
```

중학교 수학의 로직을 따라서 풀었으나 틀렸다. 아마 웅덩이가 여러개 있는경우 증복해서 숫자를 빼서 그렇지 않을까 싶다.

웅덩이에서 웅덩이 까지 가는 길목은 증복으로 빼졌을 테니까 그 부분을 다시 더해 주어야 할텐데..그러면 작업이 너무 복잡해 진다.

다른 사람들의 풀이를 보면서 나의 문제점을 찾아 보자.

다른 사람들이 접근한 관점은 나와는 조금 차이가 있었다.

순열이나 조합같은 것을 사용하지 않았다. 대신에, 특정 좌표 m,n으로 가는 방법은 해당 좌표의 왼쪽에서 들어올 수 잇는 방법과 위쪽에서 들어올 수 있는 방법을 더한 값 이라는 발상에 착안해서 계산을 했다.


### 성공한 코드 

```python

def solution(m, n, puddles):
    route=[[0]*(m+1) for _ in range(n+1)] #전체 지도를 만든다. 일단 방문한 적이 없으므로 모두 0을 준다.
    
    route[1][1] = 1 # 시작점으로 가는 방법은 총 1개가 있다. 바로 가만히 있기
    for i in range(1, n+1): #1에서 n의 자리까지 모든 경우
        for j in range(1, m+1): # 1에서 m의 자리까지 모든 경우 
            if i==1 and j == 1: # 만약, i,j 가 1 일때는 시작 지점이니 스킵
                continue
            if [j,i] in puddles: # 물웅덩이가 있는 곳을 지나는 건0으로 친다.
                route[i][j] = 0 
            else: #왼쪽으로 들어오는 경우와 위쪽에서 들어오는 경우를 합한다.
                route[i][j] += (route[i-1][j] + route[i][j-1])
    return(route[-1][-1])%100000007

```














