---
title: Daily Study Logging14 - 카카오 2019 무지의 먹방 라이브, 파이썬
date: "2020-05-06T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42891)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/1e9d039120903723d56bf2445d297b62ab0c5857)

정확성 테스트를 통과하는 일은 매우 쉬운 일 이었지만, 효율성 테스트는 도저히 감이 잡히지 않아 다른 사람의 풀이를 빌려와 내껄로 만드는 걸로 대신 한다. 

음식을 먹다보면 가장 개수가 적은 음식먼저 없어진다. 이때까지 소요되는 시간은 (음식의 양) *(음식 배열의 길이) 가 된다. 

만약 k 가 위에서 구해진 길이보다 작다면 아무 음식도 없어지지 않으니까 k + 1 이 답이 된다.

만약 k가 더 크다면, k에서 위의 값을 한번 빼고 남은 값만큼 이동해 주면 된다. 

한번 더뺐지만, k가 아직도 (가장 적은음식의 양) * (음식 배열의 길이) 보다 크다면 작아 질 때까지 위의 과정을 반복한다. 


```python
def solution(food_times, k):
    food_times_list = [] 
    totalTime = 0

    # 음식의 번호와 음식의 양을 저장 
    for i in range(0, len(food_times)):
        food_times_list.append([i, food_times[i]])
        totalTime += food_times[i]
    
    # 전체 먹는 시간보다 k가 크면 계산 불가능 이므로 -1
    if totalTime  <= k:
        return -1
    # 음식 양이 적은 순으로 정렬 
    food_times_list.sort(key = lambda x:x[1])
    # 제일 적은 음식을 길이에 곱한 시간 계산 
    delTime = food_times_list[0][1]*len(food_times_list)
    # i 사라진 음식의 개수
    i = 1
    # k 가 음식을 사라지게 하는 수보다 클 경우 아래 의 반복문 실행
    while delTime < k: 
        k -= delTime
        delTime = (food_times_list[i][1] - food_times_list[i-1][1])*(len(food_times_list)-i)
        i += 1
    # 인덱스 수순으로 배치
    food_times_list = sorted(food_times_list[i-1:], key=lambda x: x[0])
    # k번쨰 음식의 인덱스를 출력
    return food_times_list[k%len(food_times_list)][0]+1

print(solution([3, 1, 2], 5))
```

나는 왜 이 생각을 못했을까? 충분히 할 수 있었던 생각일까?

나는 이분 탐색이나 노드, 링크드 리스트 같은 자료구조로 구현을 하려는 생각을 했다. 하지만, 정답은 좀더 수학적 이었다. 

과연 이 답을 생각한 사람은 어디서 힌트를 얻은 것 일까? 아직 거기까지 수준이 닫지 않아서 이 질문에 대한 답을 명쾌하게 할 수는 없다. 

다만 페턴을 찾아내고 거기서 문제가 요구하는 답을 이끌어 가려는 노력이 더 필요하다는 것은 알겠다. 이 문제는 혼자서 2번은 더 풀어봐야 겠다. 
