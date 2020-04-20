---
title: Daily Study Logiing2.2 - 프로그래머스 도둑질, 파이썬 
date: "2020-04-20T12:20:32.169Z"
description: 프로그래머스 DP
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42897)


[커밋 로그](https://github.com/Jesscha/algorithmsolutions/commit/ddc431d652d9726349e584db572b303bda29fd1c)

```python

def solution(money):
    # 첫번쨰를 무조건 차용하지 않음
    dp0 = [0 for _ in range(len(money))]
    # 첫번쨰를 무조건 차용함 
    dp1 = [0 for _ in range(len(money))]
    dp0[0] = 0 
    dp0[1] = money[1]

    dp1[0] = money[0]
    dp1[1] = max(money[0], money[1])
    length = len(money) -1
    
    for i in range(2, len(money)):
        # 첫번째 거를 사용한 dp는 마지막을 무조건 사용할 수 없다. 
        if i == length:
            dp1[i] = dp1[i-1]
        else:
            dp1[i] = max(dp1[i-1], dp1[i-2]+money[i])
        dp0[i] = max(dp0[i-1], dp0[i-2]+money[i])
    answer = max(dp0[length], dp1[length])
    return answer

print(solution([1, 2, 3, 1]))


```

문제를 풀기 전에는 먼저 생각을 해야 한다. 

이 문제는 효율성을 고려해서 풀어야 하는 문제다. 집의 개수가 1백만개 까지 올라가는 데서 그 냄새를 일단 맡아야 한다. 

경험상, 알고리즘 문제에서 효율성이 중요한 문제라는 눈치를 준다면, DP 아니면 이분탐색을 고려해 봐야 한다.

이 문제는 dp로 풀 수 있는 문제였다. 이전 값의 결과들을 재 사용할 수 있는 식을 만들어 낼 수 있는 문제 였기 때문이다. (그리고 경험상 이렇게 단계가 지남에 따라 경우의 수가 복잡한 경우 dp를 고려해 보면 답이 나오는 경우가 많았다.)

하지만, dp라는 것을 눈치채는 것과 별개로 어떤 부분에서 dp를 적용해야 하는지 눈치를 채지 못해 다름 사람의 풀이를 참고해야 했다. 

dp를 풀때는 memoization을 어떤 부분에 적용해야 하는지를 알아 차리는 것이 제일 중요하다. 

보통, 인풋으로 주어진 것의 인덱스와 메모의 인덱스를 맞춰가면서, 해당 인풋의 해당 인덱스까지가 계산에 포함되었을 경우의 값을 메모에 담는 페턴이 자주 등장한다. 

하지만, 오랫만에 풀어서 그 페턴을 발견하지 못했다. 

남들의 풀이를 보며 얻은 힌트는 일단 원형 집으로 보지말고 일직선으로 관찰해 보자 라는 것 이었다. 

이 문제의 점화식은 `dp[i]  = max(dp[i-1], dp[i-2]+money[i])`로 요약 된다. 

이전꺼를 그냥 쓰던가 전전꺼에 해당 인덱스의 값을 더한거를 쓰던가 하는 것이다.

단 여기서 집이 원형으로 배치되어 있는 것을 감안해야 한다. 

이를 위해서, 맨처음을 무조건 쓰는 경우와 무조건 쓰지 않는 경우로 나누었다. 

두가지 메모를 만들고 맨 마지막에 두가지중 더 큰것을 취한다면 집에 동그랗게 배치 되어 있다는 제약도 해결 할 수 있다.