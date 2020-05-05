---
title: Daily Study Logging12 - 카카오 겨울 인턴 호텔방, 파이썬
date: "2020-05-04T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/64063?language=python3)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/36bf8e009e28f7d297835ea703bf36b6cf1fb160)

효율성을 통과하기 어려운 문제였다. 모의고사에서 풀 때도 정확도만 맞추고 효율성은 통과하지 못했던 문제다. 

다시 시도해 보았으나 역시나 실패해서 다른 분의 풀이를 빌려와 주석을 달며 공부해 보겠다. 

```python 
def solution(k, room_number):
    room_dic = {}
    ret = []
    for i in room_number:
        n = i
        visit = [n]
        while n in room_dic:
            n = room_dic[n]
            visit.append(n)
        ret.append(n)
        for j in visit:
            room_dic[j] = n+1
    return ret
```
제일 단순한 방법은 방을 하나하나 돌아다니면서 비엇는지 체크를 하는 것이고, 이 방법을 사용할 경우 n명의 사람이 n명의 방을 체크하는 꼴 이므로 O(n^2)의 시간 복잡도가 된다.

문제 풀이에 핵심이 되는 생각은, 이미 누가 호텔 방을 쓰고 있을 경우 바로 묵을 수 있는 호텔 방으로 연결 되도록 하는 것 이다. 

위의 풀이에서는 이를 dict를 사용하여 해결하고 있다. 

프로세스는 아래와 같다. 

1. 손님이 한명 온다.

2. 그 손님이 원하는 방이 이미 사용중인지 확인한다. 

3. 이미 사용중이 라면 연결되어 있는 다른 방으로 간다. 더이상 다른 방과 연결되어 있지 않을 때까지 이를 반복하며 스쳐지나간 방들을 visit에 append 한다. 

4. 비어있는 방이 나오면 그걸 정담에 append한다. 

5. visit에 들어있는 방들을 key로 하는 value들을 (3에서 발견되 연결되어 있지 않은 방의 번호 +1)로 바꾼다.

위처럼 풀면, 이미 사용중이 방이 가리키는 번호를 따라가니까 비어있는 방을 하나하나 체크하며 찾지 않을 수 있다. O(n)과 O(n^2)사이의 O(nm), m < n의 복잡도를 가지는 것 같다. 

나는 왜 이 풀이를 떠올리지 못했을까? 핵심아이디어 까지는 같았지만 위처럼 구현을 못해서 틀렸다. 

나는 이미 점거된 경우, 그렇지 않은 경우로 세분화 했는데 그럴 필요는 없었던 문제였다. 온갖 경우를 다 생각하려다 보니 머리의 용량이 따라잡지 못해 제대로 풀이를 하지 못 했다. 

그리고 시간제한이 있음에도 불구하고 dict를 쓸 생각을 못했다는 것도 패착 중 하나다. 자료구조를 중요하게 생각하자









₩