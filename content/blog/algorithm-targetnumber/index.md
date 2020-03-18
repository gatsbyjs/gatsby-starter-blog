---
title: 프로그래머스 - 타겟 넘버, 파이썬
date: "2020-02-27T12:40:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "level2"] 
---

[출처](https://programmers.co.kr/learn/courses/30/lessons/43165)
## 문제 설명
n개의 음이 아닌 정수가 있습니다. 이 수를 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

## 제한사항
주어지는 숫자의 개수는 2개 이상 20개 이하입니다.
각 숫자는 1 이상 50 이하인 자연수입니다.
타겟 넘버는 1 이상 1000 이하인 자연수입니다.
## 입출력 예

|numbers|target|return
|-|-|-
|[1, 1, 1, 1, 1]|3|	5


## 풀이 


DFS를 이용하는 문제다. 

DFS의 본질은 결국 한가지 경우의 수를 끝까지 탐색 하는 일을 반복하는 것 이다. 

만약 이 문제가 BFS DFS 카테고리에 있지 않았더라도 DFS를 떠올 릴 수 있었을까? 

완전 탐색으로도 풀수 있지 않았을까? 모든 덧셈뺄샘 경우를 섞어서 집어 넣었으면 가능했을수 있겠다. 

여러가지 방법중에 제일 효율적인 방법을 찾는게 문제 풀이에서 굉장히 중요한 영역 이라고 생각한다. 

BFS DFS는 직관적으로 떠올리기 어려운 경향이 좀 있는 것 같다. 
일단 이 문제에서 확인할 수 있는 시사점은 모든 경우의 끝까지 가보기 위해서 사용 될 수 있다는 점이다. 

또 이 문제를 푸는데 중요한 포인트 중 하나는 global을 이용한 외부 변수를 가져오기 였다. 

DFS가 딱히 뭘 리턴하지 않아도 , global한 변수 값을 조정해 주기 때문에 답을 낼 수 있다. 

풀이는 아래와 같다

```python
answer = 0
def DFS(value, idx, numbers, target):
    global answer
    n = len(numbers)
    if idx == n and value == target:
        answer += 1
        return  
    if idx == n:
        return
    DFS(value+numbers[idx], idx+1, numbers, target)
    DFS(value-numbers[idx], idx+1, numbers, target)
    
def solution(numbers, target):
    global answer
    DFS(0, 0, numbers, target)
    return answer
```