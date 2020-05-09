---
title: Daily Study Logging17 - 프로그래머스 섬연결하기, 자바 스크립트
date: "2020-05-09T12:14:32.169Z"
description: 알고리즘 문제풀이
tags: ["algorithm", "studylog"] 
---
[출처](https://programmers.co.kr/learn/courses/30/lessons/42861?language=javascript)

[커밋로그](https://github.com/Jesscha/algorithmsolutions/commit/98f83f48c8e6c399e6900e8aef4c1015c2a9fef5)

최소 비용으로 노드를 어떻게 연결하는가에 대한 알고리즘 문제 라서 다익스트라 알고리즘 같은 걸 써야 하나 생각했지만, 다른 사람들의 풀이를 보니 아니었다. 

정렬과 반복문으로도 그래프스러운 문제를 해결할 수 있다는 점을 배웠다.

풀이는 주석에 써 두었다.

```javascript 
function solution(n, costs) {
    let answer = 0,
      island = [],
      bridge = [],
      total = 0;
    costs.sort((a, b) => a[2] - b[2]); // 비용이 낮은 거 순으로 정렬
    island[costs[0][0]] = true; // cost에 제일 앞에 있는 섬 방문 처리 
    island[costs[0][1]] = true; // 
    bridge[0] = true; // 건설된 다리 하나 지어졋다고 친다.  다리 번호 == costs 번호
    answer += costs[0][2]; // 지어진 비용 추가
    total += 1; // 지어진 다리 개수 증가
  
    while (total < n - 1) { // 지어진 다리 개수가 섬개수 -1개 일때, 즉 다리를 다 지었을 때 종료
      for (let i = 1; i < costs.length; i++) { 
        let [start, end, cost] = costs[i]; // 각 코스트별 디스트럭쳐링 
        if (
          !bridge[i] && 
          ((island[start] && !island[end]) || (island[end] && !island[start])) //둘 중 하나만 방문 한 경우 
        ) {
          // 그 다리를 사용한다.
          island[start] = true; 
          island[end] = true;
          bridge[i] = true;
          answer += cost;
          total++;
          break;
        }
      }
    }
  
    return answer;
  }
  
  
  // 1. 비용이 낮은 거 순으로 정렬한다.
  // 2. 제일 비용이 낮은 다리는 무조거 쓸 테니까  비용이 낮은 다리를 일단 하나 건설 한다. 
  // 3. 다리별 방문  처리를 해 준다. 
  // 4. while 문을 돌린다. 지을 수 있는 다리의 조건은 그 다리를 지은적 없고 두 섬중에 하나는 연결되어 있는 것 
  // 5. 다리를 하나 지으면 for 문을 break 한다.
  // 6. 그러면 다시 while 문에 의해서 for 문이 돌아간다. 필요한 다리 개수가 다 차면 while 문이 종료된다. 



```

