---
title: Daily Study Logging4.2 - 프로그래머스 베스트 엘범, 파이썬
date: "2020-04-22T12:13:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42579)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/d0f688f38f6a7c1b4feb9a9d7612743b5ffb1dae)

```python
from collections import defaultdict

def solution(genres, plays):
    gDict = defaultdict(list)
    for i in range(len(genres)):
        gDict[genres[i]]  = [[],0]
    for i in range(len(plays)):
        gDict[genres[i]][0].append((i, plays[i]))
        gDict[genres[i]][1] += plays[i]
    ansset = [] 
    answer = []
    for k in gDict:
        ansset.append((k,gDict[k]))
    ansset.sort(key = lambda x: x[1][1], reverse= True)
    for song in ansset:
        song[1][0].sort(key=lambda x: (-x[1], x[0]))
        if len(song[1][0]) >= 2:
            answer.append(song[1][0][0][0])
            answer.append(song[1][0][1][0])
        else:
            answer.append(song[1][0][0][0])    
    return answer

print(solution(	["classic", "pop", "classic", "classic", "pop"], [500, 600, 150, 800, 2500]))

```

해시맵을 사용해서 정렬하는 문제였다. 

나의 전략은 하나의 dict를 만들어서 거기에 곡의 인덱스, 곡의 재생횟수, 장르별 재생 총합을 넣은 뒤, 이를 다시 리스트로 만들어 정렬하는 것 이었다. 

이를 위해서 `defaultdict`를 사용했다. 맨 처음에 작 장르별로 필요한 공간을 만들어 었다. 

그 뒤 `plays`를 순회 하며 해당 장르를 키로 하는 값에 해당 곡의 인덱스와 재생 횟수, 장르별 총 재생횠수를 더한값을 넣었다. 

그리고 값이 저장된 dict를 새로운 배열 `ansset`에 넣고 장르별 재생횟수 순으로 정렬한 뒤, 각 원소에서 곡의 인덱스 값 및 재생횟수가 들어있는 부분을 기준으로 정렬을 하고 앞에서 2개를(2개가 없다면 1개를) 정답 배열에 추가해 줬다. 

알고리즘을 거의 처음 시작했을 때 이 문제를 풀면서 꽤나 고전한 기억이 있었는데 이제는 쉽게 풀수 있다는 점에서 나의 성장을 느낄수 있었던 문제였다.



