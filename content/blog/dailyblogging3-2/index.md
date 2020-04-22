---
title: Daily Study Logiing3.2 - 프로그래머스, 줄 서는 방법
date: "2020-04-21T21:40:32.169Z"
description: 카카오2018 3차 문제
tags: ["algorithm", "studylog"] 
---

[출처](https://programmers.co.kr/learn/courses/30/lessons/12936?language=python3)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/3e597dd8f5a16915cb9c808f902574ea2f79cde1)



처음에는 permutation을 써서 풀었지만 무참히 시간초과에 걸리고 말았다. 


그리고 나서 찬찬히 생각해 보고 다른 사람들의 풀이를 살펴 보니, n진법으로 표시하는 것과 상당히 유사한 방식으로 풀수 있음을 알게 되었다. 

코드는 아래와 같다. 

```python 
def solution(n, k):
    import math as m 
    numList = list(range(1, n+1))
    answerList = []
    while n > 0:
        n -= 1
        p, r= divmod(k, m.factorial(n))
        if r == 0: p-= 1
        answerList.append(numList[p])
        numList.remove(numList[p])
        k = r 
    return answerList
```

k번째 숫자 조합은 주어진 숫자 조합으로 만들수 있는 것 중 사전순으로 k 번째에 등장한다. 

각 자리수에 등장할 수 있는 숫자의 개수는 (사용할 수 있는 숫자)! 개이다.   

즉, (사용할 수있는 숫자)!개로 나누어서 각 자리 수를 나타낼 수 있다는 것이다.

이 아이디어를 바탕으로 문제를 푼다. 


